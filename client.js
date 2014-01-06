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
var d = dnode();
reconnect(function(stream){

    console.log("trying connecting to dnode...");
 //   setInterval(function(){
        d.on('remote', function(remote){
            console.log("calling remote methods..");
            remote.currentTime( (new Date()).toDateString(), function(newDate){
                resultDiv.textContent = newDate;
            });
        });
    
//    }, 3000);    

    d.pipe(stream).pipe(d);

}).connect('http://http://54.241.199.165:3000/dnode');