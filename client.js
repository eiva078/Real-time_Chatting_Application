const socket = io('http://localhost:8000/')

const form = document.getElementById('form');
const messageInp= document.getElementById('input');
const messageContainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = ''
})

const name = prompt("Enter Your Name to Join");

socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'center')
})
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('leave', name=>{
    append(`${name} left the chat`, 'center')
})