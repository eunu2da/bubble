<template>
  <div>
    <MainScreen @enter-game="enterGame" ref="mainScreen" />
    <div class="container">
      <div class="layout_container">
        <div id="back-button" v-if="showBackButton">
          <div class="back-button">
            <img class="back_button_img" src="https://media-public.canva.com/G9aC0/MAFZirG9aC0/1/t.png" draggable="false" alt="Go Back" @click="goBack">
          </div>
          <div id="myEmoji" class="myEmojiBox" v-if="showMyCharacter">
            <h3 class="me">It's me</h3>
            <span class="myCharacter">{{ myEmoji }}</span>
          </div>  
        </div>
      </div>
      <div class="game_area_wrapper">
        <div class="game_area_container">
          <GameArea v-if="showGameArea" :participants="participants" ref="gameArea"  @updateBubbleCount="updateBubbleCount"/>
        </div>
        <div id="survivorCount" class="survivorCount" v-if="!gameStart">
          {{ survivorsCountText }}
        </div>
        <div id="bubbleCount" class="survivorCount" v-if="gameStart">
          {{ bubbleCountText }}
        </div>
        <div id="currentPosition" class="currentPosition" v-if="showGameArea">
          {{ currentPosition }}
        </div>
      </div>
      <div class="controls" v-if="showGameArea">
        <div class="direction-buttons">
          <button @mousedown="startMoving('up')" @mouseup="stopMoving" @mouseleave="stopMoving"
                  @touchstart="startMoving('up')" @touchend="stopMoving">↑</button>
          <div>
            <button @mousedown="startMoving('left')" @mouseup="stopMoving" @mouseleave="stopMoving"
                    @touchstart="startMoving('left')" @touchend="stopMoving">←</button>
            <button @mousedown="startMoving('down')" @mouseup="stopMoving" @mouseleave="stopMoving"
                    @touchstart="startMoving('down')" @touchend="stopMoving">↓</button>
            <button @mousedown="startMoving('right')" @mouseup="stopMoving" @mouseleave="stopMoving"
                    @touchstart="startMoving('right')" @touchend="stopMoving">→</button>
          </div>
        </div>
      </div>
      <div id="orientation-warning">
        가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다!
      </div>
      <div v-if="gameInstructions" class="game-instructions">
      <div class="game-instructions-content">
        <p>{{ gameInstructions }}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import MainScreen from '@/components/MainScreen.vue';
import GameArea from '@/components/GameArea.vue';

import io from 'socket.io-client';
var socket = io();

export default {
  components: {
    MainScreen,
    GameArea
  },
  data() {
    return {
      participants: [],
      showBackButton: false,
      showMyCharacter: false,
      myEmoji: '',
      showPlaceholder: false,
      currentSurvivorsText: '',
      showGameArea: false,
      survivorsCountText: '접속 인원: 0',
      bubbleCountText: '버블 갯수 : 0',
      currentPosition: '',
      moveInterval: null,
      gameInstructions: '',
      gameStart: false,
    };
  },
  methods: {
    enterGame() {
      this.showGameArea = true;
      this.showBackButton = true;
      this.showMyCharacter = true;
      this.showPlaceholder = false;
      this.showNumOfSurvivors = false;

      this.$nextTick(() => {
        if (this.$refs.gameArea) {
          var gameAreaSize = this.$refs.gameArea.$el.getBoundingClientRect();
          var areaSize = {
            top: gameAreaSize.height,
            right: gameAreaSize.width
          };
          console.log('areaSize:', areaSize);
          socket.emit('newParticipant', { emoji: '', gameAreaSize: areaSize });
        }
      });
    },
    goBack() {
      socket.emit('goBack');
      this.showGameArea = false;
      this.showBackButton = false;
      this.showMyCharacter = false;
      this.showPlaceholder = true;
      this.showNumOfSurvivors = true;
      this.$refs.mainScreen.$el.display = 'block';
    },
    move(direction) {
      console.log(`Move ${direction}`);
      let currentUser = this.participants.find(p => p.id === socket.id);
      if (currentUser) {
        switch (direction) {
          case 'up':
            currentUser.y -= 10;
            break;
          case 'down':
            currentUser.y += 10;
            break;
          case 'left':
            currentUser.x -= 10;
            break;
          case 'right':
            currentUser.x += 10;
            break;
        }
        console.log(`나의 현재 위치는 x: ${currentUser.x}, y: ${currentUser.y}`);
        socket.emit('updateParticipantPosition', currentUser);
        this.updateCurrentPosition();
      }
    },
    startMoving(direction) {
      this.move(direction);
      this.moveInterval = setInterval(() => {
        this.move(direction);
      }, 100);
    },
    stopMoving() {
      clearInterval(this.moveInterval);
    },
    updateCurrentPosition() {
      const currentUser = this.participants.find(p => p.id === socket.id);
      if (currentUser) {
        this.currentPosition = `X: ${currentUser.x.toFixed(1)}, Y: ${currentUser.y.toFixed(1)}, ${currentUser.id}`;
      }
    },
    updateBubbleCount(count) {
      this.bubbleCountText = '버블 갯수: ' + count;
    },
  },

  mounted() {

    socket.on('connect', () => {
      console.log('소켓 연결', socket.id);
    });

    socket.on('updateParticipants', (participants) => {
      console.log(` ${socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participants = participants;
      this.survivorsCountText = `접속 인원: ${participants.length}`;
      this.updateCurrentPosition();
      const currentUser = participants.find(p => p.id === socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
        this.showMyCharacter = true;
        console.log('Current User Emoji:', this.myEmoji);
      } else {
        console.log('Current user not found in participants.');
      }
    });

    socket.on('positionUpdate', (data) => {
      const participant = this.participants.find(p => p.id === data.id);
      if (participant) {
        participant.x = data.x;
        participant.y = data.y;
        this.updateCurrentPosition();
      }
    });   

   socket.on('gameInstructions', (data) => {
    console.log('게임 지침:', data);
    this.gameInstructions = data;
    if(data == '') {
      //게임 지침이 끝나고 난뒤 발생하는 버블
      console.log('bubbleStart !');
      this.gameStart = true;
    }
    //this.$refs.gameArea.$el.
   });

   
  },
};
</script>

<style scoped>
body {
  user-select: none; /* 텍스트 복사 방지 */
  touch-action: manipulation; /* 터치로 확대 방지 */
}

#orientation-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 9999;
  font-size: 1.5rem;
}

#back-button {
  width: 50px;
  height: 50px;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

.back-button {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -3px);
  }
}

.back_button_img {
  width: 100%;
  height: 100%;
  margin-top: 0;
  margin-left: 0;
}

.game_area_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; /* 버튼 아래로 약간의 여백 추가 */
}

.game_area_container {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.myEmojiBox {
  width: 80px;
  margin: 0px;
  height: 90px;
  border: 2px solid #ccc;
  border-radius: 10px;
  text-align: center;
}

.me {
  color: white;
  margin: 0px;
}

.myCharacter {
  font-size: 3rem;
}

.survivorCount {
  position: fixed;
  top: 10px;
  right: 20px;
  background-color: rgba(0, 0, 0, .5);
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1.5rem;
  z-index: 1000;
}

.currentPosition {
  margin-top: 5px;
  background-color: rgba(0,0,0,.5);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  margin: 0px 0px 60px 0px;
}

.controls {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.direction-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.direction-buttons button {
  width: 40px;
  height: 40px;
  margin: 5px;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.direction-buttons button:active {
  background-color: #45a049;
}

@media only screen and (max-width: 660px) and (orientation: portrait) {
  #orientation-warning {
    display: flex;
  }
}

@media only screen and (min-width: 660px) and (orientation: landscape) {
  #orientation-warning {
    display: none;
  }
}

.game-instructions {
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 5%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8); /* 배경색 및 투명도 조정 */
  color: white;
  padding: 10px;
  max-width: 80%;
  line-height: 1em;
}



.game-instructions-content {
  opacity: 0.8; /* dim 효과를 위한 투명도 조정 */
}
</style>
