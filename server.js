var dnode = require("dnode");
var shoe = require("shoe");
var http = require("http");

var ecstatic  = require("ecstatic")(__dirname + '/public');

var server = http.createServer(ecstatic);
var port = process.env.PORT || 3000;
server.listen( port, function(){
    console.log("Server listening at port: ", port );
});
    
var sock = shoe( function(stream){
    var d = dnode({
        currentTime: function(oldTime, cb){
            console.log("Changing time from ", oldTime);
            console.log("new time: " , (new Date()).toString() );
            cb( (new Date()).toString());
        }
    });
    
    d.pipe(stream).pipe(d);
    
});

sock.install(server, "/stream");