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

// Set staic folder
app.use(express.static(path.join(__dirname, 'html-scss-css-js')));

// initialize the port
const PORT = 3000 || 3000;

// instruct the Express application to start listening on the specified port for incoming http requests
// when the server starts successfully, it will log a message
server.listen(PORT, () => console.log(`Server running on port  ${PORT}`));