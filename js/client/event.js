Nebulr.Client.Event = (function(self) {

    var _triggers = {};
    
    self.on = function(event,callback) {
        if(!_triggers[event])
            _triggers[event] = [];
        _triggers[event].push( callback );
    }
    
    self.trigger = function(event, params) {
        if( _triggers[event] ) {
            for( i in _triggers[event] )
                _triggers[event][i](params);
        }
    };


    /**
     * Run at initialization
     */
    self.on('init', function() {
    	console.log("> init");
    	self.Client.showConnectOverlay();
    });

    /** 
     * Trigger when user launches the app
     */
    self.on('launch', function() {
		console.log("> launch");
    });

    /** 
     * Trigger when client uses the join cmd
     */
    self.on('cmdJoin', function(peerId) {
    	console.log("> cmdJoin");
    });

    /** 
     * Trigger when client joins a group
     */
    self.on('joined', function(conv) {
    	console.log("> joined");
    	self.Client.updateConvInfo(conv.username, conv.ident)
    });

	/** 
	 * Trigger when a user joins a group
	 * you are already in 
	 */
	self.on('userConnected', function(peerId) {
		console.log("> userConnected " + peerId);
	});

    /** 
     * Trigger when a user connects to a 
     * group for the first time
     */
	self.on('connect', function(peerId) {
		console.log("> connect to: " + peerId);
	});

	/** 
	 * Triggered when the user is typing
	 */
	self.on('typingMessage', function() {
		console.log("> typingMessage");
	});

	/** 
	 * Trigger when a message is sent
	 */
	self.on('sendMessage', function() {
		console.log("> sendMessage");
	});

	/**
	 * Trigger when a message is received 
	 */
	self.on('receiveMessage', function(msgObj) {
		console.log("> receiveMessage");
		self.Client.showMessage(msgObj.username, msgObj.message);
	});


	self.disconnect = function() {

	};

	return self;
	
})(Nebulr);
