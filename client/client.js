const socket = io();

const enterButton = document.getElementById('enter-button'); // 입장
const mainScreen = document.getElementById('main-screen');
const gameArea = document.getElementById('game-area');
const participant = document.getElementById('participant');
const myCharacter = document.getElementById('myCharacter');
const myCharacterLocation = document.getElementsByClassName('myCharacter');
const numOfsurvivors = document.getElementById('numOfsurvivors');
const currentSurvivors = document.getElementById('currentSurvivors');
const backButton = document.getElementById('back-button');
const placeholder = document.getElementById('placeholder');


// 클라이언트 접속
socket.emit('clientConnected');

// 입장 버튼 클릭 시 서버에 참가자 정보 전송
enterButton.addEventListener('click', () => {
    gameArea.style.display = 'block';
    var obj = {};
    var gameAreaSize = gameArea.getBoundingClientRect(); //참가자의 게임공간 구하기 
    obj.top = gameAreaSize.top; //
    obj.right = gameAreaSize.right;
    console.log(`해당참가자의 게임공간 크기를 서버에 전송합니다 x: ${obj.top}   y:${obj.right}`);
    socket.emit('newParticipant', { emoji: '', gameAreaSize: obj});
    mainScreen.style.display = 'none';
    myCharacter.style = 'block';
    backButton.style.display = 'block';
});


myCharacter.addEventListener('click', () => {
    alert(`나의 socket id는 ${socket.id}이에요!`);
});

//뒤로가기 버튼을 클릭했을때
backButton.addEventListener('click', () => {
    window.location.href = 'client.html';
});


gameArea.addEventListener('click', function(event) {

    const style = getComputedStyle(event.target);
    if(style.left == 'auto' && style.top == 'auto'){
        alert(`이곳은 게임영역입니다. 클릭한곳의 위치는 x 는${event.x}이고 , y는 ${event.y}입니다.`);
    }else{
        const x = style.left;
        const y = style.top;
        //이동할때마다 실시간으로 보내기.
        alert(`클릭한 요소의 ID는 ${event.target.id}입니다. 현재 위치는, 가로: ${x}, 세로: ${y}입니다.`);
    };
});



// 서버로부터 참가자 정보 수신 및 화면 업데이트
socket.on('updateParticipants', (participants) => {
    gameArea.innerHTML = '';  // 기존 참가자 정보를 지움
    participants.forEach((p) => {
        const newParticipant = document.createElement('p');
        newParticipant.className = 'participant';
        newParticipant.style.left = `${p.x}px`;
        newParticipant.style.top = `${p.y}px`;
        newParticipant.textContent = p.emoji;
        newParticipant.style.fontSize = '2.5rem';
        newParticipant.id = p.id;  
        
        // 현재 소켓 ID와 일치하는 참가자의 경우 특별한 스타일과 myCharacter 요소 업데이트
        if (p.id === socket.id) {
            newParticipant.style.border = '8px solid #00ffc6';  // 테두리 적용
            console.log(`이모지와 이모지의 위치를 배정 받았습니다. 현재 이모지의 위치는 => x: ${p.x} y: ${p.y}`);
            myCharacter.innerHTML = `<h3 style="font-size: 1.5rem; color: white; display: inline;">it's me</h3>
                                     <br><span style="font-size: 4rem; color: white; display: inline;">${p.emoji}</span>`;
            myCharacter.style.display = 'block';  // myCharacter를 보이게 설정
        }
        numOfsurvivors.style.display = 'block';
        currentSurvivors.style.display = 'block';
        
        if(mainScreen.style.display == 'none'){
            placeholder.style.display = 'block';
            currentSurvivors.innerHTML = `<p style="font-size: 2rem; color: ##6e1aff; font-weight:bold; display: inline;">대기중인 인원 : ${participants.length}</<p>`;
        }else{
            numOfsurvivors.innerHTML = `현재 ${participants.length}명이 접속중 !😁`; 
        }
        gameArea.appendChild(newParticipant);  // 새 참가자를 게임 영역에 추가
    });
});



