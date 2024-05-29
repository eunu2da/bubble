<template>
  <div id="host-info">
    <div class="dashboard-section">
     

      <div v-if="isWaiting">      
        <h2 class="parti">접속자🦰</h2>
        <div v-for="info in participantInfos" :key="info.id">
          {{ info.emoji }} {{ info.id }}
        </div>
      </div>
      <div v-if="recordStart">      
        <h1 class="record">record🏆</h1>
        <div v-for="info in participantInfos" :key="info.id" >
          {{ info.emoji }} {{ info.id }} 가 {{ info.bCount }}개!
        </div>
      </div>
      <div class="survivorCount" v-if="recordStart">
          {{remainingTimeTxt}}
      </div>
    </div>
    
    <div v-if="isWaiting">
      <h3 class="parti-num">{{ survivorsCountText }}</h3>
      <div class="entranceNum-info" id="participantCount">
        <button class="start-game" @click="startGame">start 🏃‍♀️</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
var socket = io();

export default {
  data() {
    return {
      participantInfos: [],
      survivorsCountText: '접속인원 0명',
      isWaiting: true,
      recordStart : false,  
      remainingTimeTxt: '참가자들에게 게임 설명중 ...',
    };
  },
  methods: {
    startGame() {
      if (this.participantInfos.length == 0) {
        alert('접속중인 참가자가 없어요!');
      }else{
        this.isWaiting = false; // 버튼 비활성화
        this.recordStart =  true;
        socket.emit('startGame');
      }
    },

    startTimer() {
      this.remainingTime = 30;
      this.timerInterval = setInterval(() => {
        this.remainingTimeTxt = `남은 종료 시간 :${this.remainingTime--}`; 
        if (this.remainingTime <= 0) {
          clearInterval(this.timedrInterval);
          socket.emit('endGame');
          this.remainingTime = 0;
        }
      }, 1000);
    },
  },

  mounted() {

    socket.on('updateParticipants', (participants) => {
      console.log(` ${socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participantInfos = participants;
      this.survivorsCountText = `접속 인원: ${participants.length}명`;

      const currentUser = participants.find((p) => p.id === socket.id);
      if (currentUser) {
        this.myEmoji = currentUser.emoji;
        this.showMyCharacter = true;
        console.log('Current User Emoji:', this.myEmoji);
      } else {
        console.log('Current user not found in participants.');
      }
    });

    socket.on('gameInstructions', (data) => {
      if(data == '') {              
       this.startTimer();
     }
    });

    socket.on('bubbleBuster', (data) => {
      const currentUserIndex = this.participantInfos.findIndex((p) => p.id === data.id);
      if (currentUserIndex !== -1) {
        this.participantInfos[currentUserIndex].bCount = data.bCount;
      } else {
        this.participantInfos.push({ id: data.id, emoji: data.emoji, bCount: data.bCount });
      }
      this.participantInfos.sort((a, b) => b.bCount - a.bCount);
    });
   
  },
};
</script>

<style scoped>
#host-info {
  width: 100vw;
  height: 98vh;
}

.dashboard-section {
   
  color: white;
  background-color: rgb(0 0 255 / 0%);
}

.entranceNum-info {
  width: 140px;
  height: 50px;
  margin-top: 40px;
}

.start-game {
  background-color: #4caf50;
  color: white;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 40px;
  margin-top: 70px;
  width: 140px;
}
 
.participant-info {
  width: 300px;
}

.record {
  text-align: center;
  color: gold;
}

.parti{
  text-align: center;
}

.parti-num {
  background-color: rgba(0, 0, 0, .5);
  color: white;
  padding: 30px;
  z-index: 1000;
}

.survivorCount {
  position: fixed;
  top: 10px;
  right: 20px;
  background-color: rgba(0, 0, 0, .5);
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  z-index: 1000;
}
</style>
