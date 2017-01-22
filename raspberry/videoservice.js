var omxplayer = require('omx-manager');
var dgram = require('dgram');
var express = require('express');
var debug = true;
var app = express();
var HTTPPORT = 8080;
var rapsberrynumber = 1;
var directory = '/home/pi/LimboCitizen/videos/';
var busy = false;
var finished = false;

// set default videodirectory
//omxplayer.setVideosDirectory('../videos/');
omxplayer.on('load', function(videos, arguments) {
    console.log('LOADED');
});


/**
 * Handle on end event for omx player
 * If video is in loop mode do nothing
 */
omxplayer.on('end' ,function(){
    finished = true;
});

/**
 * Play a video file until end
 */
app.get('/playvideo/:file', function (req, res) {
    if ( busy === false )
    {
        console.log('received... start omx.play : ' + req.params.file + ' :) ');
        busy = true;
        finished = false;
        var count = 0;

        console.log('calling play');
        omxplayer.play(directory+req.params.file);
        console.log(directory+req.params.file);

        res.write(directory+req.params.file);
        var timer = setInterval(function(){
            var status = omxplayer.getStatus();
            console.log(status);
            count++;
            res.write(' raspberry ' + count + ' status = ' + status);

            if(finished === true){
                busy = false;
                res.end('Video done\n');
                console.log('send 200 back ...');
                clearInterval(timer);
            }
        }, 1000 );
    }
});

/**
 * Loop a video file
 */
app.get('/loopvideo/:file' , function(req, res){
    //omx.stop();
    console.log('received... loop omx : ' + req.params.file + ' :) ');
    if ( busy === false )
    {
        console.log('busy is false');
        omxplayer.play(req.params.file, {'--loop': true});
        busy = true;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Video looping\n');
    }
    else
    {
        res.writeHead(422, {'Content-Type': 'text/plain'});
        res.end('Busy\n');
    }
});

/**
 * Triggers a video and puts it on pause
 * Set Busy to true so other storylines can not overrule
 */
app.get('/playpause/:file', function(req,res){
    if ( busy === false )
    {
        busy = true;
        omxplayer.play(directory+req.params.file);
        setTimeout(function(){
            omxplayer.pause();

        },1000);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Video paused: Call /resume to resume\n');
    }
    else
    {
        res.writeHead(422, {'Content-Type': 'text/plain'});
        res.end('Busy \n');
    }
});

app.get('/resume', function(req,res){
    busy = true;
    finished = false;
    var count = 0;

    console.log('calling play / resume');
    omxplayer.play();

    var timer = setInterval(function(){
        var status = omxplayer.getStatus();
        console.log(status);
        count++;
        res.write(' raspberry ' + count + ' status = ' + status);

        if(finished === true){
            busy = false;
            res.end('Video done\n');
            console.log('send 200 back ...');
            clearInterval(timer);
        }
    }, 1000 );
});

app.get('/stopvideo' , function(req, res){
    omxplayer.stop();
    busy = false;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Video stopped\n');
});
app.listen(HTTPPORT);

app.on('connetction',function(){
    socket.setTimeout(450 * 1000);
});
Debugg('Videoservice on ' + rapsberrynumber + ' listening on ht ip adress nog invullen');

/**
 * returns 200 if not busy or 422 if busy
 */
app.get('/checkstate', function (req, res) {
    if(busy === false)
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Not busy\n');
    }
    else
    {
        res.writeHead(422, {'Content-Type': 'text/plain'});
        res.end('Busy\n');
    }
});

/* utilities */
function InspectObject(object){
    // console.log(util.inspect(object, false, null));
}

function Debugg(value){
    if(debug === true){console.log(value);}
}

/* Takes cae of a clean exit */
process.stdin.resume();//so the program will not close instantly
function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
    //omxplayer.stop();
}
//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}))
//Error handler
process.on('uncaughtException', function (exception) {
    // handle or ignore error
    console.log('uncoughtException:');
    console.log(exception);
});