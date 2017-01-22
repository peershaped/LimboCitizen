module.exports = [  /** Mufti **/
  /**
   * 1
   * Audio on loop
   * Seperation room
   */
    {//// START INTRO ///////
        "frame":1,                // puur naam  
        "reader":'default',       // default of 0 -> 15 // omdat 1e frame automatsch  speelt default 
        "stoplamp":"",            // -
        "stopaudio":"",           // true of ""
        "stopvideo":"",           // -  
        "lamp":{
            "id":"",              // 1 -> 8
            "box":"",             // 0 voor zwart 1 voor wit
            "state":"",           // 0 of 1
            "startdelay":"",      // -
            "duration":""         // de lengte dat ie aan is in seconden (int)
        },
        "audio":{
            "id":"301",           // id gekoppelt aan de mp3 (nul weglaten) //"introloop.mp3",
            "startdelay":"",      // -
            "duration":"",        // -
            "untilfinish":false   // true of false of  (als geen audio "" invullen)     // false is audio loopen
        },
        "video":{
            "beamer":"",          // id beamer volgens plattegrond 1 -> 4 (5 voor rpi peer)
            "file": "",           // bestandsnaam (lurpa.mp4)
            "startdelay":"",      // -
            "duration":"",        // -
            "untilfinish":"",     // true of false (als geen video "" invullen)
            "playpause":"",       // (NEGEREN)  true of false of "" 
            "resume":""           // (NEGEREN)  true of false of ""
        },
        "numpad":"",              // -
        "triggernext":false       // true of false
    },
    
    {
        // stop frame is om loop uit te knikkeren
        // Dit frame doet 2 dingen 
        // Het stopt de introloop
        // het frame triggert het volgende frame
       "frame":"stopaudio",// naam doet niks
       "reader":1, // wordt verwacht
       "stoplamp":"", // negeer
       "stopaudio":true, // om een audio loop te stoppen
       "stopvideo":"", // negeer
       "lamp":{
           "id":"",
           "box":"",
           "state":"",
           "startdelay":"",
           "duration":""
       },
       "audio":{
           "id":"",
           "startdelay":"",
           "duration":"",
           "untilfinish":""
       },
       "video":{
           "beamer":"",
           "file": "",
           "startdelay":"",
           "duration":"",
           "untilfinish":"",
           "playpause":"",
           "resume":""
       },
       "numpad":"",
       "triggernext":true // dus automatisch door
    }, ///// END INTRO LOOP /////
   
    
/**
 * 2
 * Trigger: Scan
 * Audio on loop
 * Seperation room
 */
    {
        "frame":2,
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "box":"",
            "state":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"1", //01mufti.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":true
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":true // wait for next scan
    },
    
    
    
    
    { //// START LOOP tussen 2 en 3 ///////
        "frame":'startloop',
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "box":"",
            "state":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"302", //inbetweenloop1.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":false //loop
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":false // loop
    },
    {
       "frame":"stoploop",
       "reader":2, // moet 2 zijn
       "stoplamp":"",
       "stopaudio":true,
       "stopvideo":"",
       "lamp":{
           "id":"",
           "box":"",
           "state":"",
           "startdelay":"",
           "duration":""
       },
       "audio":{
           "id":"",
           "startdelay":"",
           "duration":"",
           "untilfinish":""
       },
       "video":{
           "beamer":"",
           "file": "",
           "startdelay":"",
           "duration":"",
           "untilfinish":"",
           "playpause":"",
           "resume":""
       },
       "numpad":"",
       "triggernext":true
    }, ///// END INBETWEEN LOOP /////
    
    
/**
 * 3
 * Trigger: stop loop end
 * Audio + Light
 * Passport room
 */
    {
        "frame":3,
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":6,
            "box":0,
            "state":1,
            "startdelay":"",
            "duration":90
        },
        "audio":{
            "id":"2", //02mufti.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":true
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":true
    },
    
    
    { //// START LOOP tussen 3 en 4 ///////
        "frame":'startloop',
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "box":"",
            "state":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"302", //inbetweenloop1.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":false
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":false
    },
    {
       "frame":"stoploop",
       "reader":3, 
       "stoplamp":"",
       "stopaudio":true,
       "stopvideo":"",
       "lamp":{
           "id":"",
           "box":"",
           "state":"",
           "startdelay":"",
           "duration":""
       },
       "audio":{
           "id":"",
           "startdelay":"",
           "duration":"",
           "untilfinish":""
       },
       "video":{
           "beamer":"",
           "file": "",
           "startdelay":"",
           "duration":"",
           "untilfinish":"",
           "playpause":"",
           "resume":""
       },
       "numpad":"",
       "triggernext":true
    }, ///// END INTRO LOOP /////
    
   
/**
 * 4
 * Trigger: Scan
 * Audio + Video
 * Asylum seeker
 */
    {
        "frame":4,
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "state":"",
            "box":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"3", //03mufti.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":true
        },
        "video":{
            "beamer":5,
            "file": "01mufti.mp4",
            "startdelay":"",
            "duration":"",
            "untilfinish":true,
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":true
    },
    
    { //// START LOOP tussen 4 en 5 ///////
        "frame":'startloop',
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "box":"",
            "state":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"302", //inbetweenloop1.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":false
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":false
    },
    {
       "frame":"stoploop",
       "reader":10,
       "stoplamp":"",
       "stopaudio":true,
       "stopvideo":"",
       "lamp":{
           "id":"",
           "box":"",
           "state":"",
           "startdelay":"",
           "duration":""
       },
       "audio":{
           "id":"",
           "startdelay":"",
           "duration":"",
           "untilfinish":""
       },
       "video":{
           "beamer":"",
           "file": "",
           "startdelay":"",
           "duration":"",
           "untilfinish":"",
           "playpause":"",
           "resume":""
       },
       "numpad":"",
       "triggernext":true
    }, ///// END INTRO LOOP /////
    

/**
 * 5
 * Trigger: Scan
 * Audio + Diaprojector
 * My activism
 */
    {
        "frame":5,
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":2,
            "state":1,
            "box":1,
            "startdelay":"",
            "duration":10
        },
        "audio": {
            "id": "4", //04mufti.mp3",
            "startdelay": "",
            "duration": "",
            "untilfinish": true
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":true
    },
    
    
    { //// START LOOP tussen 5 en 6 ///////
        "frame":'startloop',
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "box":"",
            "state":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"302", //inbetweenloop1.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":false
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":false
    },
    {
       "frame":"stoploop",
       "reader":15,
       "stoplamp":"",
       "stopaudio":true,
       "stopvideo":"",
       "lamp":{
           "id":"",
           "box":"",
           "state":"",
           "startdelay":"",
           "duration":""
       },
       "audio":{
           "id":"",
           "startdelay":"",
           "duration":"",
           "untilfinish":""
       },
       "video":{
           "beamer":"",
           "file": "",
           "startdelay":"",
           "duration":"",
           "untilfinish":"",
           "playpause":"",
           "resume":""
       },
       "numpad":"",
       "triggernext":true
    }, ///// END INTRO LOOP /////
    
   
/**
 * 6
 * Trigger: Scan
 * Audio + Fan + Light op box 1
 * Migrationroom
 */
    {
        "frame":6,
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":1,
            "box":1,
            "state":1,
            "startdelay":"",
            "duration":10
        },
        "audio":{
            "id": "5", //05mufti.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":true,
            "playpause":"",
            "resume":""
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":""
        },
        "numpad":"",
        "triggernext":true
    },
    
    
    { //// START LOOP tussen 6 en 7 ///////
        "frame":'startloop',
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "box":"",
            "state":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"302", //inbetweenloop1.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":false
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":false
    },
    {
       "frame":"stoploop",
       "reader":14,
       "stoplamp":"",
       "stopaudio":true,
       "stopvideo":"",
       "lamp":{
           "id":"",
           "box":"",
           "state":"",
           "startdelay":"",
           "duration":""
       },
       "audio":{
           "id":"",
           "startdelay":"",
           "duration":"",
           "untilfinish":""
       },
       "video":{
           "beamer":"",
           "file": "",
           "startdelay":"",
           "duration":"",
           "untilfinish":"",
           "playpause":"",
           "resume":""
       },
       "numpad":"",
       "triggernext":true
    }, ///// END INTRO LOOP /////
    
    
/**
 * 7
 * Trigger: Scan
 * Audio
 * Aggregationroom
 */
    {
        "frame":7,
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "box":"",
            "state":"",
            "startdelay":"",
            "duration":""
        },
        "audio":{
            "id":"6", //06mufti.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":true
        },
        "video":{
            "beamer":"",
            "file": "",
            "startdelay":"",
            "duration":"",
            "untilfinish":"",
            "playpause":"",
            "resume":""
        },
        "numpad":"",
        "triggernext":false
    }
];
