// Get a reference to the 'container-chatroom-form-text' in the chat.html to allow the display of submitted message 
const chatForm = document.getElementById('container-chatroom-form-text');

// establish a connection to the server using socket.io
const socket = io();

//Set up a listener for the 'message' event from the server. 
// When the server emits a 'message' event, this callback function will be executed.
//  In this case, it logs the received message to the console.
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
})

//message submit
chatForm.addEventListener('submit', (e) => {
    // P the default form submission behavior, which would cause the page to reload.
    e.preventDefault();

    //get the value of the input field (message text)
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg)
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('container-chatroom-main-message');
    div.innerHTML = `<div class="container-chatroom-main-message-data"> ${message.username} <span>${message.time}</span> </div>
    <div class="container-chatroom-main-message-text">
        ${message.text}
    </div>`;
    document.querySelector('.container-chatroom-main-messages').appendChild(div);
}