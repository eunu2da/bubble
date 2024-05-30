<template>
  <div id="host-info" class="container">
    <div class="dashboard-section">
      <div v-if="isWaiting">      
        <h2 class="title">접속자🦰</h2>
        <h3 class="participant-num">{{ survivorsCountText }}</h3>
        <div class="participant-list">
          <div v-if="participantInfos.length == 0" class="participant-info">
            <h2 class="noParti">접속중인 참가자가 없어요.🫨</h2>
          </div>
          <div v-for="info in participantInfos" :key="info.id" class="participant-info">
            {{ info.emoji }} {{ info.id }}
          </div>
        </div>
      </div>
      <div v-if="recordStart">      
        <h1 class="title">record🏆</h1>
        <div class="participant-list">
          <div v-for="(info, index) in sortedParticipantInfos" :key="info.id" :class="['rank-info', rankClass(index)]">
            {{ index + 1 }}등: {{ info.emoji }} {{ info.id }} 가 {{ info.bCount }}개!
          </div>
        </div>
      </div>
      <div class="survivorCount" v-if="recordStart">
          {{remainingTimeTxt}}
      </div>
    </div>
    <div v-if="isWaiting">
      <button class="start-game" @click="startGame">start 🏃‍♀️</button> 
    </div>
   
    <WinnerModal :visible="showWinnerModal" :winner="winner" @close="showWinnerModal = false" />
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
      timerInterval: null,
      remainingTime: 0,
      howWinnerModal: false,
      winner: null
    };
  },
  computed: {
    sortedParticipantInfos() {
      return [...this.participantInfos].sort((a, b) => b.bCount - a.bCount);
    }
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
      this.remainingTime = 180;
      this.timerInterval = setInterval(() => {
        this.remainingTimeTxt = `남은 종료 시간 :${this.remainingTime--}`; 
        if (this.remainingTime <= 0) {
          clearInterval(this.timerInterval);
          socket.emit('endGame');
          this.endGame();
        }
      }, 1000);
    },

    endGame() {
      socket.emit('endGame');
      const winner = this.sortedParticipantInfos[0];
      this.winner = winner;
      this.showWinnerModal = true;
    },
    // requestRankUpdate() {
    //   socket.emit('updateRanks');
    // }
    rankClass(index) {
      switch (index) {
        case 0:
          return 'first-place';
        case 1:
          return 'second-place';
        case 2:
          return 'third-place';
        default:
          return 'other-ranks';
      }
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
      //this.requestRankUpdate(); // 랭크 업데이트 요청
    });
   
    // socket.on('rankUpdate', (sortedParticipants) => {
    //   this.participantInfos = sortedParticipants;
    // });

  },
};
</script>

<style scoped>

#host-info {
  width: 100vw;
  height: 98vh;
  display: flex;
  flex-direction: column;
}

body {
  user-select: none; 
  touch-action: manipulation; 
}

.participant-list {
  max-height: 50vh; 
  overflow-y: auto; 
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.dashboard-section {
  width: 100%;
  background-color: rgba(0, 0, 255, 0.1);
  height : 100%;
}

.title {
  font-size: 1.5rem;
  text-align: center;
  color: hsla(0,0%,100%,.5);
  margin-bottom: 20px;
}

.participant-info {
  font-size: 1.5rem;
  color: hsla(0,0%,100%,.38);
  text-align: center;
  margin: 10px 0;
}

.rank-info {
  font-size: 1.5rem;
  text-align: center;
  margin: 10px 0;
}

.first-place {
  font-size: 2rem;
  font-weight: bold;
  color: #ff0000; /* 금색 */
}

.second-place {
  font-size: 1.75rem;
  font-weight: bold;
  color: #ff5100; /* 은색 */
}

.third-place {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffbb00; /* 동색 */
}

.other-ranks {
  font-size: 1.25rem;
  color: #4935ff;
}

.survivorCount {
  font-size: 1.2rem;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
}

.participant-num {
  color: white;
  background-color: hsla(0,0%,100%,.38);
  padding: 10px;
  text-align: center;
}
 
.start-game {
  font-size: 1.5rem;
  color: white;
  background-color: rgba(0,0,255,.5);
  padding: 10px;
  border: none; 
  width: 100vw; 
}

.noparti {
  color : hsl(0deg 0% 100%/40%);
}

</style>