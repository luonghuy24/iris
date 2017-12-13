'use strict';

const service = require("../server/service"); // Ties into service.js 
const http    = require('http'); // part of base node.js

const server  = http.createServer(service); // Server object that uses express
server.listen(3000);

server.on('listening', function(){
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode`);
});