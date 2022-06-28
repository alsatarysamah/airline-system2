# airline-system2

[PR](https://github.com/alsatarysamah/airline-system2/pull/3)

[GitHub](https://github.com/alsatarysamah/airline-system2)

# UML
![](./UML.png)

# System Overview
Airline System: we are going to build a control system for the **Qatar Airline**  where we will keep tracking each flight status by contacting the pilot of that flight who in turn will inform the manager and the system when a flight took-off and arrived.

*We have three main components in this system:*

- Manager (starting point)
- Pilot (taking actions)
- System (logging details)


we used ****soket.io**** to implement the connection between the client and server

**manager.js**

Trigger a 'new-flight' event every 10 seconds

Keep the manager alerted when a flight has arrived

**pilot.js**

Keep the pilot alerted when a new flight is scheduled

**system.js**

The main control room.

Prints the details of each event in a specific form:

Flight {

    event: 'took_off',

    time: 2022-02-28 15:30:00.,

    Details: {

    airLine: 'Royal Jordanian Airlines',

    destination: Manchester, UK'

    pilot: 'Jane doe',
    
    flightID: 'ds7g86sa8v87dsv60v876d',
}

# Featutess to be added

Creating message queue to store the events when the pilot is offline and send them back when he became online.

system.js file

Add new object called 'queue' that have One property (flights) to contain all 'new-flight' events.

queue look like

    queue ={
         flights:{

             '53gdf34fdg3334g':{

                 event:"new-flight",

                     details:{

                         time: 6-27-2022,

                         id:            332u443673r32yuf463w444,

                         pilot : Joun Cina Snow,

                         destination : Amman,

                     }
             },
            
         }
     }


**pilot.js** file

trigger 'get-all' event, to get all messages back from the message queue.

After triggering the 'flight-arrived' event make sure to delete the flight from the message queue.(Strech Goal)

Listen to 'fligt' event to log this message to the console 'Pilot:Sorry i didn't catch this flight ID 332u443673r32yuf463

