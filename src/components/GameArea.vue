<template>
  <div id="app">
      <div class="board">
        <!-- 배경 음악 토글 버튼 -->
        <img class="music-area" src = "../assets/client/sound_on.png" v-if="isPlaying"  @click="toggleMusic">
        <img class="music-area" src = "../assets/client/sound_off.png" v-if="!isPlaying"  @click="toggleMusic">
        
        <!-- 배경 음악 오디오 요소 -->
        <audio ref="backgroundMusic" loop>
          <source src="../assets/music/console.mp4" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        
        <!-- 버블 소리 오디오 요소 -->
        <audio ref="bubbleSound" preload="auto">
          <source src="../assets/music/bubble_pop.mp4" type="audio/mpeg">
        </audio>
        
        <!-- 게임 배경 이미지 -->
        <img src="@/assets/console.png" alt="Console Background" class="console-img">
        
        <!-- 게임 영역 -->
        <div id="game-area">
          <div ref="gameArea"  
            v-for="participant in participants"     
            :key="participant.id"
            class="participant"
            :style="{ left: participant.x + 'px', top: participant.y + 'px' }"
          >
            {{ participant.emoji }}
          </div>
        <!-- 버블 요소 -->
          <div  
            v-for="bubble in bubbles"
            :key="bubble.id"
            class="bubble"
            :style="{ left: bubble.x + 'px', top: bubble.y + 'px', animationDelay: bubble.delay + 's' }"
          ></div>
        </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
var socket = io();

export default {
  props: {
    participants: Array // 참가자 목록
  },
  data() {
    return {
      bubbles: [],   // 생성된 버블을 담을 배열   
      bubbleCount: 0,
      isPlaying: false,    
    };
  },
  mounted() {
    // 게임 지침이 끝난 후 버블 생성 시작
    socket.on('gameInstructions', (data) => {
      if(data == '') {
        setTimeout(() => this.startBubbleGeneration(), 1000);
      }  
    });
   this.detectCollisions(); // 충돌 감지 시작
  },
  methods: {
    // 배경 음악 토글
    toggleMusic() {
      const audio = this.$refs.backgroundMusic;
      if (this.isPlaying) {
        audio.pause();
      } else {
          // 사용자의 인터랙션 이후에 오디오를 재생
          audio.play().catch(error => {
              console.error('재생 오류:', error);
          });
      }
      this.isPlaying = !this.isPlaying;
    },
    // 버블 생성
    startBubbleGeneration() {
      setInterval(() => {
        if (this.bubbles.length >= 20) {
          this.bubbles.shift(); // 오래된 버블 제거
        }
        const bubble = {
          id: Date.now() + Math.random(),
          x: Math.random() * (window.innerWidth * 0.9), // 게임 영역 너비의 90%
          y: Math.random() * (window.innerHeight * 0.7), // 게임 영역 높이의 70%
          delay: Math.random() * 2 
        };
        this.bubbles.push(bubble);
      }, 1000); // 버블 생성 간격
    },
    // 충돌 감지
    detectCollisions() {
      setInterval(() => {
        this.bubbles.forEach((bubble, bubbleIndex) => {
          this.participants.forEach((participant) => {
            const dx = bubble.x - participant.x;
            const dy = bubble.y - participant.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 45) { // 버블과 참가자의 반지름을 더한 값보다 작으면 충돌
              this.bubbles.splice(bubbleIndex, 1); // 버블 제거
              this.bubbleCount++; // 터진 버블 카운트를 증가시킴
              this.$emit('updateBubbleCount', this.bubbleCount); // 이벤트 emit
              console.log(`현재 터트린 버블갯수!! : ${this.bubbleCount}`);
              if (this.$refs.bubbleSound) {
                this.$refs.bubbleSound.play().catch(error => {
                  console.error('오디오 재생 오류:', error);
                });
              }
            }
          });
        });
      }, 50); // 50ms마다 충돌 감지
  },
  }
};
</script>
<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.board {
  position: relative;
  width: 90vw;
  height: 90vh;
  overflow: hidden;
}

.console-img {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

#game-area {
  position: absolute;
  top: 0%;
  left: 17%;
  width: 67%;
  height: 97%;
  overflow: hidden;
}

.bubble {
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 0, 255, 0.2));
  border-radius: 50%;
  position: absolute;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(0, 0, 255, 0.5);
  animation: float 2s infinite ease-in-out, rise 3s infinite ease-in-out;
  opacity: 0.7;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-50px) scale(1.2);
    opacity: 0;
  }
}

.participant {
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  position: absolute;
  transition: all 0.3s ease;
}

.music-controls {
  pointer-events: auto; 
  width: 50px;
  height: 50px;
  background-size: cover;
  cursor: pointer;

}

.music-area{
  pointer-events: auto; 
  position: fixed;
  top: 52px;
  right: 15px;
  cursor: pointer;
  height: 25px;
  transition: background-color 0.3s ease;
  text-align: center;
}
 

</style>
