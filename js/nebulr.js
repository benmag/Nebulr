var Nebulr = (function(self, jQuery, Peer) {
	
	self.jQuery = jQuery;
	self.Peer = Peer;

 //    var peer = new Peer('noname', {host: 'localhost', port: 9000});

 //    var conn = peer.connect('host2');
	// conn.on('open', function(){
	//   conn.send('hi!');
	//   console.log("Sending message to host2");
	// });


	self.about = {
		name: 'Nebulr',
		version: '0.0.1'
	};


	/**
	 * self.init()
	 * Init their client
	 */
	self.init = function() {

		// Trigger the user connect event
	    self.Event.trigger('init');

	};

	return self;

})(Nebulr || {}, jQuery, Peer);