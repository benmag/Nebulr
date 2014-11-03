
Nebulr.Client = (function(self) {

	/**
	 * $connectOverlay
	 * Element for the overlay 
	 * displayed when the user is 
	 * connecting  
	 */
	var $connectOverlay = self.jQuery("#connectOverlay"),

	/**
	 * $ident
	 * Field containing the identity 
	 */
	$ident = self.jQuery("#ident"),

	/** 
	 * $connectForm
	 * Form for the connection overlay
	 */
	$connectForm = self.jQuery("#connectForm"),

	/**
	 * $input 
	 * The main message input box
	 * currently acts as the primary 
	 * way of interacting with the app
	 */
	$input = self.jQuery("#input"),

	/** 
	 * $chatlog
	 * The element that contains the chat
	 */
	$chatlog = self.jQuery("#chatlog"),

	/** 
	 * $convTitle
	 * The element that contains the conversation title
	 */
	$convTitle = self.jQuery("#convTitle"),

	/**
	 * $convIdent
	 * The element that contains the conv ident
	 */
	$convIden = self.jQuery("#convIdent"), 

	/** 
	 * _defaultNames
	 * Array containing some funny
	 * suggested names that users can use
	 */
	_defaultNames = [
		"Beep Beep I'm a Jeep", "Donut", "Penguin", "Stumpy", 
		"Whicker", "Shadow", "Howard", "Wilshire", "Darling", "Disco", 
		"Jack", "The Bear", "Sneak", "The Big L", "Whisp", "Wheezy", 
		"Crazy", "Goat", "Pirate", "Saucy", "Hambone", "Butcher", 
		"Walla Walla", "Snake", "Caboose", "Sleepy", "Killer", "Stompy", 
		"Mopey", "Dopey", "Weasel", "Ghost", "Dasher", "Grumpy", "Hollywood", 
		"Tooth", "Noodle", "King", "Cupid", "Prancer"
	],

	/**
	 * _suggestedDefaultNamePos
	 * Picks a random starting name
	 */
	_suggestedDefaultNamePos = Math.floor((Math.random() * _defaultNames.length-1) + 1),

	/** 
	 * _showNewDefaultName()
	 * Show's a new default name
	 */
	_showNewDefaultName = function() {

		if(_suggestedDefaultNamePos == 0 || _suggestedDefaultNamePos == _defaultNames.length-1) {
			var l = 20;  
		    for( var i = 0; i < 2; i++ )   
		    	$connectForm.animate( { 'margin-left': "+=" + ( l = -l ) + 'px' }, 50); 
		}

		$ident.val(_defaultNames[_suggestedDefaultNamePos]);

	};

	/** 
	 * self.showConnectOverlay()
	 * Shows the overlay where the 
	 * user enters their name/alias
	 */
	self.showConnectOverlay = function() {

		// Show the connection overlay
		$connectOverlay.addClass('open');
		$ident.focus();
		$ident.val(_defaultNames[_suggestedDefaultNamePos]);
		
		$connectForm.on('submit', function(){
			return false;
		});

		$ident.keydown(function (e) {

			if(e.keyCode == 13) { // enter

				// Set the clients username
				self.Core.setUsername($ident.val());

				// Generate a Unique ID and set it as user ident
				self.Core.setIdent(Math.random().toString(36).substr(2, 10));

				// Launch the chat application
				self.Client.launch();

			} else if(e.keyCode == 38 && _suggestedDefaultNamePos > 0 && _suggestedDefaultNamePos < _defaultNames.length) { //up
				
				// Select prefilled name  
				_suggestedDefaultNamePos--;
				_showNewDefaultName();

			} else if(e.keyCode == 40 && _suggestedDefaultNamePos >= 0 && _suggestedDefaultNamePos < _defaultNames.length-1) {

				// Select prefilled name
				_suggestedDefaultNamePos++;
				_showNewDefaultName();

			} else if(e.keyCode == 38 || e.keyCode == 40) {
				_showNewDefaultName();
			}

		});

	};

	/** 
	 * hideConnectOverlay()
	 * Hides the connect overlay
	 */
	self.hideConnectOverlay = function() {
		$connectOverlay.removeClass('open');
	};

	/** 
	 * launch() 
	 * Launch the application
	 */
	self.launch = function() {

		
		// Get the connect overlay outta here
		self.Client.hideConnectOverlay();

		// Remind the person who they are!
		self.Client.showIdentity();
		
		// Connect to peer js 
		self.Core.setPeer(self.Client.createPeerObj());

		// Setup the message area
		$input.keydown(function (e) {
			if(e.keyCode == 13) { // enter

				// Parse message (is it just a message or is it a command)
				var parts = $input.val().split(" "); 

				switch(parts[0]) {
					default: 

						self.showMessage(self.Core.getUsername(), $input.val());

						var p = self.Core.getPeers();
						self.Core.send({ peerId: Object.keys(p)[0], message: $input.val() });
						self.Event.trigger('sendMessage');

					break;

					case "/join":
						self.Core.connectToPeer(parts[1]);
					break;

					case "/vmaster": // call vote to become master
					case "/vcall": // calls vote to do something
					case "/vdo": // use vote commands (need master)
					case "/vyes": // vote yes
					case "/vno": // vote no 
					case "/vdontcare": //
					case "/vabstain": // 
					case "/vstop":
					case "/vstatus":
					case "/tell":
					case "/me":
					case "/msg":
					case "/nick":
					case "/ignore":
						alert("Command");
					break;
				}

				$input.val("");
				
			} else self.Event.trigger('typingMessage');
			
		});

		self.Event.trigger('launch');
	
	};

	/**
	 * parseCommand(message)
	 * Check to see if this message
	 * should be interpreted as a command
	 */
	self.parseCommand = function(message) {

	};

	/** 
	 * showIdentity()
	 * Show the clients identity
	 */
	self.showIdentity = function() {
		self.jQuery("#username").html(self.Core.getUsername());
		self.jQuery("#userIdent").html(self.Core.getIdent());
	};
	
	/**
	 * updateConvInfo()
	 * Update the conversation info
	 */
	self.updateConvInfo = function(title, ident) {
		self.jQuery("#convTitle").html(title);
		self.jQuery("#convIdent").html(ident);
	};

	/**
	 * _$createMessage() 
	 * Generates the HTML for a message
	 */
	self._$createMessage = function(author, message) {
	    return "<li> \
	        <div class=\"comment-img\"> \
	          \<img src=\"http://lorempixel.com/50/50/people/6\">\
	        </div> \
	        <div class=\"comment-text\">\
	            <strong><a href=\"\">" + author + "</a></strong>\
	            <p>"+ message + "</p> <span class=\"date sub-text\">on March 5th, 2014</span>\
	        </div>\
	    </li>";
	};

	/** 
	 * showMessage() 
	 * Show a message
	 */
	self.showMessage = function(user, message) {

		$chatlog.append(self._$createMessage(user, message));

	};

	//////////////////////// Event Bindings ////////////////////////
	self.jQuery("#makeConnection").click(function() {
		self.Event.trigger('connect');
	});


	return self;

})(Nebulr);

