var express = require('express');
var cors = require('cors');
var forever = require('forever-monitor');
var exec = require('child_process').exec;

var app = new express();
var forever = require('forever-monitor');

var services = {
	lightservice : new (forever.Monitor)('/home/pi/LimboCitizen/lightservice.js', { }),
    videoservice : new (forever.Monitor)('/home/pi/LimboCitizen/videoservice.js', { }),
}

// settings for server
app.use(express.static(__dirname + '/src'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/images", express.static(__dirname + '/public/images'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/fonts", express.static(__dirname + '/public/fonts'));
// make cross domain requests possible
app.use(cors());

app.get('/restart', function(req, res){
	res.writeHead(200);
	child = exec("sudo reboot", function (error, stdout, stderr) {
		res.end("Reboot...");
	});
});

app.get('/poweroff', function(req, res){
	res.writeHead(200);
	child = exec("sudo poweroff", function (error, stdout, stderr) {
		res.end("Shutdown...");
	});
	res.end('Shutdown...');
});

app.get('/hartbeat', function(req,res){
    res.json({status:true, message:"I'm alive"});
});

app.get('/start/:service', function(req, res){

    // check if service exists
    if(services[req.params.service])
    {
        if(!services[req.params.service].running)
        {
            var service = services[req.params.service].start();
            res.json({status:'started', currentItem: req.params.service, message:"Started : " + req.params.service});
        }
        else
        {
            res.json({status:'started', currentItem: req.params.service, message:"Already started"});
        }
    }
    else {
        // 404 redirect does not exist
    }
});

app.get('/reset/:service', function(req, res){

    // check if service exists
    if(services[req.params.service])
    {
        if(services[req.params.service].running)
        {
            services[req.params.service].stop();

            setTimeout(function(){
                services[req.params.service].start();
                res.json({status:'started', currentItem: req.params.service, message:"Restarted : " + req.params.service});
            }, 1000);
        }
        else
        {
            res.json({status:'stopped', currentItem: req.params.service, message:"Can not restart a stopped script"});
        }
    }
    else {
        // 404 redirect does not exist
    }
});

app.get('/stop/:service', function(req, res){
    
    // check if service exists
    if(services[req.params.service])
    {
        if(services[req.params.service].running)
        {
            services[req.params.service].stop();
            res.json({status:'stopped', currentItem: req.params.service, message:"Stopped : " + req.params.service});
        }
        else
        {
            res.json({status:'stopped', currentItem: req.params.service, message:"Already stopped"});
        }
    }
    else {
        // 404 redirect does not exist
    }
});

app.listen(3000);