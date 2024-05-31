const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors'); // CORS 패키지 추가

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// CORS 미들웨어 추가
app.use(cors());

let participants = []; // 연결된 참가자들을 저장할 배열
const emojis = ['🙈', '🐶', '🐱', '🦄', '🐑', '🐿️', '🐼', '🐽', '🦊', '🐯', '🐔', '🐌', '🪼', '🐋', '🪰', '🐙', '🦢', '🦉', '🐤'];
let currentEmojiIndex = 0; // 이모지를 순서대로 할당하기 위해 이모지 인덱스 변수 선언
let gameEnded = true;     // 게임 종료 상태
let gameStarted = false;   // 게임 시작 상태

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {

  socket.emit('currentclientCount', participants.length);

  socket.on('checkGameStatus', () => {
    if (gameStarted) {
      socket.emit('gameAlreadyStarted');
    } else {
      socket.emit('gameNotStarted');
    }
  });
  
    socket.on('newParticipant', (data) => {

        data.emoji = emojis[currentEmojiIndex];
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;

        const newParticipant = {
            id: socket.id,
            emoji: data.emoji,
            x: Math.random() * data.gameAreaSize.right,
            y: Math.random() * data.gameAreaSize.top,
            bubbleCount : 0,
        };

        participants.push(newParticipant);

        console.log(`${participants.length}번째 참가자 ${socket.id}가 입장하였습니다.`);
        console.log('======================================================');
        console.log('접속 참가자 명단 :', participants);
        io.emit('updateParticipants', participants);
    });

    socket.on('updateParticipantPosition', (updatedParticipant) => {
        const participant = participants.find(p => p.id === updatedParticipant.id);
        if (participant) {
            participant.x = updatedParticipant.x;
            participant.y = updatedParticipant.y;
            io.emit('positionUpdate', participant);
        }
    });
    
    socket.on('bubbleBuster', (data) => {
     io.emit('bubbleBuster', data);  
    });


    socket.on('goBack', () => {
        participants = participants.filter(p => p.id !== socket.id);
        console.log(`참가자 ${socket.id} 와의 연결이 끊어졌습니다.`);
        console.log('현재 참가자는 ' + participants.length + '명입니다.');
        io.emit('updateParticipants', participants);
    });

    socket.on('disconnect', () => {
        participants = participants.filter(p => p.id !== socket.id);
        console.log(`참가자 ${socket.id} 와의 연결이 끊어졌습니다.`);
        console.log('현재 참가자는 ' + participants.length + '명입니다.');
        console.log('======================================================');
        io.emit('updateParticipants', participants);
    });

    socket.on('startGame', () => {
        gameStarted = true;
        gameEnded = false; // 게임 시작 시 게임 종료 상태를 초기화

        const gameInstructions = [
            '이 게임은 방울을 많이 터트리는 사람이 우승하는 게임이에요.',
            '어떤 방울 안에는 특별한 선물도 들어있답니다~ㅎㅎ',
            '그럼 준비하시고 ~',
            3,
            2,
            1,
            'start!',
          ];
          
          function sendInstruction(index) {
            if (index < gameInstructions.length) {
              io.emit('gameInstructions', gameInstructions[index]);
              setTimeout(() => sendInstruction(index + 1), 500); //2000
            } else {
              // 모든 지침을 전송한 후에 마지막으로 빈 문자열을 보냄
              io.emit('gameInstructions', '');
              setTimeout(() => {
                if(!gameEnded){
                  io.emit('gameEnd');
                  console.log('게임이 종료되었습니다.');
                  gameStarted = false;
                  gameEnded = true; // 게임 종료 상태 true
                }
              }, 30000); // 120초 후에 게임 종료
            }
          }
          sendInstruction(0); // 시작    
    });
  
    socket.on('updateRanks', (sortedParticipants) => {
      console.log('New Rank !!!!!!!!!!!!!!', sortedParticipants);

      let currentRank = 1;
      sortedParticipants.forEach((participant, index) => {
        if (index > 0 && sortedParticipants[index].bCount === sortedParticipants[index - 1].bCount) {
          io.to(participant.id).emit('rankUpdate', { 
            rank: currentRank,
            bCount: participant.bCount,
            firstPlace: sortedParticipants[0],
            allParticipants: sortedParticipants
          });
        } else {
          currentRank = index + 1;
          io.to(participant.id).emit('rankUpdate', { 
            rank: currentRank,
            bCount: participant.bCount,
            firstPlace: sortedParticipants[0],
            allParticipants: sortedParticipants
          });
        }
      });
    });


    socket.on('gameResult', (resultInfoData) => {
      console.log(`socket.emit('showRank', resultInfoData); ::: ` ,resultInfoData );
        io.emit('showRank', resultInfoData);
    })
  });

// 정적 파일 serve
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
