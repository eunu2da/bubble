<template>
  <div>
    <MainScreen @enter-game="enterGame" ref="mainScreen" v-if="!gameEnd" />
    <div class="container" v-if="!gameEnd">
    
      <div class="layout_container">
        <div id="back-button">
        <!-- <div id="back-button" v-if="showBackButton" @click="goBack"> -->
          <div class="back-button">
            <!-- <img class="back_button_img" src = "../assets/client/back_btn.png"  draggable="false" alt="Go Back"> -->
          </div>
          <div id="currentPosition" class="currentPosition" v-if="showGameArea">
          {{ currentPosition }}
          </div> 
          <div id="myEmoji" class="myEmojiBox" v-if="showMyCharacter">
            <h5 class="me">{{isHost}}</h5>
            <span class="myCharacter">{{ myEmoji }}</span>
          </div>
        </div>
      </div>
     
      <div class="game_area_wrapper">
        <div class="game_area_container">
          <img src="@/assets/console.png" alt="Console Background" class="console-img">
          <GameArea v-if="showGameArea" :participants="participants" ref="gameArea" @updateBubbleCount="updateBubbleCount"/>
          <div class="run-controls" v-if="showGameArea">
            <button @mousedown="runAction()" @mouseup="runStop()" @mouseleave="runStop()"
                    @touchstart="runAction()" @touchend="runStop()" ref="runButton" class="run-button">🏃‍♀️</button>
          </div>
        </div>
        <div id="survivorCount" class="survivorCount" v-if="!gameStart">
          접속중인 인원  {{ survivorsCount }} 명
        </div> 
        <div class="game_progress_status" v-if="gameStart">
          <span style="margin-right: 25px;">my rank 🏆: {{currentRank}} </span>
          <span style="margin-right: 30px;"> 남은 종료 시간 : {{remainingTime}}⏳️ </span>
          <span> {{ bubbleCountText }}</span>            
        </div>
        <div class="fullscreen-buttons" v-if="isAndroidDevice">
          <button id="fullscreen-toggle" @click="toggleFullscreen">전체 화면 켜기</button>
        </div> 
      </div>
      <div v-if="host" v-show="!gameStarted" class="host-controls">
            <button class="start-game-button" @click="attemptStartGame">Start</button>
      </div> 
      <custom-modal v-if="showModal" :message="modalMessage" @confirm="startGame" @cancel="cancelStartGame" />
      <div class="joystick" ref="joystick" v-if="showGameArea">
        <div class="joystick-base" ref="joystickBase">
        <div class="joystick-stick" ref="joystickStick">
          <span class="joystick-emoji">{{ myEmoji }}</span>
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
    <WinnerModal v-if="gameEnd" 
        :winner="firstPlace" 
        :sortedParticipants="allParticipants"
        @close="returnToMain"/>
  </div>
</template>
<script>
import MainScreen from '@/components/MainScreen.vue';
import GameArea from '@/components/GameArea.vue';
import WinnerModal from '@/components/WinnerModal.vue';
import CustomModal from '@/components/CustomModal.vue';

import io from 'socket.io-client';
var socket = io();

export default {
  components: {
    MainScreen,
    GameArea,
    WinnerModal,
    CustomModal
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
      bubbleCountText: '터트린 🫧 갯수 : 0',
      currentPosition: '',
      moveInterval: null,
      gameInstructions: '',
      gameStart: false,
      timerInterval: null, 
      gameEnd: false,
      showWinnerModal: false,
      remainingTime: '',
      isDescribing: false,
      isRun: false,
      direction: null,
      gameEndSent: false,
      currentRank: '',
      bubbleCount: '',
      firstPlace: {},
      allParticipants: [],
      isAndroidDevice: false,
      joystickStartX: 0,
      joystickStartY: 0,
      joystickMoveX: 0,
      joystickMoveY: 0,
      joystickMoveInterval: null,
      isHost: '',
      host: false,
      gameStarted: false,
      showModal: false,
      modalMessage: '',
    };
  },
  methods: {

    attemptStartGame (){
      this.modalMessage = `${this.survivorsCount}명으로 게임을 시작하시겠습니까? (게임 시작 이후 종료가 불가능합니다.)`;
      this.showModal = true;
    },

        startGame() {
      this.showModal = false;
      this.gameStarted = true;
      // 게임 시작 로직
      socket.emit('startGame');
    },
    cancelStartGame() {
      this.showModal = false;
    },


    returnToMain() {
      this.showWinnerModal = false;
      this.gameEnd = false;
      this.showGameArea = false;
      this.showBackButton = false;
      this.showMyCharacter = false;
      this.showPlaceholder = true;
      this.showNumOfSurvivors = true;
      this.gameStart = false;
      this.participants = [];
      this.survivorsCount = 0;
      this.currentRank = '';
      this.bubbleCount = '';
      this.firstPlace = {};
      this.allParticipants = [];
      document.getElementById('main-screen').style.display = 'block';
      socket.disconnect();
    },

    enterGame() {
      document.getElementById('main-screen').style.display='none';
      this.showGameArea = true;
      this.showBackButton = true;
      this.showMyCharacter = true;
      this.showPlaceholder = false;
      this.showNumOfSurvivors = false;

      this.$nextTick(() => {

          var gameAreaSize = document.getElementById('game-area').getBoundingClientRect();
          this.gameAreaHeight = gameAreaSize.height - 48;
          console.log('서버로 전달할 참가자의 gameArea Height..', this.gameAreaHeight);
          this.gameAreaWidth = gameAreaSize.width - 48;
          console.log('서버로 전달할 참가자의 gameArea width..', this.gameAreaWidth);
          var areaSize = {
            top: gameAreaSize.height,
            right: gameAreaSize.width
          };
          console.log('areaSize:', areaSize);
          socket.emit('newParticipant', { emoji: '', gameAreaSize: areaSize });
        
          if (this.$refs.joystick) {
            this.initJoystick();
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
          currentUser.y -= this.isRun ? 7 : 3;
          if (currentUser.y < 0) currentUser.y = 0; // 경계 체크
            break; 
          case 'down':
          currentUser.y += this.isRun ? 7 : 3;
          console.log('나의 gameAreaHeight', this.gameAreaHeight);
          if (currentUser.y > this.gameAreaHeight) currentUser.y = this.gameAreaHeight; // 경계 체크  
            break;
          case 'left':
          currentUser.x -= this.isRun ? 7 : 3;
          if (currentUser.x < 0) currentUser.x = 0;
            break;
          case 'right':
          currentUser.x += this.isRun ? 7 : 3;
          console.log('나의 gameAreaWidth', this.gameAreaWidth);
          if (currentUser.x > this.gameAreaWidth) currentUser.x = this.gameAreaWidth; // 경계 체크
            break;
        }
        
        console.log(`나의 현재 위치는 x: ${currentUser.x}, y: ${currentUser.y}`);
        socket.emit('updateParticipantPosition', currentUser);
        this.updateCurrentPosition();
      }
    },

    runAction(){
      this.isRun = true;
      this.$refs.runButton.classList.add('active');
    },
    runStop(){
      this.isRun = false;   
      this.$refs.runButton.classList.remove('active');
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
      this.bubbleCountText = '터트린 🫧 갯수: ' + count;
      console.log('서버에게 버블카운트 전달');
      socket.emit('bubbleBuster', {id : socket.id, emoji: this.myEmoji, bCount : count});
    },
    startTimer() {
      //this.remainingTime = 60;  // 게임 시간 60초로 설정
      this.remainingTime = 30;
      this.gameEndSent = false;
      this.timerInterval = setInterval(() => {
        this.remainingTime--; 
        if (this.remainingTime <= 0 && !this.gameEndSent) {
          clearInterval(this.timerInterval);
          this.gameEndSent = true; // 게임 종료 상태를 true로
        }
      }, 1000);
    },
   
  //아이폰은 홈 화면 추가
  toggleFullscreen() {
    const elem = document.documentElement;
    const toggleButton = document.getElementById('fullscreen-toggle');
    
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
      }
      toggleButton.textContent = '전체 화면 끄기';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { // Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE11
        document.msExitFullscreen();
      }
      toggleButton.textContent = '전체 화면 켜기';
    }
  },

  isAndroid() {
      return /Android/i.test(navigator.userAgent);
  },
  
  initJoystick() {
      const joystickBase = this.$refs.joystickBase;
      const joystickStick = this.$refs.joystickStick;

      joystickStick.addEventListener('touchstart', this.startJoystick);
      joystickStick.addEventListener('touchmove', this.moveJoystick);
      joystickStick.addEventListener('touchend', this.endJoystick);
    },
    startJoystick(event) {
      const touch = event.touches[0];
      this.joystickStartX = touch.clientX;
      this.joystickStartY = touch.clientY;
      this.joystickMoveX = 0;
      this.joystickMoveY = 0;
      this.joystickMoveInterval = setInterval(this.updateMovement, 50);
      this.$refs.joystickBase.classList.add('active');
    },
    moveJoystick(event) {
      event.preventDefault(); // 터치 이동 중 스크롤 방지
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.joystickStartX;
      const deltaY = touch.clientY - this.joystickStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 50; // 조이스틱 최대 이동 거리

      let moveX = deltaX;
      let moveY = deltaY;

      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        moveX = Math.cos(angle) * maxDistance;
        moveY = Math.sin(angle) * maxDistance;
      }

      this.joystickMoveX = moveX / maxDistance;
      this.joystickMoveY = moveY / maxDistance;
      this.$refs.joystickStick.style.transform = `translate(${moveX}px, ${moveY}px)`;
    },
    endJoystick(event) {
      event.preventDefault(); // 터치 종료 중 스크롤 방지
      this.$refs.joystickStick.style.transform = 'translate(0, 0)';
      clearInterval(this.joystickMoveInterval);
      this.joystickMoveX = 0;
      this.joystickMoveY = 0;
      this.triggerHapticFeedback();
      this.$refs.joystickBase.classList.remove('active');
    },
    
    updateMovement() {
      const absX = Math.abs(this.joystickMoveX);
      const absY = Math.abs(this.joystickMoveY);

      if (absX > absY) {
        if (this.joystickMoveX > 0.1) this.move('right');
        else if (this.joystickMoveX < -0.1) this.move('left');
      } else {
        if (this.joystickMoveY > 0.1) this.move('down');
        else if (this.joystickMoveY < -0.1) this.move('up');
      }
    },
    triggerHapticFeedback() {
      console.log('Vibration Triggered');
      if (navigator.vibrate) {
        navigator.vibrate(50); 
      } else {
        //아이폰
        this.addVisualFeedback();
    }
    },
    addVisualFeedback() {
      const joystickStick = this.$refs.joystickStick;
      joystickStick.classList.add('shake');
      setTimeout(() => {
        joystickStick.classList.remove('shake');
      }, 200);
    },
  },
  mounted() {
    this.isAndroidDevice = this.isAndroid();

    socket.on('currentclientCount', (clientCount) => {
      this.survivorsCount = clientCount;
      console.log('접속인원 ' , this.survivorsCount);
    });

    socket.on('updateParticipants', (participants) => {
      console.log(`${socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participants = participants;
      this.survivorsCount = participants.length;
      console.log('전달받은 participants', participants);
      
      this.updateCurrentPosition();
      const currentUser = participants.find(p => p.id === socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
      this.showMyCharacter = true;
      this.isHost = currentUser.isHost ? '👑방장👑' : '👔참가자👔';
      
      if (currentUser.isHost) {
        this.host = true;
      }
        console.log('Current User role:', this.isHost);
        console.log('Current User Emoji:', this.myEmoji);
        console.log('currentUser가 받은 위치는', currentUser.x, currentUser.y);
      } else {
        console.log('Current user not found in participants.');
      }
    });

    socket.on('positionUpdate', (data) => {
      const participant = this.participants.find(p => p.id === data.id);
      if (participant) {
        participant.x = data.x;
        participant.y = data.y;
        console.log(`${data.id}의 포지션 변경이 발생함 x : ${participant.x}/ y : ${participant.y} `);
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
    
   socket.on('rankUpdate', (data) => {
      console.log('나의 현재 랭킹 정보:', data);
      this.currentRank = data.rank;
      this.bubbleCount = data.bCount;
      this.firstPlace = data.firstPlace;
      this.allParticipants = data.allParticipants;
    });


    socket.on('showRank',(data) => {
      console.log('datadatadata show Rank', data);
      this.gameEnd = true;
      this.firstPlace = data.whoFianlWinner;
      this.allParticipants = data.resultRank;
    });
    
  },
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  user-select: none; 
  touch-action: none;
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
  width: 90px;
  height: 50px;
  position: fixed;
  top: 20px;
  left: 25px;
  z-index: 1000;
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
  border-radius: 20px;
}

.game_area_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game_area_container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 140vw;
  height: 121vh;
}

.console-img {
  overflow: hidden;
  position: absolute;
  width: 114%;
  height: 117%;
}

.myEmojiBox {
  width: 100px;
  height: 80px;
  border: 5px solid rgb(0 0 0 / 70%);
  border-radius: 20px;
  text-align: center;
  background: rgba(0,0,0,.8);
}

.me {
  color: #73ff00;
  margin: 4px;
}

.myCharacter {
  font-size: 2.1rem;
}

.survivorCount {
  position: fixed;
  top: 10px;
  right:150px;
  background-color: rgb(0 0 0 / 18%);
  color: #73ff00;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  z-index: 1000;
}

.game_progress_status {
  width: 60%;
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
  color: #73ff00;
  width: 100px;
  border-radius: 5px;
  font-size: 0.7rem;
  text-align: center;
  font-weight: bold;
}

.direct-controls {
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
  width: 50px;
  height: 50px;
  margin: 5px;
  font-size: 1.2rem; 
  background-color: rgba(0,0,255,.5);
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  outline: none;
}

.direction-buttons button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(145deg, hsl(0deg 0% 100% / 40%), rgb(255 255 244));
  transition: all 0.3s ease;
  z-index: 1;
}

.direction-buttons button:active {
  background-color: rgba(0, 0, 255, 0.7);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(2px);
}

.direction-buttons button:active::before {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1));
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
  background-color: rgba(0,0,0,.18); 
  border: rgba(0,0,0,.18);
  color: white;
  padding: 0px 20px;
  max-width: 80%;
}

.game-instructions-content {
  opacity: 0.8;  
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

.run-button {
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 90px; 
  height: 90px;
  font-size: 2rem; 
  background: radial-gradient(circle at center, rgb(0 0 255 / 0%), #111);
  color: white; 
  border: none; 
  border-radius: 50%; 
  box-shadow: 0 5px 5px  #fff;
  transition: all 0.3s ease;  
  outline: none;
  z-index: 1000;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent; 
}

 

.joystick {
  position: fixed;
  bottom: 30px;
  left: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.joystick-base {
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgb(0 0 255 / 0%), #111);
  border-radius: 50%;
  box-shadow: 0 5px 5px #ffffff;
  margin-bottom: 40px;
}

.joystick-stick {
  position: absolute;
  width: 50%;
  height: 50%;
  background: radial-gradient(circle at center, #fff0, #fff0);
  border-radius: 50%;
  top: 25%;
  left: 25%;
  transition: transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.joystick-emoji {
  font-size: 3rem;
}
 
@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(4px, 0); }
  50% { transform: translate(0, 0); }
  75% { transform: translate(-4px, 0); }
  100% { transform: translate(0, 0); }
}

.joystick-stick.shake {
  animation: shake 0.2s linear;
}

.joystick-base.active, .run-button.active {
  background: radial-gradient(circle at center, #ffffff80, #fff);   /* 색상 변경 */
  transform: scale(0.95);
}

.host-controls {
  bottom: 120px; /* run-controls 위에 배치하기 위해 */
  right: 30px;
  display: flex;
  justify-content: center;
}

.start-game-button {
  right: 14px;
  position: fixed;
  background-color: #000000b0;
  width: 110px;
  height: 100px;
  border: 5px solid rgba(0,0,0,.7000000000000001);
  transition: background-color 0.3s ease;
  border-radius: 20px;
  text-align: center;
  bottom: 150px;
  color: #73ff00;
  font-size: 2em;
}

.start-game-button:hover {
  background-color: rgba(0, 0, 255, .4);
}

.run-controls {
  position: fixed;
  right: 30px;
  bottom: 50px;
}

 
</style>