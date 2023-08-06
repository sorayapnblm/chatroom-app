// Get references to specific HTML elements in the chat.html module 
const chatForm = document.getElementById('container-chatroom-form-text');
const chatMessages = document.querySelector('.container-chatroom-main-messages');
const roomName = document.getElementById('container-chatroom-main-room-name');
const userList = document.getElementById('container-chatroom-main-users');

// Get username and room from URL 
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// Set up a WebSocket connection to the server using socket.io by creating a socket object
const socket = io();

// Join chatroom
// Emit a joinRoom event to the server => indicate that the current user is joining a specific chat room along with their username
socket.emit('joinRoom', { username, room });


// Set up a listener for the roomUsers event emitted by the server. This event is used to update the list of users in the chat room.
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

//Set up a listener for the 'message' event from the server. 
// When the server emits a 'message' event, this callback function will be executed.
//  In this case, it logs the received message to the console.
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight;
})


// Set up an event listener for the form's submit event. When the user submits the form (sends a message), the callback function is executed.
chatForm.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior, which would cause the page to reload.
    e.preventDefault();

    //get the value of the input field (message text)
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg)

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
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

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}