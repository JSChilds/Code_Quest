$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');
	var $h1 = $('h1');

	// ROOM-SPECIFIC VARIABLES
	var doorOpen = false;
	var powerOn = false;

  	// FUNCTIONS

  	// DEFAULT FUNCTIONS

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

	function error() {
		$main.html('<p>Sorry, I don\'t recognise that command.</p><p>Please enter a command with <strong>GO</strong>,<strong> INSPECT</strong>,<strong> TAKE</strong> or<strong> USE</strong>, <br> followed by a specified direction or object.');
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
  			goChoices2(choice);
	    }
	    else if (choice.indexOf('TAKE') > -1) {
	    	takeChoices2(choice);
	    }
	    else if (choice.indexOf('INSPECT') > -1) {
	    	inspectChoices2(choice);
	    }
	    else if (choice.indexOf('USE') > -1) {
	    	useChoices2(choice);
	    }
	    else {
	    	error();
	    }
  	}

	// MASTER CHOICE FUNCTIONS

	function goChoices2(choice) {
		if (choice == 'GO WEST') {
			blockWest();
		}
		else if (choice == 'GO EAST' || choice == 'GO NORTH') {
			noGo();
		}
		else if (choice == 'GO SOUTH') {
			blockSouth();
		}
		else if (choice == 'GO WEST' && doorOpen) {
			goWest();
		}
		else {
			goWhere();
		}
	}

	function takeChoices2(choice) {
		takeWhat();
	}

	function inspectChoices2(choice) {
		inspectWhat();
	}

	function useChoices2(choice) {
		useWhat();
	}

	// CHILD GO FUNCTIONS
	function blockWest() {
		$main.html('<p>You can\'t go that way, there\'s a big metal door in the way. <br> I\'m pretty sure I mentioned the big metal door.</p><p>What will you do?</p>');
	}

	function blockSouth() {
		$main.html('<p>The oak door is shut tight, you won\'t be able to go back that way. <br> Bit of a design flaw, really.</p><p>What will you do?</p>');
	}

	function noGo() {
		$main.html('<p>You walk down an endless corridor of servers for about 10 minutes <br> before giving up and turning back.</p><p>What will you do?</p>')
	}

	function goWest() {
		window.location.href="page3.html";
	}

	// CHILD TAKE FUNCTIONS

	// CHILD INSPECT FUNCTIONS

	// CHILD USE FUNCTIONS

	// function openDoor() {
	// 	$main.html('<p>The door slides upward, opening the path to the <strong>WEST</strong>. <br> You better hurry through in case it closes on you and crushes you to death. <br> Or don\'t. Whatever.</p><p>What will you do?</p>');
	// }
	// doorOpen = true;
});