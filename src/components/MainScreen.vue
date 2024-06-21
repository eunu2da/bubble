<template>
  <div id="main-screen" ref="MainScreen">
    <h3 id="numOfsurvivors">{{ survivorsCount }}</h3>
    <audio ref="buttonSound" src="../assets/music/effect.mp4" preload="auto"></audio>
    <audio ref="gameStartedMusic" src="../assets/music/startGame.mp4" loop></audio>
        
    <!-- 닉네임 입력 필드 -->
    <div v-if="showNicknameInput" class="nickname-input-container">
      <label for="nickname" class="nickname-label">Enter your nickname:</label>
      <input type="text" v-model="nickname" id="nickname" class="nickname-input" required/>
    </div>
    <button v-if="!showNicknameInput" @click="handleEnterGame" :disabled="gameStarted" class="enter-button"> {{gameStateTxt}}</button>
    <button v-if="showNicknameInput && isNickName" @click="nicknameCheck" :disabled="gameStarted" class="nickname-button"> {{nickStateTxt}}</button>
    <span v-if="showNicknameInput && !isNickName" :disabled="gameStarted" class="none-nickName">닉네임 등록 후 입장이 가능합니다</span>

  
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
      showNicknameInput: false,
      nickname: '',
      nickStateTxt: '닉네임 등록 후 입장이 가능합니다',
      isNickName: false,
    };
  },

  watch: {
    nickname(newVal) {
      
      if (newVal.trim() !== '') {
        this.isNickName = true;
        this.nickStateTxt = '좋은 닉네임입니다. 바로 게임을 시작해보세요!';
      } else {
        this.isNickName = false;
        this.nickStateTxt = '닉네임 등록 후 입장이 가능합니다';
         
      }
    }
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
    playButtonSound() {
      const gameStartedMusic = this.$refs.gameStartedMusic;
      const audio = this.$refs.buttonSound;
      audio.play();
      setTimeout(() => {
        gameStartedMusic.play();
      }, 2000);  
    },
    
    handleEnterGame() {
      this.showNicknameInput = true;
      this.playButtonSound(); // 버튼 클릭 시 사운드 재생
    },

    nicknameCheck(){
      if (this.nickname.trim() !== '' && !this.gameStarted) {
        const audio = this.$refs.buttonSound;
        audio.play();
        this.$emit('enter-game');
      }
    }
  }


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
  width: 300px;  
  height: 50px;  
  cursor: pointer;
  border-radius: 8px;
  color: white;  
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  border: none; 
  animation: floating 3s ease-in-out infinite;
  background-color: rgba(0,0,255,.5);
}

.nickname-button {
  width: 400px;  
  height: 50px; 
  cursor: pointer;
  border-radius: 8px;
  color: white;  
  font-size: 1rem; 
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  border: none; /* 테두리 제거 */
  background-color: rgb(0 0 255 / 58%);
}

.none-nickName{
  width: 300px;  
  height: 50px;  
  color:  hsl(0deg 0% 100% / 90%);
  font-size: 1rem; 
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px; 
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.enter-button:disabled {
  background-color: rgba(128, 128, 128, 0.5); 
  cursor: not-allowed; 
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

.nickname-input-container {
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
}

.nickname-label {
  color: #ADFF2F; 
  font-size: 1.2rem;
  margin-bottom: 8px;
  display: block;
}

.nickname-input {
  background-color: transparent; 
  border: 2px solid #ADFF2F;  
  color: hsl(0deg 0% 100% / 91%);
  padding: 8px;
  border-radius: 4px;
  font-size: 1rem;
  outline: none; 
}

.nickname-input:focus {
  border-color: #ADFF2F; 
  box-shadow: 0 0 5px rgba(173, 255, 47, 0.5); 
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
