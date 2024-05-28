<template>
  <div>
    <MainScreen @enter-game="enterGame" ref="mainScreen" v-if="!gameEnd"/>
    <div class="container" v-if="!gameEnd">
      <div class="layout_container">
        <div id="back-button" v-if="showBackButton">
          <div class="back-button">
            <img class="back_button_img" src="https://media-public.canva.com/G9aC0/MAFZirG9aC0/1/t.png" draggable="false" alt="Go Back" @click="goBack">
          </div>
          <div id="myEmoji" class="myEmojiBox" v-if="showMyCharacter" @click="showSocketId">
            <h3 class="me">It's me</h3>
            <span class="myCharacter">{{ myEmoji }}</span>
          </div>
          <div id="currentPosition" class="currentPosition" v-if="showGameArea">
          {{ currentPosition }}
          </div> 
        </div>
      </div>
      <div class="game_area_wrapper">
        <div class="game_area_container">
          <GameArea v-if="showGameArea" :participants="participants" ref="gameArea"  @updateBubbleCount="updateBubbleCount"/>
        </div>
         <div id="survivorCount" class="survivorCount" v-if="!gameStart">
         접속인원 : {{ survivorsCount }} 명
        </div> 
        <div class="survivorCount" v-if="gameStart">
          <span>my rank 🏆 </span>
          남은 종료 시간 : {{remainingTime}} {{ bubbleCountText }}          
        </div>
       <div class="fullscreen-buttons">
          <button id="fullscreen-toggle" @click="toggleFullscreen">전체 화면 켜기</button>
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
    <WinnerModal :visible="showWinnerModal" :winner="winner" @close="showWinnerModal = false"/>
  </div>
</template>
<script>
import MainScreen from '@/components/MainScreen.vue';
import GameArea from '@/components/GameArea.vue';
import WinnerModal from '@/components/WinnerModal.vue';


import io from 'socket.io-client';
var socket = io();

export default {
  components: {
    MainScreen,
    GameArea,
    WinnerModal
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
      survivorsCount: 0,
      bubbleCountText: '  버블 갯수 : 0',
      currentPosition: '',
      moveInterval: null,
      gameInstructions: '',
      gameStart: false,
      timerInterval: null, 
      gameEnd: false,
      showWinnerModal: false,
      remainingTime: '',
      isDescribing: false,
    };
  },
  methods: {

    enterGame() {
      
      document.getElementById('main-screen').style.display='none';
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
  switch (true) {
    case this.isDescribing == true:
      alert('지금은 게임 설명중이에요.');
      break;
    case this.remainingTime > 0:
      if (confirm('현재 게임중이에요. 그래도 나가시겠습니까?')) {
        socket.emit('goBack');
        this.showGameArea = false;
        this.showBackButton = false;
        this.showMyCharacter = false;
        this.showPlaceholder = true;
        this.showNumOfSurvivors = true;
        document.getElementById('main-screen').style.display = 'block';
      }
      break;
    case this.remainingTime == 0:
      if (confirm('뒤로 나가면 소켓연결이 끊어집니다. 그래도 나가시겠습니까?')) {
        socket.emit('goBack');
        this.showGameArea = false;
        this.showBackButton = false;
        this.showMyCharacter = false;
        this.showPlaceholder = true;
        this.showNumOfSurvivors = true;
        document.getElementById('main-screen').style.display = 'block';
      }
      break;
  }
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
        this.currentPosition = `X: ${currentUser.x.toFixed(1)}, Y: ${currentUser.y.toFixed(1)}`;
      }
    },
    updateBubbleCount(count) {
      this.bubbleCountText = '  버블 갯수: ' + count;
      socket.emit('bubbleBuster', {id : socket.id, emoji: this.myEmoji, bCount : count});
    },
    startTimer() {
      //this.remainingTime = 60;  // 게임 시간 60초로 설정
      this.remainingTime = 120;
      this.timerInterval = setInterval(() => {
        this.remainingTime--; 
        if (this.remainingTime <= 0) {
          clearInterval(this.timerInterval);
          socket.emit('endGame');
        }
      }, 1000);
    },
    handleGameEnd() {
        this.gameEnd = true;
        this.showWinnerModal = true; // 모달 표시
    },
    
    //아이폰은 홈 화면 추가
    toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => {
        document.getElementById('fullscreen-toggle').textContent = '전체 화면 끄기';
      }).catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().then(() => {
        document.getElementById('fullscreen-toggle').textContent = '전체 화면 켜기';
      }).catch((err) => {
        console.log(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
      });
    }
  },

  showSocketId() {
    alert(`나의 소켓 ID는 ${socket.id} 입니다 !`);
  }
},

  mounted() {

    socket.on('currentclientCount', (clientCount) => {
      this.survivorsCount = clientCount;
    });

    socket.on('updateParticipants', (participants) => {
      console.log(`${socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participants = participants;
      this.survivorsCount = participants.length;
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
    this.gameInstructions = data; //게임 지침 설명 text
    this.isDescribing = true;
    if(data == '') {              //게임 지침이 끝나고 난뒤 발생하는 버블
      console.log('bubbleStart !');
      this.isDescribing = false;  //설명 종료
      this.gameStart = true;      //접속자 수 => 버블 갯수
      this.startTimer();
    }
  });
    socket.on('gameEnd', () => {
      clearInterval(this.timerInterval);
      this.handleGameEnd();
    });
  },
};
</script>

<style scoped>
body {
  user-select: none; /* 텍스트 복사 방지 */
  touch-action: manipulation; /* 터치로 확대 방지 */
  background-color: #e4e4ff;
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
  margin-top: 40px;
  height: 90px;
  border: 2px solid rgb(255 255 255 / 50%);
  border-radius: 20px;
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
  right: 150px;
  background-color: rgb(0 0 0 / 18%);
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  z-index: 1000;
}

.currentPosition {
  margin-top: 6px;
  background-color: rgb(0 0 0 / 14%);
  color: white;
  width: 70px;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
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
  background-color: rgba(0,0,255,.5);
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 20%);
}

.direction-buttons button:active {
  background-color: rgba(255, 253, 238, .49);
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
  border-radius: 20px;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,.18);/* 배경색 및 투명도 조정 */
  border: rgba(0,0,0,.18);
  color: white;
  padding: 5px 5px 5px 5px;
  max-width: 80%;
}

.game-instructions-content {
  opacity: 0.8; /* dim 효과를 위한 투명도 조정 */
}

 .fullscreen-buttons button {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgb(0 0 0 / 18%);
  border: rgb(0 0 0 / 18%);
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  z-index: 1000;
} 


</style>
