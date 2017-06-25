$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');

	// ROOM-SPECIFIC VARIABLES
	var dark = true;
	var hasPhone = false;
	var usedPhone = false;

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
  		if (choice.indexOf('GO') > -1 && dark) {
  			tooDark();
	    }
	    else if (choice == 'GO') {
	    	goWhere();
	    }
	    else if (choice == 'TAKE') {
	    	takeWhat();
	    }
	    else if (choice == 'INSPECT') {
	    	inspectWhat();
	    }
	    else if (choice == 'USE') {
	    	useWhat();
	    }
	    else if (choice == 'TAKE IPHONE') {
	    	getPhone();
	    }
	    else if (choice == 'USE IPHONE' && hasPhone) {
	    	usePhone();
	    }
	    else {
	    	error();
	    }
  	}

	// ROOM-SPECIFIC FUNCTIONS
	function tooDark() {
		$main.html('<p>It\'s too dark to see where you\'re going.<p>What will you do?</p>');
	}

	function getPhone() {
		$main.html('<p>You pick up the iPhone &copy (Trademark Apple Computers). Everybody thinks you\'re really cool.</p><p>What will you do?</p>');
		hasPhone = true;
	}

	function usePhone() {
		$main.html('<p>You turn on the iPhone &copy (Trademark Apple Computers) ("Think different" &copy).</p><p>The room is illuminated.</p>It is a small dungeon with an old <strong>COMPUTER</strong> in the corner <br> and a large, oak <strong>DOOR</strong> to your <strong>NORTH</strong>.</p><p>What will you do?</p>');
		usedPhone = true;
		dark = false;
	}




























});