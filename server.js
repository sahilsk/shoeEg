var dnode = require("dnode");
var shoe = require("shoe");
var http = require("http");

var ecstatic  = require("ecstatic")(__dirname + '/public');

var server = http.createServer(ecstatic);
server.listen( process.env.PORT ||3000, function(){
    console.log("Server listening at port: ", (process.env.PORT ||3000) );
});
    
var sock = shoe( function(stream){
    var d = dnode({
        currentTime: function(oldTime, cb){
            console.log("Changing time from ", oldTime);
            console.log("new time: " , (new Date()).toDateString() );
            cb( (new Date()).toDateString());
        }
    });
    
    d.pipe(stream).pipe(d);
    
});

sock.install(server, "/stream");