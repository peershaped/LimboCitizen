var HOST = '';
var express = require('express');
var listener = express();
var http = require('http');
var	dgram = require('dgram');
var sittingdown = "01";
var standingup = "00";
var keyPress = require('./keypress');
var storylinedir = 'storylines';
var	tags = require('./tags');

// contains an array with storylines for all storylines
var debug = false;

var storylineMeta = {
	"bena" : {
		udpport: 22220,
		storylinefile: "./" + storylinedir + "/bena.js",
		mp3player: {
			ipaddress : "192.168.2.170",
			port: "80"
		},
		allowedtags: [
			"d181b0d5",
			"1351efc5",
			"10257b25"
		]
	},
	"juhi" : {
		udpport: 22221,
		storylinefile: "./" + storylinedir + "/juhi.js",
		mp3player: {
			ipaddress : "192.168.2.171",
			port: "80"
		},
		allowedtags: [
			"e3177b25",
			"ed35f3a5",
			"6e0baed5"
		]
	},
	"rabi" : {
		udpport: 22222,
		storylinefile: "./" + storylinedir + "/rabi.js",
		mp3player: {
			ipaddress : "192.168.2.172",
			port: "80"
		},
		allowedtags : [
			"049ab0d5",
			"86def1c5",
			"83eb36d5"
		]
	},
	"mufti" : {
		udpport: 22223,
		storylinefile: "./" + storylinedir + "/mufti.js",
		mp3player: {
			ipaddress : "192.168.2.173",
			port: "80"
		},
		allowedtags : [
			"9b15aed5",
			"c5c08b75",
			"f4f4f1c5"
		]
	}
}

// Haal de meegegeven parameter op
var passedinparameter = process.argv[2];
var storylineName = passedinparameter.toUpperCase();

// Set de udp poort op basis van de meegegeven parameter
var UDPPORT = storylineMeta[passedinparameter].udpport; 

// laad het correcte verhaallijn bestand op basis van de meegegeven parameter
var STORYLINE = require(storylineMeta[passedinparameter].storylinefile);

var MP3PLAYERIP = storylineMeta[passedinparameter].mp3player.ipaddress;

var MP3PLAYERPORT = storylineMeta[passedinparameter].mp3player.port;

var ALLOWEDTAGS = storylineMeta[passedinparameter].allowedtags;

// IP ADRESSEN VOOR DE BEAMERS
// de ipadressen zijn zo ingedeeld dat ze overeenkomen met het nummer op het floorplan
// Om deze reden tellen we niet vanaf nul maar vanaf 1.
// 0 is dus leeg
var beamers = [];
beamers[0] = ['' , '']; // is leeg zodat we vanaf 1 kunnen tellen
beamers[1] = ['192.168.2.150' , '8080']; // 1 is raspberry pi Blauw
beamers[2] = ['192.168.2.151' , '8080']; // 2 is raspberry pi Rood
beamers[3] = ['192.168.2.152' , '8080']; // 3 is raspberry pi Geel
beamers[4] = ['192.168.2.153' , '8080']; // 4 is raspberry pi Grijs
beamers[5] = ['192.168.2.152' , '8080']; // 5 is raspberry pi Peer

// IPADRESSEN LIGHT SERVICES
var lightservice = [];
	lightservice[0] = ['192.168.2.151','9000']; // Rpi Rood
	lightservice[1] = ['192.168.2.152','9000']; // Rpi Geel

var readerIds = require('./readerids');

var finishedStoryparts = [];

var nextReaderToScan = STORYLINE[0].reader;

var	currentStoryPartBusy = false;

var audio = null;

// var storypartobject = function(){
// 	this.lamp = 0;
// 	this.audio = 0;
// 	this.video = 0;
// 	this.numpad = 0;

// 	this.setLamp = function(number){
// 		this.lamp = number;
// 	}

// 	this.getLamp = function(number){
// 		this.lamp = number;
// 	}

// 	this.setAudio = function(){

// 	}
// 	this.getAudio = function(){

// 	}

// }

var stateObject = {
	'lamp':0,
	'audio':0,
	'video':0,
	'numpad':0
};


// get the storyline at specified location 
// console.log(`running storyline ${process.argv[2]}`)

//console.log(nextReaderToScan);
/**
 * @param storypart array [storypartobject, array key]
 * @param callback function
 */
function asyncFunc(storypart, callback) 
{
	// get current frame from the incoming array
	var storypartobject = storypart.frame;
	var checkStateObject = {
		'lamp':0,
		'audio':0,
		'video':0,
		'numpad':0
	};
	

	// handle pause frames.
	if(storypartobject.hasOwnProperty('pause'))
	{
		if(storypartobject.pause != '')
		{
			var pausetime = storypartobject.pause * 1000;
			setTimeout(function(){
				console.log('PAUSE END');
				callback(storypart);
			}, pausetime);
		}
	}

	/** TODO : Kiezen erin of eruit **/
	//if(storypartobject.video.beamer != "" && checkVideoState(storypart) == false)
	//{
	//	// video event should be triggered but video service is busy
	//	// so play a message saying sorry but the video kan not be played yet
	//	console.log('the needed video service is Busy Please wait');
	//	//STORYLINE.unshift(storypartobject);
	//	//currentStoryPartBusy = false;
	//}

	// SET NEXT READER ID FOR CURRENT STORYLINE
	if(STORYLINE.length > 0)
	{
		nextReaderToScan = STORYLINE[0].reader;

	}

	// FIRE THE EVENTS

	// handle lamp
	// URL: /light/:number/:state/:startdelay/:duration/
	if(storypartobject.lamp.id != ''){
		stateObject.lamp = 1;
		var lightpath = '';

		if(storypartobject.lamp.duration == "")
		{
			logVerbose('togglelight');
			lightpath = '/togglelight/' + storypartobject.lamp.id + '/' + storypartobject.lamp.state;
		}
		if(storypartobject.lamp.duration != "")
		{
			logVerbose('light (met duration)');
			lightpath = '/light/' + storypartobject.lamp.id +  '/1/' + storypartobject.lamp.state + '/' + storypartobject.lamp.duration;
		}

		logVerbose(storylineName + 'LIGHT action : ' + lightservice[storypartobject.lamp.box][0] + ':' + lightservice[storypartobject.lamp.box][1] + lightpath);
		
		var light = http.get({
			host: lightservice[storypartobject.lamp.box][0],
			path:lightpath,
			port: lightservice[storypartobject.lamp.box][1],
			agent: false,
			headers:{
				"Connection":'keep-alive'
			}
		}, function(response) {
			response.on('data', function(d) {
				//console.log(d.toString());
			});
			response.on('end', function() {

				// Handle busy message
				if(response.statusCode == 422){
					logVerbose('Light is busy : Play audio file telling the user should wait');
				}

				// if statusCode == 200
				logVerbose('Light end received set stateObject.lamp to 0');
				stateObject.lamp = 0;
				if(stateObject.lamp == 0 && stateObject.audio == 0 && stateObject.video == 0)
				{
					//console.log('storyline busy = false');
					callback(storypart);
				}
			});
		}).on('error', function(err) {
			logVerbose('error on light service');
			handleError(err);
		});
	}

	// handle audio
	if(storypartobject.audio.id != '' || storypartobject.stopaudio === true)
	{
		
		stateObject.audio = 1;
		var audioPath = '';

		if(storypartobject.audio.untilfinish === true){audioPath = '/play/'+storypartobject.audio.id;}

		if(storypartobject.audio.untilfinish === false){audioPath = '/loop/'+storypartobject.audio.id;}

		if(storypartobject.stopaudio === true){audioPath = '/stop';}

		logVerbose('AUDIO action : ' + MP3PLAYERIP + ':' + MP3PLAYERPORT + audioPath);

		var audio = http.get(
		{
			host: MP3PLAYERIP,
			path: audioPath,
			port: MP3PLAYERPORT,
			agent: false,
			headers:
			{
				"Connection":'keep-alive'
			}
		},  function(response){
			response.on('data', function(d) {
    			// console.log('chunk received');
				// console.log(d.toString());
			});
            
			response.on('end', function() {

				console.log(callback);
				console.log('status.code = ' + response.statusCode);

				// Handle busy message
				// if(response.statusCode == 422)
				// {
				// 	logVerbose('Audio is busy : Play audio file telling the user should wait');
				// }

				if(response.statusCode == 201)
				{
					var timer = setInterval(function(callback){

						console.log(callback);

						logVerbose('Waiting for  end received ');
						if(stateObject.audio == 0) {
							// break out this function and callback
							logVerbose('Audio end received ');

							if(stateObject.lamp == 0 && stateObject.audio == 0 && stateObject.video == 0)
							{
								console.log('storyline busy = false');
								// callback(storypart);
								clearInterval(timer);

							}
						}
					}, 200);
				}

				logVerbose('Audio end received ');
				// // set stateObject.audio to 0
				stateObject.audio = 0;
				
				// if status code == 200
				if(stateObject.lamp == 0 && stateObject.audio == 0 && stateObject.video == 0)
				{
					//console.log('storyline busy = false');
					callback(storypart);
				}
				
				
				// if(response.statusCode == 200)
				// {
				// 	logVerbose('Loop is gestart');
				// 	stateObject.audio == 0;
				// 	if(stateObject.lamp == 0 && stateObject.audio == 0 && stateObject.video == 0)
				// 	{
				// 		//console.log('storyline busy = false');
				// 		logVerbose('Audio end received ');
				// 		callback(storypart);
				// 	}
				// }
			});
		}).on('error', function(err) {
			logVerbose('error on audio service');
			handleError(err);
		});
	}


	// handle video
	if(storypartobject.video.beamer != ''){
		stateObject.video = 1;

		var videopath = '';

		videopath = '/playvideo/' + storypartobject.video.file;

		if(storypartobject.video.playpause === true)
		{
			videopath = '/playpause/' + storypartobject.video.file;
		}
		if(storypartobject.video.resume === true)
		{
			videopath = '/resume';
		}

		logVerbose('VIDEO action : ' + beamers[storypartobject.video.beamer][0] + ':' + beamers[storypartobject.video.beamer][1] + videopath);

		var video = http.get({
			host: beamers[storypartobject.video.beamer][0],
			path: videopath,
			port: beamers[storypartobject.video.beamer][1],
			headers:{
				"Connection":'keep-alive'
			}
		}, function(response) {
			response.on('data', function(d) {
				//console.log(d.toString());
			});
			response.on('end', function() {

				// Handle busy message
				if(response.statusCode == 422)
				{
					// Handle busy message
					logVerbose('Video is busy : Play audio file telling the user should wait');
				}

				logVerbose('Video end received');
				// set stateObject.video to 0
				stateObject.video = 0;
				// if status code == 200
				if(stateObject.lamp == 0 && stateObject.audio == 0 && stateObject.video == 0)
				{
					//console.log('storyline busy = false');
					callback(storypart);
				}
			});
		}).on('error', function(err) {
			handleError(err, 'error on videoService');
		});
	}
}

/**
 * @param storypart array [storypartobject, array key]
 */
function series(storypart) 
{
	if(storypart)
	{
		asyncFunc( storypart, function(storypart) {

			logVerbose('Done with '+ storypart.frame.frame)
			logVerbose('Next reader to scan : ' + nextReaderToScan);
			logVerbose('Trigger next frame : ' + storypart.frame.triggernext);
			logVerbose('* ------------------------------------------------------------------------------ *')
			console.log('  ');
			finishedStoryparts.push(storypart.frame);

			currentStoryPartBusy = false;

			if(STORYLINE.length == 0)
			{
				logVerbose('Storyline finished (TODO: display name of storyline)');
			}

			if(storypart.frame.triggernext === true){

				// trigger next frame
				series({frame:STORYLINE.shift(), input:{}, storylineIndex:storypart.storylineIndex});
			}
		});
  	}
	else
	{
		return final();
 	}
}

function final() { logVerbose('All storylines have finished', finishedStoryparts); }

 
// Deze functie luisterd naar binnenkomende berichten van delegator.js
function cardreaderListenerUp(UDPPORT, HOST){
	
	// kicks off the first frame
	initStoryline();

	cardreadeListener = dgram.createSocket('udp4');

	cardreadeListener.on('listening', function () {
	    logVerbose('Listening for delegator on ' + HOST + ' : '+ UDPPORT);
	});

	cardreadeListener.on('message', function (message, rinfo) {



		// console.log(message.toString());

		// identify incoming message
		// if incoming message is playHasStopped message do something..
		// get the stopped song (number)
		// check if currentFrame.audio.id == the incoming id.
		// set Audio end received to true
		// kickof next frame.

		// if(response.statusCode == 422)
		// {
		// 	logVerbose('Audio is busy : Play audio file telling the user should wait');
		// }

		// logVerbose('Audio end received ');
		// stateObject.audio = 0;
		
		// if(stateObject.lamp == 0 && stateObject.audio == 0 && stateObject.video == 0)
		// {
		// 	callback(storypart);
		// }
		console.log(message);
		var firstCharacter = message.toString('ascii',0,1);
		console.log(firstCharacter);
		if(firstCharacter == 'S'){
			console.log('S');
			 stateObject.audio = 0;
		}

		// instantiate an input object
		// to pass around
		var input = {
			tagId:null,
			readerId:null,
		};
		
		// haal uniek id op van het pasje
		input.tagId = message.toString('hex',0,4);

		// is het unieke id niet gekoppeld aan huidig verhaallijn
		// return en doe niets
		if(ALLOWEDTAGS.indexOf(input.tagId) === -1){
			return
		}

		// scanner id
		input.readerId = message.toString('hex',4,5);
		
		// haal op basis van het tagid de verhaallijn 'index' op
		var storylineIndex = tags[input.tagId];
		input.storylineIndex = tags[input.tagId];

		// check of het verhaal verder mag
		if(skipToNextPartAllowed() && readerIds[input.readerId] == nextReaderToScan)
		{
			// set storyline to busy
			currentStoryPartBusy = true;
			// trigger next frame
			series({frame:STORYLINE.shift(), input:input, storylineIndex: storylineIndex});
		}
		else
		{
			wrongScanned();
		}
	});
	cardreadeListener.bind(UDPPORT, HOST);
}

cardreaderListenerUp(UDPPORT,HOST);

function wrongScanned(){

	// Hier eem eventuele randomizer 
	var wronglyscannedSample = '200';

	http.get('http://'+MP3PLAYERIP+':'+MP3PLAYERPORT+'/wrong/'+wronglyscannedSample).on('error', function(err) {
	
	logVerbose('Wrong scan action : ' + 'http://'+MP3PLAYERIP+':'+MP3PLAYERPORT+'/wrong/'+wronglyscannedSample);

	}).on('error', function(err){
		handleError(err);
	});
}

/**
 * Initializes Storyline
 */
function initStoryline(){
	console.log('initStoryline');
	http.get(
		{
			host: MP3PLAYERIP,
			path: '/stop',
			port: MP3PLAYERPORT,
			agent: false,
			headers:
			{
				"Connection":'keep-alive'
			}
		},  function(response){
			response.on('data', function(d) {});
			response.on('end', function() {
				logVerbose('Stopped currently playing audio');
				logVerbose('Wait one second');
				setTimeout(function(){
					logVerbose('Kickoff first frame');
					logVerbose('* ----------------------------- *')
					series({frame:STORYLINE.shift(), input:{}, storylineIndex: 0});
				},1000);
			});
		}).on('error', function(err) {
			logVerbose('error on audio service');
			handleError(err);
		});
}


/**
 * Handles error
 */
function handleError(err, extraMsg=''){
	logVerbose(extraMsg);
	logVerbose('Error event');
	console.error(err);
}

/**
 * @param storylineIndex
 * @returns {boolean}
 */
function skipToNextPartAllowed(){
	// is het verhaal afgelopen?
	if(STORYLINE.length < 0)
	{
		logVerbose('Storyline is finished');
	}
	// is het verhaal niet bezig?
	if(currentStoryPartBusy == false && STORYLINE.length > 0)
	{
		return true;
	}
	return false;
}

/**
 * Check if video service is busy
 * @param storypart
 * Wordt niet gebruikt
 */
function checkVideoState(storypart){

	http.get({
		host: beamers[storypart.frame.beamer][0],
		path: '/checkstate',
		port: beamers[storypart.frame.beamer][1]
	}, function(response) {
		response.on('end', function() {
			if( response.statusCode == 422 )
			{
				return false;
			}
			if( response.statusCode == 200 )
			{
				return true;
			}
		});
	}).on('error', function(err){
		handleError(err);
	});
}

/**
 * Check if lightservice is busy
 * @param storypart
 */
function checkLampState(storypart){
	http.get({
		host: lightservice[0],
		path: '/checkstate',
		port: lightservice[1]
	}, function(response) {
		response.on('end', function() {
			if( response.statusCode == 422 )
			{
				return false;
			}
			if( response.statusCode == 200 )
			{
				return true;
			}
		});
	}).on('error', function(err){
		handleError(err);
	});
}

function logVerbose(message){
	console.log(storylineName + ' : ' + message)
}

// log only if debug mode is true;
function logDebug(string){
	if(debug == true)
	{
		console.log(string);
	}
}

/* Takes cae of a clean exit */
process.stdin.resume();//so the program will not close instantly
function exitHandler(options, err) {
	console.log('exit handler called');
	http.get('http://'+MP3PLAYERIP+':'+MP3PLAYERPORT+'/stop');
	if (options.cleanup) console.log('clean');
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', function(){
	console.log('exit');
	exitHandler.bind(null, {clean:true});
});
//catches ctrl+c event
process.on('SIGINT', function(){
	console.log('sigint');
	exitHandler.bind(null, {exit:true});
});
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}))
//Error handler
process.on('uncaughtException', function (exception) {
	// handle or ignore error
	console.log('uncoughtException:');
	console.log(exception);
});