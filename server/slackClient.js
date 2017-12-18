// var RtmClient = require('@slack/client').RtmClient;
// // var token = process.env.SLACK_API_TOKEN || '';
// var token = 'xoxb-285839840913-uEHnUVOosHRxCVe2fBCBENVO';
// var rtm   = new RtmClient(token, {logLevel: 'debug'});
// rtm.start();


'user strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;


function handleOnAtuhenticated(rtmStartData){
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a chanel`);
}

function handleOnMessage(message){
    console.log(message);
    rtm.sendMessage('this is a test message', message.channel, function(){
        // Optional callback function that executes when a message is sent by the bot
    });
}

function addAuthenticatedHandler(rtm, handler) { // 2nd parameter will be a function that handles the event
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler)
}


module.exports.init = function slackClient(token, logLevel){
    rtm   = new RtmClient(token, logLevel);
    addAuthenticatedHandler(rtm, handleOnAtuhenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
};

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;