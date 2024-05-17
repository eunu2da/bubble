const socket = io();

const participantList = document.getElementById('participant-list');
const clientCountElement = document.getElementById('client-count');

// 주최자 접속
socket.emit('hostConnected');

// 서버로부터 클라이언트 수와 참가자 정보 수신 및 화면 업데이트
socket.on('updateClientCount', (data) => {
    clientCountElement.textContent = `접속자 수: ${data.clientCount}`;
    participantList.innerHTML = '';
    data.participants.forEach((p) => {
        const participantItem = document.createElement('div');
        participantItem.className = 'participant';
        participantItem.innerHTML = `
            <div>ID: ${p.id}</div>
            <div>Emoji: ${p.emoji}</div>
        `;
        participantList.appendChild(participantItem);
    });
});
