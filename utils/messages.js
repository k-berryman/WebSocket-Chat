// Get time from MomentJS
const moment = require('moment');

// take in a username and message and turn it into an object
function formatMessage(username, text) {
  return {
    username,
    text,
    // hours, minutes, am/pm
    time: moment().format('h:mm a')
  }
}

module.exports = formatMessage;
