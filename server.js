// import path module
const path = require('path');
// import express;js framework
const express = require('express');

//create an instance of the Express application
const app = express();

// Set staic folder
app.use(express.static(path.join(__dirname, 'html-scss-css-js')));

// initialize the port
const PORT = 3000 || 3000;

// instruct the Express application to start listening on the specified port
// when the server starts successfully, it will log a message
app.listen(PORT, () => console.log(`Server running on port  ${PORT}`));