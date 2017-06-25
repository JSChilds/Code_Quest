$(function(){
	var $input = $('input');
	var $main = $('main');
	var dark = true;

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

  	function checkChoice(choice) {
  		if (choice.toUpperCase().indexOf('GO') > -1 && dark) {
  			tooDark();
	    }
	    else if (choice.toUpperCase() == 'GO') {
	    	goWhere();
	    }
	    else if (choice.toUpperCase() == 'TAKE') {
	    	takeWhat();
	    }
	    else if (choice.toUpperCase() == 'INSPECT') {
	    	inspectWhat();
	    }
	    else if (choice.toUpperCase() == 'USE') {
	    	useWhat();
	    }
	    else if (choice.toUpperCase() == 'TAKE IPHONE' || choice.toUpperCase() == 'TAKEIPHONE') {
	    	getPhone();
	    }
	    else {
	    	error();
	    }
  	}

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

	// ROOM SPECIFIC FUNCTIONS

	function tooDark() {
		$main.html('<p>It\'s too dark to see where you\'re going.<p>What will you do?</p>');
	}

	function getPhone() {
		$main.html('<p>You pick up the iPhone &copy. Now you look way cool. What will you do?</p>');
	}




























});