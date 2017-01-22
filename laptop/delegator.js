/**
 * Delegator.js is verantwoordelijk voor het ontvangen van de berichten van de cardreaders.
 * Het script vangt de message op en stuurt het door naar lopende verhaallijnen
 * Ieder verhaallijn runt op een unieke interne UDP poort
 */

// de dgram module is een node module die gebruikt wordt voor UDP communicatie
var dgram = require('dgram');

// array met Tag (de passen) id's '
var	tags = require('./tags');

// De poort waarop geluisterd word naar de card readers
var LISTENINGPORT = 11111;

// Host is een empty string
var HOST = '';

// haalt storylineports.js binnen en gebruikt de daarin gedefinieerde UDP poorten

var storylineports = {
    bena:   22220,
    juhi:   22221,
    rabi:   22222,
    mufti:  22223
};

// Create the client
client = dgram.createSocket('udp4');

function cardreaderListenerUp(){
	cardreadeListener = dgram.createSocket('udp4');
	cardreadeListener.on('listening', function () {
	    console.log('Delegator: Listening for cardreaders on ' + HOST + ' : '+ LISTENINGPORT);
	});

    cardreadeListener.on('message', function (message, rinfo) {
        console.log(`Delegator : message received`);
        // console.log(message);
		// var tagId = message.toString('hex',0,4);
		// var storylineIndex = tags[tagId];
        // if(storylineIndex != undefined)
        // {
            // console.log(`passing on to storyline: ${storylineIndex} on port ${storylineports[storylineIndex]}`)
            client.send(message, 0, message.length, storylineports.bena, HOST);
            client.send(message, 0, message.length, storylineports.juhi, HOST);
            client.send(message, 0, message.length, storylineports.rabi, HOST);
            client.send(message, 0, message.length, storylineports.mufti, HOST);
        // }
        // else
        // {
        //     console.log('undefined storylineIndex');
        // }
    });
	cardreadeListener.bind(LISTENINGPORT, HOST);
}
cardreaderListenerUp();