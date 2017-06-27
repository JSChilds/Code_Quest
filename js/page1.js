$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');
	var $h1 = $('h1');

	// ROOM-SPECIFIC VARIABLES
	var dark = true;
	var hasPhone = false;
	var usedPhone = false;
	var hasKey = false;
	var inspectedComputer = false;
	var inspectingDoor = false;
	var doorOpen = false;

	$input.keydown(getInput);

	function getInput(event) {
		var choice = '';
    	if (event.keyCode == 13) {
    		choice = $(this).val();
		    if (choice != '') {
		      	$input.val('');
		    }
		checkChoice(choice);
		}
	}


  	// FUNCTIONS

  	// DEFAULT FUNCTIONS

	function error() {
		$main.html('<p>Sorry, I don\'t recognise that command.</p><p>Please enter a command with <strong>GO</strong>,<strong> INSPECT</strong>,<strong> TAKE</strong> or<strong> USE</strong>, <br> followed by a specified direction or object.<p>(Type <strong>INSPECT ROOM</strong> if you need to be reminded of what\'s in the room.)</p>');
	}

	function goWhere() {
		$main.html('<p>Go where?</p><p>Please enter your command again, <br> specifying a valid direction you want to go to.</p>')
	}
	function takeWhat() {
		$main.html('<p>Take what?</p><p>Please enter your command again, <br> specifying a valid object you want to take.</p>');
	}

	function inspectWhat() {
		$main.html('<p>Inspect what?</p><p>Please enter your command again, <br> specifying a valid object you want to inspect.</p>');
	}

	function useWhat() {
		$main.html('<p>Use what?</p><p>Please enter your command again, <br> specifying a valid object you want to use.</p>');
	}

	function checkChoice(choice) {
		choice = choice.toUpperCase();
  		if (choice.indexOf('GO') > -1) {
  			goChoices1(choice);
	    }
	    else if (choice.indexOf('TAKE') > -1) {
	    	takeChoices1(choice);
	    }
	    else if (choice.indexOf('INSPECT') > -1) {
	    	inspectChoices1(choice);
	    }
	    else if (choice.indexOf('USE') > -1) {
	    	useChoices1(choice);
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
		else if (choice == 'GO NORTH' && doorOpen) {
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
			errorHasPhone();
		}
		else if (choice == 'TAKE IPHONE') {
			getPhone();
		}
		else if (choice == 'TAKE KEYCARD' && hasKey) {
			errorHasKey();
		}
		else if (choice == 'TAKE KEYCARD' && inspectedComputer) {
			getKey();
		}
		else if (choice == 'TAKE DOOR' && !dark) {
			takeDoor();
		}
		else if (choice == 'TAKE COMPUTER' && !dark) {
			takeComputer();
		}
		else {
			takeWhat();
		}
	}

	function inspectChoices1(choice) {
		if (choice == 'INSPECT ROOM' && !dark) {
			inspectRoom();
		}
		else if (choice == 'INSPECT ROOM') {
			tooDark();
		}
		else if (choice == 'INSPECT COMPUTER' && !dark && !hasKey) {
			inspectComputer();
		}
		else if (choice == 'INSPECT COMPUTER' && !dark) {
			inspectComputer2();
		}
		else if (choice == 'INSPECT DOOR' && !dark && !doorOpen) {
			inspectDoor();
		}
		else if (choice == 'INSPECT DOOR' && doorOpen) {
			inspectDoor2();
		}
		else if (choice == 'INSPECT IPHONE') {
			inspectPhone();
		}
		else if (choice == 'INSPECT KEYCARD' && inspectedComputer) {
			inspectKey();
		}
		else {
			inspectWhat();
		}
	}

	function useChoices1(choice) {
		if (choice == 'USE IPHONE' && usedPhone) {
			errorUsedPhone();
		}
		else if (choice == 'USE IPHONE' && hasPhone) {
			usePhone();
		}
		else if (choice == 'USE DOOR' && doorOpen) {
			inspectDoor2();
		}
		else if (choice == 'USE DOOR' && !dark) {
			useDoor();
		}
		else if (choice == 'USE KEYCARD' && hasKey && inspectingDoor) {
			openDoor();
		}
		else if (choice == 'USE KEYCARD' && hasKey) {
			useKeyError();
		}
		else if (choice == 'USE COMPUTER' && !dark) {
			useComputer();
		}
		else {
			useWhat();
		}
	}

	// CHILD GO FUNCTIONS

	function tooDark() {
		$main.html('<p>It\'s too dark to see where you\'re going.<p>There\'s something that looks like an <strong>IPHONE &copy</strong> at your feet.</p><p>What will you do?</p>');
	}

	function goNorth() {
		window.location.href="page2.html";
	}

	function northBlock() {
		$main.html('<p>You can\'t go <strong>NORTH</strong>, there\'s a door in the way. <br> Remember when I mentioned the door?</p><p>What will you do?</p>');
	}

	function noGo() {
		$main.html('<p>That way only leads to a dead end.</p>What will you do?</p>');
	}

	// CHILD TAKE FUNCTIONS

	function getPhone() {
		$main.html('<p>You pick up the iPhone &copy (Trademark Apple Computers).</p> <div class="img-box"> <div id="img-bar"> <p>object.jpg</p> <div id="X3"> <p>X</p></div></div><img src="../images/iphone.jpg"/></div><p>Now everybody thinks you\'re really cool.</p><p>What will you do?</p>');
		hasPhone = true;
		// ADD PIC OF PHONE TO INVENTORY
	}

	function errorHasPhone() {
		$main.html('<p>You already have the iPhone &copy. <br> You\'re literally holding it in your hand.</p><p>What will you do?</p>');
	}

	function getKey() {
		$main.html('<p>You take the keycard.</p><div class="img-box"> <div id="img-bar"> <p>object.jpg</p> <div id="X3"> <p>X</p></div></div><img src="../images/keycard.jpg"/></div><p>What will you do?</p>');
		hasKey = true;
		// ADD PIC OF KEY TO INVENTORY AND SCREEN
	}

	function errorHasKey() {
		$main.html('<p>You already have the keycard. <br> You\'re literally holding it in your hand.</p><p>What will you do?</p>');
	}

	function takeComputer() {
		$main.html('<p>It\'s really heavy and has no discernible use, so there\'s no point in taking it. <br> Hey, that sounds like you!</p><p>What will you do?</p>');
	}

	function takeDoor() {
		$main.html('It\'s... it\'s a door. You can\'t take a door. Come on.</p><p>What will you do?');
	}

	// CHILD INSPECT FUNCTIONS

	function inspectRoom() {
		$main.html('<p>You are in a small dungeon with an old <strong>COMPUTER</strong> in the corner <br> and a large, oak <strong>DOOR</strong> to the <strong>NORTH</strong>.</p><p>What will you do?</p>');
	}

	function inspectComputer() {
		$main.html('<p>It\'s a broken down old PC. <br> Looking at it gives you a pit in your stomach, but you\'re not sure why. <p>Behind the keyboard, you see a small <strong>KEYCARD</strong> with what looks to be your picture on it. <p>What will you do?</p>');
		inspectedComputer = true;
	}

	function inspectDoor() {
		$main.html('<p>It\'s a large, oak door. <br> There looks to be a slot for a keycard on it. <br> Kind of ruins the whole rustic aesthetic of the room, you think, <br> but then again, you\'re an insufferable snob.<p>What will you do?</p>');		
		inspectingDoor = true;
	}

	function inspectComputer2() {
		$main.html('<p>It\'s a broken down old PC. <br> Looking at it gives you a pit in your stomach, but you\'re not sure why.</p><p>What will you do?</p>');
	}

	function inspectDoor2() {
		$main.html('<p>The door is open now.</p><p>What will you do?</p>');
	}

	function inspectPhone() {
		$main.html('<p>It\'s a beautiful, brand new iPhone &copy 7. Everyone who uses this is really cool. <br> (Apple - please send me money or free iPhones.)</p><p>What will you do?</p>');
	}

	function inspectKey() {
		$main.html('<p>It\'s a keycard with a very unflattering photo of you on it. <br> God, that hair. What were you thinking?</p><p>What will you do</p>');
	}

	// CHILD USE FUNCTIONS

	function usePhone() {
		$main.html('<p>You turn on the iPhone &copy (Trademark Apple Computers) ("Think different" &copy).</p><p>The room is illuminated.</p>You are in a small dungeon with an old <strong>COMPUTER</strong> in the corner <br> and a large, oak <strong>DOOR</strong> to the <strong>NORTH</strong>.</p><p>What will you do?</p>');
		$h1.html('A SLIGHTLY LESS DARK ROOM');
		usedPhone = true;
		dark = false;
	}

	function errorUsedPhone() {
		$main.html('<p>You play Angry Birds for 45 minutes straight. <br> You begin to seriously question what you\'re doing with your life. <p>What will you do?</p>');
	}

	function useDoor() {
		$main.html('<p>The door\'s locked. It won\'t budge.</p><p>What will you do?</p>');
	}

	function useKeyError() {
		$main.html('<p>Use the keycard on what?</p> <br> (Hint: Go to the door first, dummy)</p><p>What will you do?</p>');
	}

	function openDoor() {
		$main.html('<p>You swipe the keycard and the door swings open. <br> The path to the <strong>NORTH</strong> is now clear. <br> You have a bad feeling about this.</p>What will you do?</p>');
		doorOpen = true;
		// REMOVE PIC OF KEY FROM INVENTORY
		// POSSIBLY SET hasKEY to FALSE IF NEEDED?
	}

	function useComputer() {
		$main.html('<p>It\'s busted and you can\'t turn it on. <br> I\'m sure you\'ve heard that before.</p><p>What will you do?</p>');
	}






















});