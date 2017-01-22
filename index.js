var exec = require('child_process').exec;
var express = require('express');
var cors = require('cors');
var dgram = require('dgram');
var forever = require('forever-monitor');
var app = new express();


var totalStatus = {
	'bena' : {},
	'juhi' : {},
	'rabi' : {},
	'mufti' : {}
};

var storylines = {
	juhi : new (forever.Monitor)('./laptop/laptop.js', { args: ['juhi'] }), //'/home/pi/LimboCitizen/'
	mufti : new (forever.Monitor)('./laptop/laptop.js', { args: ['mufti'] }),
	bena : new (forever.Monitor)('./laptop/laptop.js', { args: ['bena'] }),
	rabi : new (forever.Monitor)('./laptop/laptop.js', { args: ['rabi'] }),
	delegator : new (forever.Monitor)('./laptop/delegator.js', { args: ['rabi'] })
}
console.log('started');
app.use(express.static(__dirname + '/public'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/images", express.static(__dirname + '/public/images'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/fonts", express.static(__dirname + '/public/fonts'));
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
	res.write('Shutdown...');
});

app.get('/start/:storyline', function(req, res){


	// check if storyline exists
    if(storylines[req.params.storyline])
    {
		if(!storylines[req.params.storyline].running)
		{
			totalStatus[req.params.storyline] = storylines[req.params.storyline].start();
			
			res.json({status:'started', message:"Started : " + req.params.storyline});
		}
		else
		{
			res.json({status:'started', message:"Already started"});
		}
	}
});

app.get('/reset/:storyline', function(req, res){
	console.log('reset called');
	// check if storyline exists
    if(storylines[req.params.storyline])
    {
		if(storylines[req.params.storyline].running)
		{
			totalStatus[req.params.storyline] = storylines[req.params.storyline].stop();

			setTimeout(function(){
				totalStatus[req.params.storyline] = storylines[req.params.storyline].start();
				res.json({status:true, message:"Restarted : " + req.params.storyline});
			}, 1000);
		}
		else
		{
			res.json({status:true, message:"Can not restart a stopped script"});
		}
	}
});

app.get('/stop/:storyline', function(req, res){

	// check if storyline exists
    if(storylines[req.params.storyline])
    {
		if(storylines[req.params.storyline].running)
		{
			totalStatus[req.params.storyline] = storylines[req.params.storyline].stop();
			res.json({status:true, message:"Stopped : " + req.params.storyline});
		}
		else
		{
			res.json({status:false, message:"Already stopped"});
		}
	}
});


app.get('/hartbeat', function(req,res){
    res.json({status:true, message:"I'm alive"});
});

app.get('/status', function(req, res){

});
app.listen(8082);