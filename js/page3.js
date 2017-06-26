$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');
	var $h1 = $('h1');

	// ROOM-SPECIFIC VARIABLES
	var hasPaperBall = false;
	var step = 0;
	var option = 0;
	var atSouth = true;
	var atNorth = false;
	var waterCoolerUsed = false;


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
		$main.html('<p>Sorry, I don\'t recognise that command.</p><p>Please enter a command with <strong>GO</strong>,<strong> INSPECT</strong>,<strong> TAKE</strong> or<strong> USE</strong>, followed by a specified direction or object.');
	}

	function goWhere() {
		$main.html('<p>Go where?</p><p>Please enter your command again, specifying a valid direction you want to go to.</p>')
	}
	function takeWhat() {
		$main.html('<p>Take what?</p><p>Please enter your command again, specifying a valid object you want to take.</p>');
	}

	function inspectWhat() {
		$main.html('<p>Inspect what?</p><p>Please enter your command again, specifying a valid object you want to inspect.</p>');
	}

	function useWhat() {
		$main.html('<p>Use what?</p><p>Please enter your command again, specifying a valid object you want to use.</p>');
	}

	function checkChoice(choice) {
		choice = choice.toUpperCase();
  		if (choice.indexOf('GO') > -1) {
  			goChoices3(choice);
	    }
	    else if (choice.indexOf('TAKE') > -1) {
	    	takeChoices3(choice);
	    }
	    else if (choice.indexOf('INSPECT') > -1) {
	    	inspectChoices3(choice);
	    }
	    else if (choice.indexOf('USE') > -1) {
	    	useChoices3(choice);
	    }
	    else {
	    	error();
	    }
  	}

	// MASTER CHOICE FUNCTIONS

	function goChoices3(choice) {
		if (choice == 'GO NORTH' && atSouth) {
			goNorth();
		}
		else if (choice == 'GO NORTH' && atNorth) {
			noGoNorth();
		}
		else if (choice == 'GO SOUTH' && atNorth) {
			goSouth();
		}
		else if (choice == 'GO SOUTH') {
			noGoSouth();
		}
		else if (choice == 'GO WEST' || 'GO EAST') {
			noGo();
		}
		else {
			goWhere();
		}
	}

	function takeChoices3(choice) {
		if (choice == 'TAKE WHITEBOARD' && atSouth) {
			takeWhiteboard();
		}
		else if (choice == 'TAKE LAPTOP' && atSouth) {
			takeLaptop();
		}
		else if (choice == 'TAKE SIGN' && atSouth) {
			takeSign();
		}
		else {
			takeWhat();
		}
	}

	function inspectChoices3(choice) {
		if (choice == 'INSPECT WHITEBOARD' && atSouth) {
			inspectWhiteboard();
		}
		else if (choice == 'INSPECT SIGN' && atSouth) {
			inspectSign();
		}
		else if (choice == 'INSPECT LAPTOP' && atSouth) {
			inspectLaptop();
		}
		else if (choice == 'INSPECT WATER COOLER' && atNorth) {
			inspectWaterCooler();
		}
		else if (choice == 'INSPECT BEAN BAG CHAIR' && atNorth) {
			inspectBeanBag();
		}
		else if (choice == 'INSPECT FOOSBALL TABLE' && atNorth) {
			inspectFoosballTable();
		}
		else if (choice == 'INSPECT PAPER BALL' && atNorth && waterCoolerUsed) {
			inspectPaperBallError();
		}
		else if (choice == 'INSPECT PAPER BALL' && atNorth && hasPaperBall) {
			inspectPaperBall();
		}
		else {
			inspectWhat();
		}
	}

	// function useChoices3(choice) {
		
	// 	else {
	// 		useWhat();
	// 	}
	// }

	// CHILD GO FUNCTIONS
	function goNorth() {
		$main.html('<p>You walk to the north end of the office.</p> <p>In the corner of the room is a <strong>WATER COOLER</strong> and a <strong>BEAN BAG CHAIR</strong></p> <p>In the centre is a <strong>FOOSBALL TABLE</strong>.</p><p>What will you do?</p>');
		atNorth = true;
		atSouth = false;
	}

	function noGoNorth() {
		$main.html('<p>You\'re already as far north as you can go. <br> You just walked straight into a wall. <br> Nice one.</p><p>What will you do?</p>');
	}

	function goSouth() {
		$main.html('<p>You walk back to the south end of the office.</p><p>In the corner of the room is a large <strong>WHITEBOARD</strong> and a <strong>SIGN</strong>.<p>In the middle of the room is a table with a sleek <strong>LAPTOP</strong> on it.</p><p>What will you do?</p>');
		atSouth = true;
		atNorth = false;
	}

	function noGoSouth() {
		$main.html('<p>I already told you the door to the south closed. <br> Please stop trying to break my game.</p><p>What will you do?</p>');
	}

	// CHILD TAKE FUNCTIONS
	function takeWhiteboard() {
		$main.html('<p>The whiteboard is on the wall, it\'s not for taking. <br> Bad player. Bad.</p>What will you do?</p>');
	}

	function takeSign() {
		$main.html('<p>Okay, did you really think you were going <br> to be able to take the sign? Really? <br> Come on, this is just getting ridiculous now.</p><p>What will you do?');
	}

	function takeLaptop() {
		$main.html('<p>I dunno, this laptop looks really expensive. <br> I think you should just leave it on the table, <br> or you might drop it. <br> That seems like something you\'d do.</p>What will you do?</p>');
	}

	// CHILD INSPECT FUNCTIONS
	function inspectWhiteboard() {
		$main.html('<p>It\'s a whiteboard with lots of diagrams and technical language <br> that you don\'t really understand, but feel like <br> you\'d be good at pretending that you do. <p>"USERNAME: ADMIN1" is written in large letters</p><p>What will you do?</p>');
	}

	function inspectSign() {
		$main.html('<p>On the wall in big, white letters it says:</p> "CODEQUEST - We make your dreams come true"</p><p>You can\'t put your finger on why, <br> but this seems really self-indulgent.</p><p>What will you do?</p>');
	}

	function inspectLaptop() {
		$main.html('<p>It\'s a brand-new, state of the art laptop. <br> Fully-charged. Dope graphics card. <br> Totally rad stickers of flames on the back. <br> Nice.</p><p>What will you do?');
	}

	function inspectWaterCooler() {
		$main.html('<p>It\'s a fairly standard water cooler. Yep. Nothing to see here.</p><p>What will you do?</p>')
	}

	function inspectBeanBag() {
		$main.html('<p>It\'s a big, fluffy bean bag chair.<br>There\'s a supsicious-looking stain on it.<br>Eww.</p><p>What will you do?');
	}

	function inspectFoosballTable() {
		$main.html('<p>It\'s a foosball table. Looking at it makes you angry. <br> Why is this here? Who wants this? Stupid.</p>What will you do?</p>');
	}

	function inspectPaperBallError() {
		$main.html('<p>It\s a crumpled it paper ball. I just told you that. <br> What did you think was going to change? <br> PICK IT UP.</p><p>What will you do?');
	}

	function inspectPaperBall() {
		$main.html('<p>On the paper, you can barely make out the phrase "m0rph3u5".</p><p>What will you do?</p>');
	}

	// CHILD USE FUNCTIONS
















});