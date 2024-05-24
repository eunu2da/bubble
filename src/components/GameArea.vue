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
  </div>
</template>

<script>
export default {
  props: {
    participants: Array
  }
};
</script>

<style scoped>
#game-area {
  overflow: hidden;
  background-color: #151561;
  border: 6px solid rgb(74 69 255 / 42%);
  border-radius: 15px;
  padding: 0px;
  width: 90vw;
  height: 70vh;
}

.participant {
  width: 50px;
  height: 50px;
  background-color: #4caf50;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
  position: absolute;
  transition: all 0.3s ease;
}
</style>
