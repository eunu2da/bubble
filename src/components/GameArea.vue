<template>
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
#game-area {
  overflow: hidden;
  background-color: rgb(255 255 255 / 41%);
  border: 4px solid hsl(0deg 0% 100% / 28%);
  border-radius: 1px;
  padding: 0px;
  width: 99vw;
  height: 98vh;
  position: relative;
  margin-bottom: 20px;
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
    transform: translateY(-50px) scale(1.2); /* 50px 정도만 위로 올라가도록 설정 */
    opacity: 0;
  }
}


.participant {
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 3.5rem;
  position: absolute;
  transition: all 0.3s ease;
}
</style>
