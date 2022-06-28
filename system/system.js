"use strict";
require("dotenv").config();
const PORT = process.env.PORT || 3030;

const ioServer = require("socket.io")(PORT);
const io = require("socket.io-client");
//namespace
const airline = ioServer.of("/airline");
// let PORT =process.env.PORT;
let host = `http://localhost:${PORT}`;
const airLineConnection = io.connect(`${host}/airline`);
const queue = { flights: {} };

const { v4: uuidv4 } = require("uuid");
console.log(`system listining on port ${PORT}`)
airline.on("connection", (socket) => {
 
  socket.on("flight", (payload) => {
    payload.events = "took-off";
    console.log(payload);
    console.log("*************************")
    airline.emit("took-off", payload);
  });
});
///////////////////////////io server///////////////////
ioServer.on("connection", (socket) => {
  /////////new-flight//////////////
  socket.on("new-flight", (payload) => {
    console.log(payload);
    let id = uuidv4();
    queue.flights[id] = payload;
    setTimeout(function () {
      
      ioServer.emit("new-flight", payload);
    }, 3000);
  });

  ///////////flightArrived////////////////////
  socket.on("flightArrived", (payload) => {
    payload.events = "arrived";
    console.log(payload);

    setTimeout(function () {
      airLineConnection.emit("flight", payload);
    }, 4000);
  });
/////////////////get all//////////////////////////
  socket.on("get_all", (payload) => {
    Object.keys(queue.flights).forEach((id) => {
      socket.emit("flight", { id: id, payload: queue.flights[id] });
    });
  });

  ////////////////delete /////////////////////////
  socket.on("delete",(payload)=>{
delete queue.flights[payload.id];
  });
});
