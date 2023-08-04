// establish a connection to the server using socket.io
const socket =io();

//Set up a listener for the 'message' event from the server. 
// When the server emits a 'message' event, this callback function will be executed.
//  In this case, it logs the received message to the console.
socket.on('message', message => {
    console.log(message);
})