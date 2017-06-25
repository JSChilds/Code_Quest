$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');
	var $h1 = $('h1');

	// ROOM-SPECIFIC VARIABLES

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
		goWhere();
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

	// CHILD TAKE FUNCTIONS

	// CHILD INSPECT FUNCTIONS

	// CHILD USE FUNCTIONS

});