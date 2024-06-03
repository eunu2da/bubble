<template>
  <div id="app">
    <div class="board">
      <div class="joycon joycon-left">
        <img src="@/assets/left.png" alt="Joy-Con Left" class="joycon-img">
      </div>
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
      <div class="joycon joycon-right">
        <img src="@/assets/right.png" alt="Joy-Con Right" class="joycon-img">
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
      bubbleCount: 0
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
  border-top-right-radius: 80px;
  border-bottom-right-radius: 100px;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
}

.board {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#game-area {
  flex-grow: 1;

  position: relative;
  overflow: hidden;
}

.bubble {
  width: 50px;
  height: 50px;
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
  font-size: 2.5rem;
  position: absolute;
  transition: all 0.3s ease;
}

.joycon {
  display: flex; 
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.joycon-left {
  margin-right: 0;
}

.joycon-right {
  margin-left: 0;
}

.joycon-img {
  width: 20vw;
  height: 100vh;
}

</style>
