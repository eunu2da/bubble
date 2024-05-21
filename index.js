const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


let participants = []; // 연결된 참가자들을 저장할 배열
//연결된 참가자들에게 할당할 이모지.
const emojis = ['🙈', '🐶', '🐱', '🦄', '🐑', '🐿️', '🐼', '🐽', '🦊', '🐯', '🐔', '🐌', '🪼', '🐋', '🪰', '🐙', '🦢', '🦉', '🐤']; 
let currentEmojiIndex = 0; //이모지를 순서대로 할당하기위해 이모지 인덱스 변수 선언

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
    
    socket.on('hostConnected', () => {
        console.log('주최자가 접속하였습니다.');
        console.log('=====================================================');
    });
    
    socket.on('newParticipant', (data) => {

        data.emoji = emojis[currentEmojiIndex];                      // 현재 인덱스의 이모지 할당
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length; // 인덱스 업데이트
        
        const newParticipant = {
            id: socket.id,
            emoji: data.emoji,   // 이모지가 없을 경우 랜덤 선택
            // x: Math.random() * 260,
            // y: Math.random() * 300
            x: Math.random() * data.gameAreaSize.top,  // 참가자의 x축으로 계산
            y: Math.random() * data.gameAreaSize.right,   // 참가자의 y축으로 계산
        };

        participants.push(newParticipant);
        console.log(`${participants.length}번째의 새로운 참가자가 들어왔습니다. ${newParticipant.emoji}`);
        console.log(`socket ID ::: ${socket.id}`);
        console.log('현재 참가자는 ' +  participants.length +'명입니다.');
        console.log('=====================================================');

        let addParticipant = {
            count : participants.length,
            emoji : newParticipant.emoji,
            socketId : socket.id
        }

        io.emit('updateParticipants', participants);
        io.emit('updateClientCount', addParticipant); //server전송
    });

    socket.on('disconnect', () => {
    
        participants = participants.filter(p => p.id !== socket.id);
    
        console.log(`참가자 ${socket.id} 와의 연결이 끊어졌습니다.`);
        console.log('현재 참가자는 ' +  participants.length +'명입니다.');
        console.log('======================================================');
        io.emit('updateParticipants', participants);
        io.emit('updateClientCount', participants); 
    });

});
// '/client' 경로에 접속하면, 해당 폴더에 있는 'client.html'을 기본 페이지로 자동로드.
app.use('/client', express.static(path.join(__dirname, 'client'), { index: 'client.html' }));
app.use('/server', express.static(path.join(__dirname, 'server'), { index: 'server.html' }));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));