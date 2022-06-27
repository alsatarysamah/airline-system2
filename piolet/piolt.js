
'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let PORT =process.env.PORT;
let host = `http://localhost:${PORT}`;
// const healthConnection = io.connect(`${host}/health-system`);
let pioletConnection =io.connect(`${host}/airline`);
let pioletConnectionBase =io.connect(`${host}`);

console.log(`piolt listining on ${PORT}`);

pioletConnectionBase.on("new-flight",arriveHandler);
function  arriveHandler(payload){
    payload.events="arrived";
    console.log(` Pilot: flight with ID ${payload.Details.flightID} has arrived`);
    pioletConnectionBase.emit("flightArrived",payload);
}




////////////////////////took off////////////////////////////////////////////
pioletConnection.on('took-off',tookOffHandler);
function  tookOffHandler(payload){
    payload.event="took-off";
    console.log(` Pilot: flight with ID ${payload.Details.flightID} took-off`)
}