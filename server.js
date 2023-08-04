// import path module
const path = require('path');
// import http module
const http = require('http');
// import express;js framework
const express = require('express');

const socketio = require('socket.io');

//create an instance of the Express application
const app = express();
//create an HTTP server instance using express as a request listener
const server = http.createServer(app);
// initialize socket.io using the server instance to handle real-time communication
const io = socketio(server);

// Set staic folder
app.use(express.static(path.join(__dirname, 'html-scss-css-js')));


// set up event handler for when a new websocket connection is established. 
io.on('connection', socket => {

    //send a welcome message to the new user in the console
    socket.emit('message', 'Welcome Soraya!')

    // Broadcast a message to all connected clients except the one who just joined
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnects 
    // Event listener notified when a user disconnects.
    // Broadcast a message to all clients indicating that a user has left the chat.
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })

    //listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);

    })

})

// initialize the port
const PORT = process.env.PORT || 3000;


// instruct the Express application to start listening on the specified port for incoming http requests
// when the server starts successfully, it will log a message
server.listen(PORT, () => console.log(`Server running on port  ${PORT}`));