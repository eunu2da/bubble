<template>
  <div id="app">
  
      <div class="board">
        <img class="music-area" src = "../assets/client/sound_on.png" v-if="isPlaying"  @click="toggleMusic">
    <img class="music-area" src = "../assets/client/sound_off.png" v-if="!isPlaying"  @click="toggleMusic">
        <audio ref="backgroundMusic" loop>
        <source src="../assets/music/console.mp4" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <img src="@/assets/console.png" alt="Console Background" class="console-img">
      <div id="game-area">
        <div ref="gameArea"  
          v-for="participant in participants"     
          :key="participant.id"
          class="participant"
          :style="{ left: participant.x + 'px', top: participant.y + 'px' }"
        >
          {{ participant.emoji }}
        </div>
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
    participants: Array
  },
  data() {
    return {
      bubbles: [],
      bubbleCount: 0,
      isPlaying: false,
    };
  },
  mounted() {
    // 무한 버블 생성
    socket.on('gameInstructions', (data) => {
      if(data == '') {
        setTimeout(() => this.startBubbleGeneration(), 1000);
      }  
   });
   this.detectCollisions();
  },

  methods: {
    
    toggleMusic() {

      const audio = this.$refs.backgroundMusic;
      console.log('audioaudio', audio);
      if (this.isPlaying) {
          console.log('재생중 ? this.isPlaying?', this.isPlaying);
          audio.pause();
      } else {
          // 사용자의 인터랙션 이후에 오디오를 재생
          audio.play().catch(error => {
              console.error('재생 오류:', error);
          });
      }
      this.isPlaying = !this.isPlaying;
    },

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
    detectCollisions() {
      setInterval(() => {
        this.bubbles.forEach((bubble, bubbleIndex) => {
          this.participants.forEach((participant) => {
            const dx = bubble.x - participant.x;
            const dy = bubble.y - participant.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 45) { // 버블과 참가자의 반지름을 더한 값보다 작으면 충돌
              this.bubbles.splice(bubbleIndex, 1);
              this.bubbleCount++; // 터진 버블 카운트를 증가시킴
              this.$emit('updateBubbleCount', this.bubbleCount); // 이벤트 emit
              console.log(`현재 터트린 버블갯수!! : ${this.bubbleCount}`);
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
  width: 50px;
  height: 50px;
  background-size: cover;
  cursor: pointer;

}

.music-area{
  position: fixed;
  top: 52px;
  right: 15px;
  background-color : hsl(187.24deg 100% 69.39%/80%);
  cursor: pointer;
  height: 71px;
  transition: background-color 0.3s ease;
  border: 3px solid hsl(187.24deg 100% 69.39% / 80%);
  border-radius: 25px;
  text-align: center;
}
 

</style>
