const socket = io();

const enterButton = document.getElementById('enter-button'); // 입장
const mainScreen = document.getElementById('main-screen');
const gameArea = document.getElementById('game-area');
const participant = document.getElementById('participant');


// 클라이언트 접속
socket.emit('clientConnected');

// 입장 버튼 클릭 시 서버에 참가자 정보 전송
enterButton.addEventListener('click', () => {
    
    socket.emit('newParticipant', { emoji: ''});
    mainScreen.style.display = 'none';
    gameArea.style.display = 'flex';
});

// 서버로부터 참가자 정보 수신 및 화면 업데이트
socket.on('updateParticipants', (participants) => {
    gameArea.innerHTML = '';
    participants.forEach((p) => {
        const newParticipant = document.createElement('div');
        newParticipant.className = 'participant';
        newParticipant.style.left = `${p.x}px`;
        newParticipant.style.top = `${p.y}px`;
        newParticipant.textContent = p.emoji;
        newParticipant.style.fontSize = '3rem';
        gameArea.appendChild(newParticipant);
    });
});
