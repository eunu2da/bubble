<template>
  <div class="modal" >
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>우승자 발표 🎉</h2>
      <div class="winner-announcement">
        <p>{{ winner.emoji }} ({{ winner.id }})가 {{ winner.bCount }}개의 버블을 터트렸습니다!</p>
      </div>
      <div class="all-rankings">
        <h3>전체 참가자 랭킹</h3>
        <ul>
          <li v-for="(participant, index) in sortedParticipants" :key="participant.id">
            {{ index + 1 }}등: {{ participant.emoji }} ({{ participant.id }}) - {{ participant.bCount }}개
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    winner: {
      type: Object,
      default: () => ({})
    },
    sortedParticipants: {
      type: Array,
      default: () => []
    },
    myRank: {
      type: Number,
      default: 0
    },
    myBubbleCount: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
  border-radius: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.winner-announcement,
.your-ranking,
.all-rankings {
margin-top: 20px;
}

.ranking-item {
  margin: 5px 0;
}

</style>
