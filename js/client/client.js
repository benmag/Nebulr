
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
	 * _defaultNames
	 * Array containing some funny
	 * suggested names that users can use
	 */
	_defaultNames = ["Beep Beep I'm a Jeep", "Donut", "Stumpy", "Howard", "The Big L", "Grumpy", "Pirate"],

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

	}


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

	    		// Trigger the user connect event
	    		self.Event.launch();

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

	return self;

})(Nebulr);

