const socket = io();

const participantList = document.getElementById('participant-list');
const clientCountElement = document.getElementById('client-count');

const participantCount = document.getElementById('participantCount');
const participantInfo = document.getElementById('participantInfo');


// 주최자 접속
socket.emit('hostConnected');

socket.on('updateClientCount', (data) => {

    if(data.count == undefined){
        participantCount.innerHTML = '';
    }else{
        participantCount.innerHTML = `<h1>${data.count}명의</h1><h2>접속자가</h2><h2>대기중</h2><h2>이에요💛</h2>`;
    }
    
    if(data.socketId == undefined){
        participantInfo.innerHTML = '';
    }else{
        participantInfo.append(`${data.emoji} ${data.socketId}`); 
    }

});
