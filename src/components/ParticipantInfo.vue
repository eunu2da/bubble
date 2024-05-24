<template>
  <div class="participant-info">
    <h2>접속자🦰</h2>
    <p>{{survivorsCountText}}</p>
    <div v-for="info in participantInfos" :key="info.id">
        {{ info.emoji}} {{info.id}} {{info.count}}
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
var socket = io();

export default {
  props: {
    participantInfos: Array,
    survivorsCountText: '',
  },
  

  mounted(){
    socket.on('connect', () => {
      console.log('주최자가 접속하였습니다~', socket.id);
    });

    socket.on('updateParticipants', (participants) => {
      console.log(` ${socket.id}가 updateParticipants 이벤트 수신하였습니다.`);
      this.participantInfos = participants;
      this.survivorsCountText = `접속 인원: ${participants.length}`;
    });

    // socket.on('bubbleBuster', (data) => {
    
    //   this.participantInfos.push({ id: data.id, emoji: data.emoji, count: data.bCount  });
    // });
  } 
};

</script>

<style scoped>
.participant-info {
  width: 300px;
}
</style>
