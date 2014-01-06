var shoe = require("shoe");
var dnode = require("dnode");
var reconnect = require("reconnect/shoe");
var randomColor = require('random-color')


var stream  = shoe("/stream");
var d = dnode();
d.pipe(stream).pipe(d);

d.on('remote', function(remote){
    setInterval(function(){    
        console.log("calling remote methods..");
        
        var dateDiv = document.getElementById('date');
        var timeDiv = document.getElementById('time');
        
        var oldDateTime ={ 'date': dateDiv.textContent, 'time': timeDiv.textContent };
                          
        remote.currentTime( JSON.stringify(oldDateTime), function(newDateTime){
            var newDateTimeObj = JSON.parse( newDateTime);
            console.log( "new time: " , newDateTimeObj.time);
            dateDiv.textContent = newDateTimeObj.date;
            
            timeDiv.textContent = newDateTimeObj.time;
            timeDiv.style.color = randomColor();
        });    
    }, 1000);    
});


/*
reconnect(function(stream){
    console.log("trying connecting to dnode...");
    var d = dnode();
 //   setInterval(function(){
        d.on('remote', function(remote){
            console.log("calling remote methods..");
            remote.currentTime( (new Date()).toDateString(), function(newDate){
                resultDiv.textContent = newDate;
            });
        });
    
//    }, 3000);    

    d.pipe(stream).pipe(d);

}).connect('/stream');
*/