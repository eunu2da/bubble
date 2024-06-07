<template>
  <div class="winner-modal" >
    <div class="winner-modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>우승자 발표 🎉</h2>
      <div class="winner-announcement">
        <p>{{ winner.emoji }} ({{ winner.id }})가 {{ winner.bCount }}개의 버블을 터트렸습니다!</p>
      </div>
      <div class="all-rankings">
        <h3>전체 참가자 랭킹</h3>
        <ul>
          <li v-for="(participant, index) in sortedParticipants" :key="participant.id" class="ranking-item">
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
.winner-modal {
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
  background-color: rgba(0, 0, 0, 0.6);
}

.winner-modal-content {
  background-color: #fefefe;
  margin: 20px;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  max-width: 500px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

h2 {
  margin-top: 0;
  color: #333;
}

.winner-announcement {
  font-size: 1.2em;
  margin-top: 20px;
}

.all-rankings {
  margin-top: 30px;
  text-align: left;
}

.all-rankings h3 {
  margin-bottom: 10px;
}

.ranking-item {
  margin: 5px 0;
  font-size: 1em;
}
</style>
