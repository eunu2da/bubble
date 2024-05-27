<template>
  <div id="host-info">
    <div class="dashboard-section">
      <ParticipantInfo :participantInfos="participantInfos" />
    </div>
    
    <div class="dashboard-section">
      <h3> {{ survivorsCountText }}</h3>
      <div class="entranceNum-info" id="participantCount">
        <button class="start-game" @click="startGame">start 🏃‍♀️</button>
      </div>
    
    </div>
  </div>
</template>

<script>
import ParticipantInfo from '@/components/ParticipantInfo.vue';

import io from 'socket.io-client';
var socket = io();

export default {
  components: {
    ParticipantInfo
  },
  data() {
    return {
      participantInfos: [],
      survivorsCountText:'접속인원 0명',
    };
  },
  methods: {
  
    startGame() {
     socket.emit('startGame');
    }
  },
  

  mounted() {
    
  socket.on('updateParticipants', (participants) => {
        console.log(` ${socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
        this.participantInfos = participants;
        this.survivorsCountText = `접속 인원: ${participants.length}명`;
        
        const currentUser = participants.find(p => p.id === socket.id);
        if (currentUser) {
          this.myEmoji = currentUser.emoji;
          this.showMyCharacter = true;
          console.log('Current User Emoji:', this.myEmoji);
          
        } else {
          console.log('Current user not found in participants.');
        }
      });
  }


};
</script>

<style scoped>
#host-info {
  display: flex;
  width: 90%;
}

.dashboard-section {
  margin: 22px;
  padding: 15px;
  text-align: center;
  color: white;
  background-color: #282c34;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.entranceNum-info {
  width: 140px;
  height: 50px;
  margin-top : 40px;
}

.start-game {
  width: 100%;
  background-color: #4e8bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.start-game:hover {
  background-color: #669cff;
}
</style>
