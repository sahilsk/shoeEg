var http  = require("http");
var shoe = require("shoe");
var ecstatic = require("ecstatic");
var dnode = require("dnode");

var server = http.createServer( 
	ecstatic({root :__dirname +'/public'})
).listen(3000);

var sock = shoe( function(stream){
	var d = dnode({
		square: function(num, oResult){
			return oResult(num*num);
		}
	});
	d.pipe(stream).pipe(d);
});;
sock.install(server,"/stream");