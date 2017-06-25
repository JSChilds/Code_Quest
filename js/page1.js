$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');

	// ROOM-SPECIFIC VARIABLES
	var dark = true;
	var hasPhone = false;
	var usedPhone = false;
	var hasKey = false;

	$input.keydown(function(event) {
		var choice = '';
    	if (event.keyCode == 13) {
    		choice = $(this).val();
		    if (choice != '') {
		      	$input.val('');
		    }
		checkChoice(choice);
		}
  	});


  	// FUNCTIONS

  	// DEFAULT FUNCTIONS

	function error() {
		$main.html('<p>Sorry, I don\'t recognise that command.</p><p>Please enter a command with <strong>GO</strong>,<strong> INSPECT</strong>,<strong> TAKE</strong> or<strong> USE</strong>, followed by a specified direction or object.');
	}

	function goWhere() {
		$main.html('<p>Go where?</p><p>Please enter your command again, specifying where you want to go.</p>')
	}
	function takeWhat() {
		$main.html('<p>Take what?</p><p>Please enter your command again, specifying what you want to take.</p>');
	}

	function inspectWhat() {
		$main.html('<p>Inspect what?</p><p>Please enter your command again, specifying what you want to inspect.</p>');
	}

	function useWhat() {
		$main.html('<p>Use what?</p><p>Please enter your command again, specifying what you want to use.</p>');
	}

	function checkChoice(choice) {
		choice = choice.toUpperCase();
  		if (choice.indexOf('GO') > -1) {
  			goChoices1(choice);
	    }
	    else if (choice.indexOf('TAKE') > -1) {
	    	takeChoices1(choice);
	    }
	    else if (choice == 'INSPECT') {
	    	inspectWhat();
	    }
	    else if (choice == 'USE') {
	    	useWhat();
	    }
	    else {
	    	error();
	    }
  	}

	// MASTER CHOICE FUNCTIONS

	function goChoices1(choice) {
		if (dark) {
			tooDark();
		} 
		else if (choice == 'GO NORTH' && hasKey) {
			goNorth();
		}
		else if (choice == 'GO NORTH') {
			northBlock();
		}
		else if (choice == 'GO SOUTH' || choice == 'GO WEST' || choice == 'GO EAST') {
			noGo();
		}
		else {
			goWhere();
		}
	}

	function takeChoices1(choice) {
		if (choice == 'TAKE IPHONE' && hasPhone) {
			errorPhone();
		}
		else if (choice == 'TAKE IPHONE') {
			getPhone();
		}
		else {
			takeWhat();
		}
	}

	// CHILD GO FUNCTIONS

	function tooDark() {
		$main.html('<p>It\'s too dark to see where you\'re going.<p>What will you do?</p>');
	}

	function goNorth() {
		console.log('go north');
	}

	function northBlock() {
		$main.html('<p>You can\'t go <strong>NORTH</strong>, there\'s a door in the way. <br> Remember when I mentioned the door?</p><p>What will you do?</p>');
	}

	function noGo() {
		$main.html('<p>That way only leads to a dead end.</p>What will you do?</p>');
	}

	// CHILD TAKE FUNCTIONS

	function getPhone() {
		$main.html('<p>You pick up the iPhone &copy (Trademark Apple Computers). Everybody thinks you\'re really cool.</p><p>What will you do?</p>');
		hasPhone = true;
	}

	function errorPhone() {
		$main.html('<p>You already have the iPhone &copy. <br> You\'re literally holding it in your hand.</p><p>What will you do?</p>');
	}

	// CHILD USE FUNCTIONS

	function usePhone() {
		$main.html('<p>You turn on the iPhone &copy (Trademark Apple Computers) ("Think different" &copy).</p><p>The room is illuminated.</p>It is a small dungeon with an old <strong>COMPUTER</strong> in the corner <br> and a large, oak <strong>DOOR</strong> to your <strong>NORTH</strong>.</p><p>What will you do?</p>');
		usedPhone = true;
		dark = false;
	}




























});