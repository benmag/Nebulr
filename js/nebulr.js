var Nebulr = (function(self, jQuery, Peer) {
	
	self.jQuery = jQuery;
	self.Peer = Peer;

	self.about = {
		name: 'Nebulr',
		version: '0.0.1'
	};

	/**
	 * self.init()
	 * Init their client
	 */
	self.init = function() {
		self.Client.showConnectOverlay();
	};

	$("#makeConnection").click(function() {
		self.Event.connect($("#connectWith").val());
	});

	return self;

})(Nebulr || {}, jQuery, Peer);