const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');
const filePath = 'storage/clientCount.txt'; // 파일 경로를 변수로 선언

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 초기 clientCount를 파일에서 로드하거나, 파일이 없으면 0으로 설정
let clientCount = fs.existsSync(filePath) ? parseInt(fs.readFileSync(filePath, 'utf8'), 10) : 0;

let participants = []; // 연결된 참가자들을 저장할 배열
//연결된 참가자들에게 할당할 이모지.
const emojis = ['🙈', '🐶', '🐱', '🦄', '🐑', '🐿️', '🐼', '🐽', '🦊', '🐯', '🐔', '🐌', '🪼', '🐋', '🪰', '🐙', '🦢', '🦉', '🐤']; 
let currentEmojiIndex = 0; //이모지를 순서대로 할당하기위해 이모지 인덱스 변수 선언

const PORT = process.env.PORT || 4000;

//참가자 소켓 연결시 파일시스템에 저장하는 역할
function saveClientCount(count) {
    fs.writeFileSync(filePath, count.toString()); 
}

io.on('connection', (socket) => {
    
    
    socket.on('hostConnected', () => {
        console.log('주최자가 접속하였습니다.');
        console.log('=====================================================');
    });
    
    socket.on('newParticipant', (data) => {

        clientCount++;                // 클라이언트 연결 시 카운트 증가
        saveClientCount(clientCount); // 증가한 카운트 저장
        
        data.emoji = emojis[currentEmojiIndex];                      // 현재 인덱스의 이모지 할당
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length; // 인덱스 업데이트
        
        const newParticipant = {
            id: socket.id,
            emoji: data.emoji,   // 이모지가 없을 경우 랜덤 선택
            x: Math.random() * 750,
            y: Math.random() * 550
        };
        console.log(`${clientCount}번째의 새로운 참가자가 들어왔습니다. ${newParticipant.emoji}`);
        console.log(`socket ID ::: ${socket.id}`);
        console.log('=====================================================');

        participants.push(newParticipant);
        io.emit('updateParticipants', participants);
        io.emit('updateClientCount', { clientCount, participants });  
    });


    socket.on('disconnect', () => {
        
        participants = participants.filter(p => p.id !== socket.id);
        clientCount--;
       
        console.log(`참가자 ${socket.id} 가 나갔습니다. `);
        console.log(`현재 남은 인원 : ${clientCount}`);
        console.log('=====================================================');

        saveClientCount(clientCount);
        io.emit('updateClientCount', { clientCount, participants });
        io.emit('updateParticipants', participants);
    });
});


app.use(express.static(path.join(__dirname, 'client')));

app.use('/server', express.static(path.join(__dirname, 'server')));
// /server 경로에 대한 리디렉션 설정
app.get('/server', (req, res) => {
    res.redirect('/server/server.html');
});
 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));