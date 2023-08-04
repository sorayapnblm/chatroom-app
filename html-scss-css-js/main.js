// Get a reference to the 'container-chatroom-form' in the chat.html to allow the display of submitted message 
const chatForm = document.getElementById('container-chatroom-form');

// establish a connection to the server using socket.io
const socket =io();

//Set up a listener for the 'message' event from the server. 
// When the server emits a 'message' event, this callback function will be executed.
//  In this case, it logs the received message to the console.
socket.on('message', message => {
    console.log(message);
})

//message submit
chatForm.addEventListener('submit', (e) => {
    // P the default form submission behavior, which would cause the page to reload.
    e.preventDefault();

    //get the value of the input field
    const msg = e.target.elements.msg.value;

    // log the message content to the console.
    console.log(msg);
})