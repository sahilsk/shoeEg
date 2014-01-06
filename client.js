var shoe = require("shoe");
var dnode = require("dnode");
var reconnect = require("reconnect/shoe");

var resultDiv = document.getElementById('result');

//var stream  = shoe("/stream");


/*
setInterval(function(){
    d.on('remote', function(remote){
        console.log("calling remote methods..");
        remote.currentTime( (new Date()).toDateString(), function(newDate){
            resultDiv.textContent += "<br/>" + newDate;
        });
    });

}, 3000);
    */
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