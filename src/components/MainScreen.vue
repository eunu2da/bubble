<template>
  <div id="main-screen" ref="MainScreen">
    <h3 id="numOfsurvivors">{{ survivorsCount }}</h3>
    <audio ref="buttonSound" src="../assets/music/effect.mp4" preload="auto"></audio>
    <audio ref="gameStartedMusic" src="../assets/music/startGame.mp4" loop></audio>
    <audio ref="keyboard" src="../assets/music/keyboard.mp4" preload="auto"></audio>
    <button v-if="!showNicknameInput" @click="handleEnterGame" :disabled="gameStarted" class="enter-button">{{gameStateTxt}}</button>
   
    <!-- 닉네임 입력 필드 -->
    <div v-if="showNicknameInput" class="nickname-input-container">
      <span v-if="showNicknameInput && !isNickName" :disabled="gameStarted" class="none-nickName">닉네임 등록 후 입장이 가능합니다</span>
      <label for="nickname" class="nickname-label">나의 닉네임은</label>
      <!--닉네임이 없는경우 애니메이션 추가 -->
      <div v-if="!isNickName" @click="showCustomKeyboard" class="nickname-display">
        <span v-for="(char, index) in splitText('닉네임을 입력하세요')" :key="index" class="char" :style="{'animation-delay': `${index * 0.2}s`}">{{char}}</span>
      </div>
      <!--닉네임이 있을때 -->
      <div v-if="isNickName" @click="showCustomKeyboard" class="nickname-display" ref="nicknameDisplay">{{nickname}}</div>
      <span class="nickname-label">입니다</span>
      <button v-if="showNicknameInput && isNickName" @click="nicknameCheck" :disabled="gameStarted" class="nickname-button" ref="nicknameButton">{{nickStateTxt}}</button>  
    </div>
    <!-- 커스텀 키보드 -->
    <div id="keyboard-container" class="customKeyBoard" ref="keyboardContainer" v-show="isKeyboardVisible"></div>
    <!-- 세로 모드일 경우 가로 화면으로 변경하라는 권장 메세지 -->
    <div id="orientation-warning">
      가로 모드로 돌리면 더 재밌게 게임을 즐기실 수 있습니다 !
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Keyboard from "simple-keyboard";
import Hangul from 'hangul-js';
import "simple-keyboard/build/css/index.css";

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
      isKeyboardVisible: false,
      keyboard: null
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

  mounted() {
    socket.emit('checkGameStatus');

    socket.on('gameAlreadyStarted', () => {
      this.gameStateTxt = '게임 진행중';
      this.gameStarted = true; //게임 입장하기 버튼 비활성화
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

    nicknameCheck() {
    if (this.nickname.trim() !== '' && !this.gameStarted) {
      const audio = this.$refs.buttonSound;
      audio.play();
      this.$refs.nicknameButton.style.display = 'none'; //입장버튼 클릭하고 나면 remove
      this.isKeyboardVisible = false; // 키보드 숨기기 시작

      // 닉네임 회전 애니메이션 추가
      setTimeout(() => {
        const nicknameDisplay = this.$refs.nicknameDisplay;
        nicknameDisplay.classList.add('nickname-rotate');
        setTimeout(() => {
          this.transitionToNextScene(); // 다음 장면으로 전환
        }, 3000); // 애니메이션 시간과 동일하게 설정
      }, 1000);   // 회전 애니메이션 시간과 동일하게 설정
    }
  },

    
    transitionToNextScene() {
      const gameStartedMusic = this.$refs.gameStartedMusic;
      gameStartedMusic.pause();
      const audio = this.$refs.buttonSound;
      audio.play();       
      this.$emit('enter-game');
  },

    
    showCustomKeyboard() {
      this.isKeyboardVisible = true;

      this.$nextTick(() => {
        if (!this.keyboard) {
          const keyboardContainer = this.$refs.keyboardContainer;
          if (keyboardContainer) {
            this.keyboard = new Keyboard(keyboardContainer, {
              onChange: input => this.handleChange(Hangul.assemble(input.split(''))),
              onKeyPress: button => this.handleKeyPress(button),
              layout: {
                default: [
                  "1 2 3 4 5 6 7 8 9 0",
                  "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ",
                  "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
                  "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {bksp}",
                  "{enter}"
                ]
              },
              display: {
                "{bksp}": "del",
                "{enter}": "확인"
              },
            });
            // 키보드 버튼 스타일 변경
            this.changeKeyboardButtonStyles([
              'hg-button hg-standardBtn',
              'hg-button hg-functionBtn hg-button-bksp',
              'hg-button hg-functionBtn hg-button-enter'
            ]);
          }
        } else {
          this.keyboard.setInput(Hangul.assemble(this.nickname.split('')));
        }
      });
    },
    handleChange(input) {
      if (input.length > 5) {
        this.nickStateTxt = '닉네임은 최대 5자까지 가능합니다.';
        this.keyboard.setInput(input.slice(0, 5));
        this.nickname = input.slice(0, 5);
        this.isNickName = true;
      } else {
        this.nickname = input;
      }
  },

    handleKeyPress(button) {
      const audio = this.$refs.keyboard;
      audio.play(); 
      if (button === "{enter}") this.isKeyboardVisible = false;
    },

    changeKeyboardButtonStyles(classes) {
      this.$nextTick(() => {
        const mainScreen = document.getElementById('main-screen');
        if (mainScreen) {
          classes.forEach(className => {
            const buttons = mainScreen.getElementsByClassName(className);
            for (let i = 0; i < buttons.length; i++) {
              buttons[i].style.background = '#0000';
              buttons[i].style.boxShadow = '0px 0px 12px 9px rgb(56 56 165 / 50%)';
              buttons[i].style.borderBottom = '1px solid #ffffff0f';
            }
          });
        }
      });
    },

  splitText(text) {
    return text.split('');
  }

  },


};
</script>

<style scoped>
#main-screen {
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
  border-radius: 50px;
  color: white;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  animation: floating 3s ease-in-out infinite;
  background-color: #0070ff;
}

.nickname-button {
  width: 184px;
  height: 66px;
  cursor: pointer;
  border-radius: 8px;
  color: #efff00;
  font-size: 1.2rem;
  display: inline;
  border: none;
  animation: floating 3s ease-in-out infinite;
  background-color: #17ff3e47;
}

.none-nickName {
  width: 270x;
  color: #c0ff00;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0px;
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
  background-color: rgba(255, 253, 238, 0.49);
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
  text-align: center;
  margin-bottom: 10px;
}

.nickname-label {
  color: #0070ff;
  font-size: 2rem;
  margin: 10px;
}

.nickname-display {
  background-color: transparent;
  color: hsl(74.77deg 100% 50%);
  border: none;
  border-bottom: 4px solid rgb(0 0 255 / 50%);
  font-size: 1.5rem;
  outline: none;
  margin-right: 10px;
  text-align: center;
  min-width: 100px;
  cursor: pointer;
  display: inline-block;
  height: 30px;
  line-height: 30px;
}

#numOfsurvivors {
  text-align: center;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  display: block;
  position: absolute;
  top: 20px;
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

 
.customKeyBoard {
  font-family: "Jua", sans-serif;  
  background: hsla(0,0%,100%,0);
  width: 60%;
  transform : rotateX(45deg);
  color : #005bff;
  font-size: xx-large;
  block-size: auto;
  margin: -45px;
}

.customKeyBoard .custom-hg-button {
  background: #0000;
  box-shadow: 0px 0px 12px 9px rgb(56 56 165 / 50%);
  border-bottom: 1px solid #ffffff0f; 
}
.nickname-display .char {
  display: inline-block;
  animation: blink 2.5s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.nickname-rotate {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
