const socket = io();

const enterButton = document.getElementById('enter-button'); // 입장
const mainScreen = document.getElementById('main-screen');
const gameArea = document.getElementById('game-area');
const participant = document.getElementById('participant');
const myCharacter = document.getElementById('myCharacter');
const numOfsurvivors = document.getElementById('numOfsurvivors');

// 클라이언트 접속
socket.emit('clientConnected');

// 입장 버튼 클릭 시 서버에 참가자 정보 전송
enterButton.addEventListener('click', () => {
    
    socket.emit('newParticipant', { emoji: ''});
    mainScreen.style.display = 'none';
    gameArea.style.display = 'flex';
    myCharacter.style = 'flex';
});

// 서버로부터 참가자 정보 수신 및 화면 업데이트
socket.on('updateParticipants', (participants) => {
    gameArea.innerHTML = '';  // 기존 참가자 정보를 지움
    participants.forEach((p) => {
        const newParticipant = document.createElement('div');
        newParticipant.className = 'participant';
        newParticipant.style.left = `${p.x}px`;
        newParticipant.style.top = `${p.y}px`;
        newParticipant.textContent = p.emoji;
        newParticipant.style.fontSize = '2.5rem';
        newParticipant.id = p.id;  

        // 현재 소켓 ID와 일치하는 참가자의 경우 특별한 스타일과 myCharacter 요소 업데이트
        if (p.id === socket.id) {
            newParticipant.style.border = '8px solid #00ffc6';  // 테두리 적용
            var aa = "it's me ➡️ " + p.emoji;
            myCharacter.innerHTML = `<h1 style="font-size: 3rem; color:white">${aa}</h1>`;  // myCharacter 요소 업데이트
            myCharacter.style.display = 'block';  // myCharacter를 보이게 설정
        }
        numOfsurvivors.style.display = 'block';
        numOfsurvivors.innerHTML = `접속자 수: ${participants.length}명`; 
        gameArea.appendChild(newParticipant);  // 새 참가자를 게임 영역에 추가
    });

    

});



