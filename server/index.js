const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let participants = []; // 연결된 참가자들을 저장할 배열
const emojis = ['🙈', '🐶', '🐱', '🦄', '🐑', '🐿️', '🐼', '🐽', '🦊', '🐯', '🐔', '🐌', '🪼', '🐋', '🪰', '🐙', '🦢', '🦉', '🐤'];
let currentEmojiIndex = 0; // 이모지를 순서대로 할당하기 위해 이모지 인덱스 변수 선언

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {

    socket.on('newParticipant', (data) => {
        data.emoji = emojis[currentEmojiIndex];
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;

        const newParticipant = {
            id: socket.id,
            emoji: data.emoji,
            x: Math.random() * data.gameAreaSize.right,
            y: Math.random() * data.gameAreaSize.top,
        };

        participants.push(newParticipant);
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

    socket.on('goBack', () => {
        participants = participants.filter(p => p.id !== socket.id);
        console.log(`참가자 ${socket.id} 와의 연결이 끊어졌습니다.`);
        console.log('현재 참가자는 ' + participants.length + '명입니다.');
        io.emit('updateParticipants', participants);
        io.emit('updateClientCount', participants);
    });

    socket.on('disconnect', () => {
        participants = participants.filter(p => p.id !== socket.id);

        console.log(`참가자 ${socket.id} 와의 연결이 끊어졌습니다.`);
        console.log('현재 참가자는 ' + participants.length + '명입니다.');
        console.log('======================================================');
        io.emit('updateParticipants', participants);
        io.emit('updateClientCount', participants);
    });

    socket.on('startGame', () => {

        const gameInstructions = [
            '이 게임은 생존자가 한 명이 될 때까지 자리를 빼앗는 게임입니다.',
            '다음 단계로 넘어갈 때마다 원이 랜덤으로 줄어드는데요.',
            '랜덤의 자리에 원이 배치되니 유의하시고',
            '그럼 마지막 원을 향해 다 같이 달려볼까요?',
            3,
            2,
            1,
            'start!',
          ];
          
          function sendInstruction(index) {
            if (index < gameInstructions.length) {
              io.emit('gameInstructions', gameInstructions[index]);
              setTimeout(() => sendInstruction(index + 1), 2000);
            } else {
              // 모든 지침을 전송한 후에 마지막으로 빈 문자열을 보냄
              io.emit('gameInstructions', '');
            }
          }
          // 시작
          sendInstruction(0);
    });
});

// 정적 파일 serve
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
