// Import path module
const path = require('path');
// Import http module
const http = require('http');
// Import express.js framework
const express = require('express');
// Import socket.io to enable real-time communication between the server and clients using WebSockets
const socketio = require('socket.io');
// Import the formatMessage function from the ./utils/messages module
const formatMessage = require('./utils/messages');
// Import (userJoin, getCurrentUser, userLeave, and getRoomUsers) from the ./utils/users module
const {userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

//Create an instance of the Express application
const app = express();
//Create an HTTP server instance using express as a request listener
const server = http.createServer(app);
// Initialize socket.io using the server instance to handle real-time communication
const io = socketio(server);

// Set static folder to allow them to be accessible from the browser
app.use(express.static(path.join(__dirname, 'html-scss-css-js')));

const autoMessageName = ' Soraya ';
// Set up event handler for when a new websocket connection is established. 
// The code inside this block will be executed whenever a client connects.
io.on('connection', socket => {
    // This block of code listens for the joinRoom event emitted by the client. It handles the logic when a user joins a chat room.
    socket.on('joinRoom', ({ username, room }) => {
        // The userJoin function is called to create a user object and store it in the users array
        const user = userJoin(socket.id, username, room);
        // The user is added to the socket.io room with the same name as the chat room they joined
        socket.join(user.room);
        
        //Send a welcome message to the new user in the console
        socket.emit('message', formatMessage(autoMessageName, 'Welcome Soraya!'));

        // Broadcast a message to all connected clients except the one who just joined
        socket.broadcast.to(user.room).emit('message', formatMessage(autoMessageName, `${user.username} has joined the chat`));

        // Send users and room info
        // This line emits the roomUsers event to update the list of users in the room for all clients. It sends information about the room and the list of users in that room.
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })


    //Listen for chatMessage, it handles the logic when a user sends a chat message.
    socket.on('chatMessage', (msg) => {

        // Retrieve the current user's information using the getCurrentUser function, then emits the chat message to all users in the same room
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username , msg));

    })

    // Runs when client disconnects 
    // Event listener notified when a user disconnects.
    // Broadcast a message to all clients indicating that a user has left the chat.
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
        io.to(user.room).emit('message', formatMessage( autoMessageName, `${user.username} has left the chat`));
        
        // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

        }

    })

})

// initialize the port
const PORT = process.env.PORT || 3000;


// instruct the Express application to start listening on the specified port for incoming http requests
// when the server starts successfully, it will log a message
server.listen(PORT, () => console.log(`Server running on port  ${PORT}`));