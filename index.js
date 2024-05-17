const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 4000;

let participants = [];
let clientCount = 0;
const emojis = ['🙈', '🐶', '🐱', '🦄', '🐑', '🐿️', '🐼', '🐽', '🦊', '🐯', '🐔', '🐌', '🪼', '🐋', '🪰', '🐙', '🦢', '🦉', '🐤'];

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    clientCount++;
    io.emit('updateClientCount', { clientCount, participants });

    // 주최자 접속 확인
    socket.on('hostConnected', () => {
        console.log('주최자가 접속하였습니다.');
    });

    // 클라이언트 접속 확인
    socket.on('clientConnected', () => {
        console.log('클라이언트가 접속하였습니다.');
    });

    // 새로운 참가자가 연결될 때 처리
    socket.on('newParticipant', (data) => {
        const newParticipant = {
            id: socket.id,
            emoji: data.emoji,
            x: Math.random() * 750, // 랜덤한 위치
            y: Math.random() * 550, // 랜덤한 위치
        };
        participants.push(newParticipant);
        io.emit('updateParticipants', participants);
    });

    // 참가자 연결 해제 시 처리
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        participants = participants.filter(p => p.id !== socket.id);
        clientCount--;
        io.emit('updateClientCount', { clientCount, participants });
        io.emit('updateParticipants', participants);
    });
});

// 클라이언트 페이지 서빙
app.use(express.static(path.join(__dirname, 'client')));

// 주최자 페이지 서빙
app.use('/server', express.static(path.join(__dirname, 'server')));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
