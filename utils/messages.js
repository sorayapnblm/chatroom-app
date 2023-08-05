const moment = require('moment');


// This function is used to format messages with timestamps and other details. This enhances the readability and user experience of your chat application.
function formatMessage(username, text) {
    // Return an objet
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;