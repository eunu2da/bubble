<template>
  <div id="host-info">
    <div class="dashboard-section">
      <ParticipantInfo :participantInfos="participantInfos" />
    </div>
    <div class="dashboard-section">
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
      participantInfos: []
    };
  },
  methods: {
    startGame() {
      // 게임 시작 로직
      socket.emit('startGame');
    }
  },
  mounted() {
      socket.on('updateClientCount', (data) => {
      this.participantInfos.push({ id: data.socketId, emoji: data.emoji });
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
