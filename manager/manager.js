'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let PORT =process.env.PORT
let host = `http://localhost:${PORT}/`;


const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');

const managerConnection = io.connect(host);
const airLineConnection = io.connect(`${host}/airline`);

console.log(`manager listing on port ${PORT}`);

setInterval(() => {
    let pioletName = faker.name.findName();
let destination=faker.address.cityName();
// let dtToday = new Date(date.now);

    let flight=
    {
        events:"new-flight",
        time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        Details:{
            airLine: 'Qatar Airlines',
            flightID:uuidv4(),
            pioletName:pioletName,
            destination:destination
        },        
    }
    // console.log(flight)
    // managerConnection.on("new-flight",handleNewFlight);
    console.log(`Manager: new flight with ID ${flight.Details.flightID} have been scheduled`);
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${flight.Details.pioletName}`)
    managerConnection.emit("new-flight",flight);
    
    // airLineConnection.emit("flight",flight);
},10000)


// function handleNewFlight(payload){ 

//     console.log(`Manager: new flight with ID ${payload.Details.flightID} have been scheduled`);
//     console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.Details.pioletName}`)
// }