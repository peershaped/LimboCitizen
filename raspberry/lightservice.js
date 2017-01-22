var express = require('express');
var app = express();
var http = require('http');
var PORT = 9000;

var hoog = 0x01;
var laag = 0x00;
var toggle = [laag,hoog];
var debug = true;
var live = true;

var buffer = new Buffer(1);
    buffer[0] = 0x00;

var bufferUit = new Buffer(1);
    bufferUit[0] = 0x00;

var bufferAan = new Buffer(1);
    bufferAan[0] = 0xff;

mask = [];
mask[0] = 0x00; // 00000001
mask[1] = 0x01; // 00000001
mask[2] = 0x02; // 00000010
mask[3] = 0x04; // 00000100
mask[4] = 0x08; // 00001000
mask[5] = 0x10; // 00010000
mask[6] = 0x20; // 00100000
mask[7] = 0x40; // 01000000
mask[8] = 0x80; // 10000000

if(live === true) {

    var SerialPort = require("serialport").SerialPort;
    var serialport = new SerialPort("/dev/ttyUSB0", {
    //var serialport = new SerialPort("/dev/ttyACM0", {
        baudrate: 9600
    });

    serialport.on('open', function () {
        console.log('Serial Port Opend');
        serialport.on('data', function (data) {
            //console.log(data[0]);
        });
    });
    serialport.on('data', function (data) {
        //console.log(data[0]);
    });
}

app.get('/togglelightsoff', function (req, res) {
    Debugg('toggle alles uit');
    if(live === true) {
        serialport.write(bufferUit);
    }
});

app.get('/togglelightson', function (req, res) {
    Debugg('toggle alles aan');
    if(live === true) {
        serialport.write(bufferAan);
    }
});

app.get('/lamptest', function (req, res) {
    Debugg('lamp test running');

    var state = true;
    var lamp = 0;

    if(live === true) {

        setInterval(function(){

            if(state === true)
            {
                buffer[0] |= mask[lamp];
                if(live === true) {
                    serialport.write(buffer);
                }
            }

            if(state === false)
            {
                buffer[0] &= ~mask[lamp];
                if(live === true) {
                    serialport.write(buffer);
                }
            }

            lamp++;
            if(lamp == 7){
                state = !state;
                lamp = 0;
            }
        }, 1200);
    }
});

app.get('/togglelight/:number/:state',function (req, res) {

    var lamp = parseInt(req.params.number);
    var state = parseInt(req.params.state);
    console.log('received togglelight Lamp ' + lamp + ' state ' + state);

    if(state === 1)
    {
        buffer[0] |= mask[lamp];
        if(live === true) {
            serialport.write(buffer);
        }
        res.end('Light done\n');
        console.log('send 200 back ...');
    }
    if(state === 0)
    {
        buffer[0] &= ~mask[lamp];
        if(live === true) {
            serialport.write(buffer);
        }
        res.end('Light done\n');
        console.log('send 200 back ...');
    }
});

app.get('/light/:lamp/:state/:startdelay/:duration',function (req, res) {
    console.log('received');
    console.log("toggle light/ " + req.params.number + " to state " + req.params.state + " with a startdelay of " + req.params.startdelay + "for " + req.params.duratio + " sec");

    var startdelay = parseInt(req.params.startdelay);
    var duration = parseInt(req.params.duration);
    var lamp = parseInt(req.params.lamp);
    var state = parseInt(req.params.state);

    startdelay = startdelay*1000;

    if(startdelay > 0){
        Debugg('wait for ' + startdelay + ' ms delay');
        setTimeout(function(){
            if(live === true) {
                buffer[0] |= mask[lamp];
                serialport.write(buffer);
            }
            Debugg('turn on');

            var counter = 0;
            var timer = setInterval(function(){
                counter++;
                res.write(' light ' + counter);
                if(counter == duration){
                    if(live === true){
                        buffer[0] &= ~mask[lamp];
                        serialport.write(buffer);
                    }
                    clearInterval(timer);
                    Debugg('turn off after ' + duration + ' ms');
                    res.end('Light done\n');
                    console.log('send 200 back ...');
                }
            }, 1000 );

        },startdelay);
    }
    else
    {
        Debugg('tutn light on without delay');
        var counter = 0;
        var timer = setInterval(function(){
            counter++;
            res.write(' light ' + counter);
            if(counter == duration){
                if(live === true){
                    buffer[0] &= ~mask[lamp];
                    serialport.write(buffer);
                }
                clearInterval(timer);
                Debugg('turn off after ' + duration + ' ms');
                res.end('Light done\n');
                console.log('send 200 back ...');
            }
        }, 1000 );
    }
});

app.listen(PORT);
Debugg('listening on:'+PORT);

function initLight(req){

    var startdelay = parseInt(req.params.startdelay);
    var duration = parseInt(req.params.duration);
    var lamp = parseInt(req.params.number);
    var state = parseInt(req.params.state);

    buffer[lamp] = toggle[state];

    duration = duration*1000;
    startdelay = startdelay*1000;

    if(startdelay > 0){

        Debugg('wait for ' + startdelay + ' ms delay');
        setTimeout(function(){
            if(live === true) {
                buffer[0] |= mask[lamp];
                serialport.write(buffer);
            }
            Debugg('turn on');
            setTimeout(function(){
                buffer[0] &= ~mask[lamp];
                if(live === true) {
                    serialport.write(buffer);
                }
                Debugg('turn off after ' + duration + ' ms');
            },duration);

        },startdelay);
    }
    else
    {
        Debugg('tutn light on without delay');
        buffer[0] |= mask[lamp];
        if(live === true) {
            serialport.write(buffer);
        }
        setTimeout(function(){
            // turn of after duration
            Debugg('turn off after ' + duration + ' ms');
            buffer[0] &= ~mask[lamp];
            if(live === true) {
                serialport.write(buffer);
            }
        },duration);
    }
}

function Debugg(value){
    if(debug === true){console.log(value)};
}

function bytetobit(){
    for (var i = 7; i >= 0; i--) {
        var bit = octet & (1 << i) ? 1 : 0;
        console.log(bit);
        // do something with the bit (push to an array if you want a sequence)
    }
}
/* Takes cae of a clean exit */
process.stdin.resume();//so the program will not close instantly
function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}
//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

/**
 * EXTRA INFORMATIE
 * run : ls /dev/tty.* in terminal om je arduino t vinden op mac
 * http://stackoverflow.com/questions/12254378/how-to-find-the-serial-port-number-on-mac-os-x
 */