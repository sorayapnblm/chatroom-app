const moment = require('moment');

function formatMessage(username, text) {
    // Return an objet
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;