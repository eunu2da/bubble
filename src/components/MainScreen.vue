<template>
  <div id="main-screen" ref="MainScreen">
    <h3 id="numOfsurvivors">{{ survivorsCount }}</h3>
    <button @click="enterGame" :disabled="gameStarted" class="enter-button"> {{gameStateTxt}}</button>
    <div id="orientation-warning">
      가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다 !
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {
  data() {
    return {
      survivorsCount: '',
      gameStateTxt: '게임 입장하기',
      gameStarted: false,
    };
  },
  mounted(){

    socket.emit('checkGameStatus');

     socket.on('gameAlreadyStarted', () => {
      this.gameStateTxt = '게임 진행중'; 
      this.gameStarted = true; //게임 입장하기 버튼 비활
    });

    socket.on('gameNotStarted', () => {
      this.gameStateTxt = '게임 입장하기';
      this.gameStarted = false;
    });

    socket.on('gameEnd', () => {
      this.gameStateTxt = '게임 입장하기';
      this.gameStarted = false;
    });

  },
  methods: {
    enterGame() {

      if(!this.gameStarted){
        this.$emit('enter-game');
      }
    }
  },
};
</script>

<style scoped>
#main-screen {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 

}

.enter-button {
  width: 300px; /* 버튼 너비 */
  height: 50px; /* 버튼 높이 */
  cursor: pointer;
  border-radius: 8px;
  color: white; /* 버튼 글자색 */
  font-size: 1rem; /* 버튼 글자 크기 */
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  border: none; /* 테두리 제거 */
  animation: floating 3s ease-in-out infinite;
  background-color: rgba(0,0,255,.5);

}

.enter-button:disabled {
  background-color: rgba(128, 128, 128, 0.5); /* 비활성화된 버튼 배경색 */
  cursor: not-allowed; /* 커서 변경 */
}


.enter-button button:active {
  background-color: rgba(255, 253, 238, .49);
}

@keyframes floating {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -20px);
  }
}

#numOfsurvivors {
  text-align: center;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  display: block;
  position: absolute;
  top: 20px; /* 상단에서 약간의 여백 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

#orientation-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 9999;
  font-size: 1.5rem;
}

/**아이폰 se까지 */
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

</style>
