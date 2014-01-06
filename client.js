var shoe = require("shoe");
var dnode = require("dnode");
var reconnect = require("reconnect/shoe");
var randomColor = require('random-color')


var resultDiv = document.getElementById('result');

var stream  = shoe("/stream");
var d = dnode();
d.pipe(stream).pipe(d);

d.on('remote', function(remote){
    setInterval(function(){    
        console.log("calling remote methods..");
        remote.currentTime( (new Date()).toString(), function(newDate){
            console.log( "new date: " , newDate);
            var resultDiv = document.getElementById('result');
            resultDiv.textContent = newDate;
            resultDiv.style.color = randomColor();
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