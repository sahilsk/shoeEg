var shoe = require("shoe");
var reconnect = require("reconnect");
var dnode =  require("dnode");
var es  = require("event-stream");
var d = dnode.connect(3000);

var result = document.getElementById('result');

var r = reconnect( function( stream){

	var s = es.mapSync( function(msg){
			result.appendChild(document.createTextNode(msg));
			return String(msg);
	});
	
	var d = dnode();
	d.on('remote', function(remote){
		remote.square(5, function(s){
			console.log( s);
		});
	});
	
	d.pipe(stream).pipe(d);
	s.pipe(stream).pipe(s);
	
}).connect("/stream");