Nebulr.Client.Event = (function(self) {


	self.launch = function() {

		self.Client.hideConnectOverlay();

		// Connect to peer js 
		self.Core.setPeer(self.Client.createPeer());

		self.jQuery("#contact-list").html(self.Client.getIdent());

	};

	self.connect = function(peerId) {

		var peer = self.Core.getPeer();
		var conn = peer.connect(peerId);

		peer.on('connection', function(conn) {
			alert("D");
			conn.on('data', function(data){
				// Will print 'hi!'
				alert(data);
			});
		});


	};

	self.joinChannel = function() {

	};

	self.typingMessage = function() {

	};

	self.sendMessage = function() {

	};

	self.receiveMessage = function() {

	};

	self.disconnect = function() {

	};

	return self;
	
})(Nebulr);