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
            var newDateObj = (new Date());
            var newDateTime = { date: newDateObj.toLocaleDateString(), time: newDateObj.toLocaleTimeString() };
            console.log("Changing time from ", oldTime);
            console.log("new time: " , JSON.stringify(newDateTime) );
            cb( JSON.stringify(newDateTime) );
        }
    });
    
    d.pipe(stream).pipe(d);
    
});

sock.install(server, "/stream");