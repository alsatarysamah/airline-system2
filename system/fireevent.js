'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}`;
const systemConnection = io.connect(host);
const airLineConnection = io.connect(`${host}/airline`);

systemConnection.emit("new-flight");


airLineConnection.emit("flight");