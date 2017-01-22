//laptop.js
var PORT = 11111;
var HOST = '';

// Require the dgram module     
var dgram = require('dgram');
// Create the client
client = dgram.createSocket('udp4');
// Accept input  via standard input
process.stdin.resume();
// Listen for incoming standard input
process.stdin.on('data', function (data) {
    // Send all data to the client.
    console.log(data);
    bla = new Buffer(data);
    client.send(bla, 0, bla.length, PORT, HOST);
});

// Listen for messages from client
client.on('message', function (message) {
    console.log("Client: " + message.toString());
});

console.log("To send a message, " + "type now and press return.");