// Dont know if this is actually needed..
Nebulr.Core = (function(self) {

	/**
	 * _peerServerOptions 
	 * Contains the PeerJS
	 * server config
	 */
	var _peerServerOptions = {
		host: 'localhost', 
		port: 9000
	},

	/** 
	 * _ident 
	 * Current users identifying number
	 */
	_ident = null,

	/**
	 * _username
	 * Current users username
	 */
	_username = null,

	/**
	 * _peer
	 * Hold the PeerJS object for
	 * the client 
	 */
	_peer = null,


	/**
	 * _channels 
	 * Rooms the user has joined
	 */
	_channels = null;
	
	/**
	* setIdent(ident)
	* Sets the current users ident
	*/
	self.setIdent = function(ident) {
		_ident = ident;
	};

	/**
	 * getIdent() 
	 * Get the current users ident
	 */
	self.getIdent = function() {
		return _ident;
	};


	/**
	* setUsername(username)
	* Sets the current users username
	*/
	self.setUsername = function(username) {
		_ident = ident;
	};

	/**
	 * getUsername() 
	 * Get the current users username
	 */
	self.getUsername = function() {
		return _username;
	};


	/** 
	 * setPeer(ident) 
	 * Sets the PeerJS object
	 * for the user
	 */
	self.createPeer = function() {
	 	var peer = new self.Peer(self.getIdent(), _peerServerOptions);
	 	
	 	peer.on('open', function(id){
		  alert(id);
		});

		return peer;

	};

	/** 
	 * setPeer(ident) 
	 * Sets the PeerJS object
	 * for the user
	 */
	self.setPeer = function(Peer) {
	 	_peer = Peer;
	};

	 /**
	  * getPeer()
	  * Gets the PeerJS object
	  */
	self.getPeer = function() {
	 	return _peer;
	};


	return self;

	
})(Nebulr);