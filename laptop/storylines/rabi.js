module.exports = [  /** Juhi **/
    /* naam v elk frame: ///// ROOM (STEP) FRAME NUMMER ///// ZIE FRAMES JUHI IN DRIVE
     */

    { ///// START INTRO /////
      /* getriggerd door restart juhi in interface
       * bevat alleen audio
       * is een loop
       */
            "frame":"startwaitingloop",   // puur naam  
            "reader":'default',           // default of 0 -> 15 // omdat 1e frame automatsch  speelt default 
            "stoplamp":"",                // -
            "stopaudio":"",               // true of ""
            "stopvideo":"",               // -  
            "lamp":{
                "id":"",                  // 1 -> 8
                "box":"",                 // 0 voor zwart 1 voor wit
                "state":"",               // 0 of 1 -> aan of uit
                "startdelay":"",          // -
                "duration":""             // de lengte dat ie aan is in seconden (int)
            },
            "audio":{
                "id":"501",               // id gekoppelt aan de mp3 (nul weglaten) //"0501juhi.mp3",
                "startdelay":"",          // -
                "duration":"",            // -
                "untilfinish":false       // true of false of  (als geen audio "" invullen)     // false is audio loopen
            },
            "video":{
                "beamer":"",              // id beamer volgens plattegrond 1 -> 4 (5 voor rpi peer)
                "file": "",               // bestandsnaam (lurpa.mp4)
                "startdelay":"",          // -
                "duration":"",            // -
                "untilfinish":"",         // true of false (als geen video "" invullen)
                "playpause":"",           // (NEGEREN)  true of false of "" 
                "resume":""               // (NEGEREN)  true of false of ""
            },
            "numpad":"",                  // -
            "triggernext":false           // true of false
    },        
    { ///// END INTRO LOOP /////
      /* getriggerd door scan van reader 1
       * stopt de introloop
       */
           // stop frame is om loop uit te knikkeren
           // Dit frame doet 2 dingen 
           // Het stopt de introloop
           // het frame triggert het volgende frame
           "frame":"stopwaitingloop",     // naam doet niks
           "reader":1,                    // wordt verwacht
           "stoplamp":"",                 // negeer
           "stopaudio":true,              // om een audio loop te stoppen
           "stopvideo":"",                // negeer
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
    }, 
   

    
    { ///// SEPARATION ROOM (1) FRAME 1 /////
      /* getriggerd door einde introloop
       * speelt het geluid in zijn geheel af en start de inbetweenloop
       * alleen audio
       */
        "frame":1,
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
            "id":"502",                         // "0502juhi.mp3"
            "startdelay":"",
            "duration":"",
            "untilfinish":true                  // als de file afgelopen is, triggert hij automatisch de inbetweenloop
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
        "triggernext":true                      // gaat automatisch door naar volgende frame
    },
    
    
    
    { //// START LOOP tussen 1 en 2 ///////
       /* getriggerd door einde 0502juhi.mp3
        * bevat alleen audio
        * is een loop
        */
            "frame":"startinbetweenloop",
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
                "id":"302",                             //0302inbetweenloop.mp3",
                "startdelay":"",
                "duration":"",
                "untilfinish":false                     //loop
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
            "triggernext":false                         // loop
    },
    { ///// END INBETWEEN LOOP /////
      /* getriggerd door scan van reader 5
       * stopt de inbetweenloop
       */
           "frame":"stopinbetweenloop",
           "reader":5,                                // reader 5 voor juhi in 'home'
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
    }, 
    
    

    { ///// HOME (2) FRAME 2 /////
      /* getriggerd door einde inbetweenloop
       * speelt het geluid in zijn geheel af en start daarna weer de inbetweenloop
       * audio
       */
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
            "duration":""                   // VERVANGEN --> zo lang als de audiofile duurt
        },
        "audio":{
            "id":"503",                     //0503juhi.mp3",
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
    
    

    { ///// START LOOP tussen 2 en 3 /////
      /* getriggerd door einde 0503juhi.mp3
       * bevat alleen audio
       * is een loop
       */
        "frame":'startinbetweenloop',
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
            "id":"302",                           // 0302inbetweenloop.mp3",
            "startdelay":"",
            "duration":"",
            "untilfinish":false                   // blijft loopen
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
        "triggernext":false                       // blijft loopen
    },
    { ///// END INBETWEEN LOOP /////
      /* getriggerd door scan van reader 12
       * stopt de inbetweenloop
       */
       "frame":"stoploop",
       "reader":12, 
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
    }, 
    
   

    { ///// MIGRATION OFFICE (3) FRAME 3 /////
      /* getriggerd door einde inbetweenloop
       * speelt het geluid in zijn geheel af en start daarna 0505juhi.mp3
       * alleen audio
       */
        "frame":3,
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
            "id":"504",                       //0504juhi.mp3",
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
    
    { ///// MIGRATION OFFICE (3) FRAME 4 /////
      /* getriggerd door einde 0504juhi.mp3
       * speelt het geluid in zijn geheel af en start daarna weer de inbetweenloop
       * lamp en audio
       */
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
            "duration":""                      // CHECKEN!! zo lang als de audio duurt
        },
        "audio":{
            "id":"505",                       //0505juhi.mp3",
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



    { ///// START LOOP tussen 3 en 4 /////
      /* getriggerd door einde 0505juhi.mp3
       * bevat alleen audio
       * is een loop
       */
        "frame":'startinbetweenloop',
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
            "id":"302",                                 //0302inbetweenloop.mp3",
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
    { ///// END INTRO LOOP /////
      /* getriggerd door scan van reader 13
       * stopt de inbetweenloop
       */
       "frame":"stopinbetweenloop",
       "reader":13,
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
    }, 
    


    { ///// WAITINGROOM (4) FRAME 5 /////
      /* getriggerd door einde inbetweenloop
       * speelt het geluid in zijn geheel af en start daarna 0507juhi.mp3
       * alleen audio
       */
        "frame":5,
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
        "audio": {
            "id": "506",                          //0506juhi.mp3",
            "startdelay":"",
            "duration":"",
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

    { ///// WAITINGROOM (4) FRAME 6 /////
      /* getriggerd door einde 0506juhi.mp3
       * speelt het geluid in zijn geheel af en start daarna weer de inbetweenloop
       * lamp en audio
       */
        "frame":6,
        "reader":"",
        "stoplamp":"",
        "stopaudio":"",
        "stopvideo":"",
        "lamp":{
            "id":"",
            "state":"",
            "box":"",
            "startdelay":"",
            "duration":""                         // CHECKEN --> zolang als de audio duurt
        },
        "audio": {
            "id": "507",                          // 0507juhi.mp3"
            "startdelay":"",
            "duration":"",
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
    


    { ///// START LOOP tussen 4 en 5 /////
      /* getriggerd door einde 0507juhi.mp3
       * bevat alleen audio
       * is een loop
       */
        "frame":'startinbetweenloop',
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
            "id":"302",                           //0302inbetweenloop.mp3",
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
    { ///// END INTRO LOOP /////
      /* getriggerd door scan van reader 11
       * stopt de inbetweenloop
       */
       "frame":"stopinbetweenloop",
       "reader":11,
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
    }, 
    
   

    { ///// MASTER (5) FRAME 7 /////
      /* getriggerd door einde inbetweenloop
       * speelt het geluid in zijn geheel af en start daarna weer de inbetweenloop
       * alleen audio
       */
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
            "id": "508",                        //0508juhi.mp3",
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
    

    
    { ///// START LOOP tussen 5 en 6 /////
      /* getriggerd door einde 0508juhi.mp3
       * bevat alleen audio
       * is een loop
       */
        "frame":'startinbetweenloop',
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
            "id":"302",                               //0302inbetweenloop.mp3",
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
    { ///// END INTRO LOOP /////
      /* getriggerd door scan van reader 14!
       * stopt de inbetweenloop
       */
       "frame":"stoploop",
       "reader":8,                      //veranderen naar 14!
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
    }, 
    
    

    { ///// AGGREGATION ROOM (6) FRAME 8 /////
      /* getriggerd door einde inbetweenloop
       * speelt het geluid in zijn geheel af
       * alleen audio
       */
        "frame":8,
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
            "id":"509",                       //0509juhi.mp3",
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
