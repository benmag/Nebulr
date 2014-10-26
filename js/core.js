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
	 * _peers 
	 * Rooms the user has joined
	 */
	_peers = [];
	
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
		_username = username;
	};

	/**
	 * getUsername() 
	 * Get the current users username
	 */
	self.getUsername = function() {
		return _username;
	};

	/** 
	 * getChannels() 
	 * Get all channels
	 */
	self.getPeers = function() {
		return _peers;
	};

	/** 
	 * storePeer(conn)
	 * Stores the Peer connection object
	 * in an array
	 */
	self.storePeer = function(peer) {
		_peers[peer.peer] = peer;
		self.Event.trigger('joined', { ident: peer.peer });
	};

	/** 
	 * getPeer(peer) 
	 * Return the peer
	 */
	self.getPeer = function(peerId) {
		return _peers[peerId];
	};

	/** 
	 * disconnectPeer(peerId)
	 * Disconnect from a channel
	 */
	self.disconnectPeer = function(peerId) {

	};

	/** 
	 * createPeer(ident) 
	 * Creates a new PeerJS object
	 */
	self.createPeerObj = function() {

	    var peer = new self.Peer(self.getIdent(), {host: 'localhost', port: 9000});
	    peer.on('connection', function(conn) {

			conn.on('data', function(data){
				
				self.Event.trigger('receiveMessage', data);

			});

			
	    	// self.storePeer(conn);
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
	self.getPeerClient = function() {
	 	return _peer;
	};


	/**
	 * connectToPeer(peerId) 
	 * Make a connection with another peer
	 */
	self.connectToPeer = function(peerId) {
		
		self.Event.trigger('cmdJoin', peerId);
		
		var peer = self.getPeerClient();
	    var conn = peer.connect(peerId);
		conn.on('open', function(){
	  		// console.log("Sending message to host2");
	  		// event connected
	  		// send the conversation info through?
		});

		self.storePeer(conn);
		

	};


	/** 
	 * send(peerId) 
	 * Send a message to a peer
	 */
	self.send = function(send) {

		self.getPeer(send.peerId).send({ ident: self.getIdent(), username: self.getUsername(), message: send.message});

	};

	return self;

	
})(Nebulr);