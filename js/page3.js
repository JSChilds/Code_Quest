$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');
	var $h1 = $('h1');
	var $redDiv = $('.red-div');
	var $audio = $('audio');

	// ROOM-SPECIFIC VARIABLES
	var hasPaperBall = false;
	var step = 0;
	var part = 0;
	var atSouth = true;
	var atNorth = false;
	var waterCoolerUsed = false;
	var choiceA = false;
	var choiceB = false;
	var choiceC = false;
	var choiceD = false;



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
		$main.html('<p>Go where?</p><p>Please enter your command again, <br> specifying a valid direction you want to go to.</p>');
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
		if (part >= 4) {
			divFightEnd(choice);
			battleMusic();
		}
		else if (part > 0) {
			divFightChoices(choice);
			battleMusic();
		}
		else if (step > 0) {
			laptopChoices(choice);
		}
  		else if (choice.indexOf('GO') > -1) {
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
		else if (choice == 'GO WEST' || choice == 'GO EAST') {
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
		else if (choice == 'TAKE BEAN BAG CHAIR' && atNorth) {
			takeBeanBag();
		}
		else if (choice == 'TAKE FOOSBALL TABLE' && atNorth) {
			takeFoosballTable();
		}
		else if (choice == 'TAKE WATER COOLER' && atNorth) {
			takeWaterCooler();
		}
		else if (choice == 'TAKE PAPER BALL' && hasPaperBall) {
			getPaperBallError();
		}
		else if (choice == 'TAKE PAPER BALL' && waterCoolerUsed && !hasPaperBall) {
			getPaperBall();
		}
		else {
			takeWhat();
		}
	}

	function inspectChoices3(choice) {
		if (choice == 'INSPECT ROOM' && atSouth) {
			inspectRoomSouth();
		}
		else if (choice == 'INSPECT ROOM' && atNorth) {
			inspectRoomNorth();
		}
		else if (choice == 'INSPECT WHITEBOARD' && atSouth) {
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
		else if (choice == 'INSPECT PAPER BALL' && hasPaperBall) {
			inspectPaperBall();
		}
		else if (choice == 'INSPECT PAPER BALL' && atNorth && waterCoolerUsed) {
			inspectPaperBallError();
		}
		else {
			inspectWhat();
		}
	}

	function useChoices3(choice) {
		if (choice == 'USE BEAN BAG CHAIR' && atNorth) {
			useBeanBag();
		}
		else if (choice == 'USE FOOSBALL TABLE' && atNorth) {
			useFoosballTable();
		}
		else if (choice == 'USE WATER COOLER' && atNorth && hasPaperBall) {
			useWaterCoolerAgain();
		}
		else if (choice == 'USE WATER COOLER' && atNorth) {
			useWaterCooler();
		}
		else if (choice == 'USE PAPER BALL' && hasPaperBall) {
			usePaperBall();
		}
		else if (choice == 'USE WHITEBOARD' && atSouth) {
			useWhiteboard();
		}
		else if (choice == 'USE SIGN' && atSouth) {
			useSign();
		}
		else if (choice == 'USE PAPER BALL' && atNorth && waterCoolerUsed) {
			usePaperBallError();
		}
		else if (choice == 'USE LAPTOP' && atSouth) {
			useLaptop();
		}
		else {
			useWhat();
		}
	}

	function laptopChoices(choice) {
		var funk = new Audio('../audio/error.mp3');
		var welcome = new Audio('../audio/welcome.mp3');
		if (choice == 'ADMIN1' && step == 1) {
			$main.html('<p>The laptop reads:</p> <p> ADMIN1, ENTER PASSWORD OR "QUIT" TO EXIT.</p><p>What will you type?');
			step = 2;
		}
		else if (choice == 'M0RPH3U5' && step == 2) {
			welcome.play();
			$main.html('<p>The laptop reads:</p> <p>WELCOME, ADMIN1</p><p>A page loads, it looks like a webpage with the console open...</p> <p>(Type "NEXT" to continue.)</p>');
			step = 3;
		}
		else if (choice == 'NEXT' && step == 3) {
			divFight();
		}
		else if (choice == 'QUIT') {
			$main.html('<p>You stopped using the laptop.</p><p>What will you do?');
			step = 0;
		}
		else if (choice !== 'ADMIN 1' && step == 1) {
			funk.play();
			$main.html('<p>The laptop reads:</p><p>UNIDENTIFIED USERNAME. <br> ENTER VALID USERNAME OR "QUIT" TO EXIT.</p><p>What will you type?');
		}
		else if (choice !== 'M0RPH3U5' && step == 2) {
			funk.play();
			$main.html('<p>The laptop reads:</p><p>INCORRECT PASSWORD. <br> ENTER CORRECT PASSWORD OR "QUIT" TO EXIT.</p><p>What will you type?</p>');
		}
	}

	function divFightChoices(choice) {
		if (choice == 'NEXT' && part == 1) {
			$main.html('<p>The div is waiting patiently.</p><div class="red-div"></div><p class="options">A) Use margin to move it out of the way!</p><p class="options">B) Set the display to none!</p><p class="options">C) Give it a width and height of 0!</p><p class="options">D) Set the font to Comic Sans!</p><p>Which option will you choose?</p>');	
			part = 2;
		}
		else if (choice == 'A' && part == 2) {
			$main.html('<p>It won\'t move!</p><div class="red-div"></div><p id="A">A) Use margin to move it out of the way!</p><p id="B">B) Set the display to none!</p><p id="C">C) Give it a width and height of 0!</p><p id="D">D) Set the font to Comic Sans!</p><p>Which option will you choose?</p>');	
			choiceA = true;
			divFightCheck(choice);
		}
		else if (choice == 'B' && part == 2) {
			$main.html('<p>It\'s still there, taunting you!</p><div class="red-div"></div><p id="A">A) Use margin to move it out of the way!</p><p id="B">B) Set the display to none!</p><p id="C">C) Give it a width and height of 0!</p><p id="D">D) Set the font to Comic Sans!</p><p>Which option will you choose?</p>');	
			choiceB = true;
			divFightCheck(choice);
		}
		else if (choice == 'C' && part == 2) {
			$main.html('<p>The height and width don\'t change at all!</p><div class="red-div"></div><p id="A">A) Use margin to move it out of the way!</p><p id="B">B) Set the display to none!</p><p id="C">C) Give it a width and height of 0!</p><p id="D">D) Set the font to Comic Sans!</p><p>Which option will you choose?</p>');	
			choiceC = true;
			divFightCheck(choice);
		}
		else if (choice == 'D' && part == 2) {
			$main.html('<p>W-why did you think that would work...</p><div class="red-div"></div><p id="A">A) Use margin to move it out of the way!</p><p id="B">B) Set the display to none!</p><p id="C">C) Give it a width and height of 0!</p><p id="D">D) Set the font to Comic Sans!</p><p>Which option will you choose?</p>');	
			$main.css('font-family', 'Comic Sans MS');
			choiceD = true;
			divFightCheck(choice);
		}
	}

	function divFightCheck(choice) {
		if (choiceA && choiceB && choiceC && choiceD) {
			if (choice == 'A') {
				$main.css('font-family', 'courier new')
				part = 4;
				$main.html('<p>It won\'t move!</p><div class="red-div"></div><p>You\'re all out of options! You\'re doomed! Doomed! <br> ..........oh, wait... you were targeting the wrong div...</p><p>.........</p><p>E) Select correct div.</p>Which option will you choose?</p>');	
			}
			else if (choice == 'B') {
				$main.css('font-family', 'courier new')
				part = 4;
				$main.html('<p>It\'s still there, taunting you!</p><div class="red-div"></div><p>You\'re all out of options! You\'re doomed! Doomed! <br> ..........oh, wait... you were targeting the wrong div...</p><p>.........</p><p>E) Select correct div.</p>Which option will you choose?</p>');	
			}
			else if (choice == 'C') {
				$main.css('font-family', 'courier new')
				part = 4;
				$main.html('<p>The height and width don\'t change at all!</p><div class="red-div"></div><p>You\'re all out of options! You\'re doomed! Doomed! <br> ..........oh, wait... you were targeting the wrong div...</p><p>.........</p><p>E) Select correct div.</p>Which option will you choose?</p>');	
			}
			else if (choice == 'D') {
				$main.css('font-family', 'Comic Sans MS');
				part = 4;
				$main.html('<p>W-Why did you think that would work...</p><div class="red-div"></div><p>You\'re all out of options! You\'re doomed! Doomed! <br> ..........oh, wait... you were targeting the wrong div...</p><p>.........</p><p>E) Select correct div.</p>Which option will you choose?</p>');	
			}
		}
		else {
			divFightChoices();
		}
	}

	function divFightEnd(choice) {
		if (choice == 'E') {
			part = 5;
			$redDiv.removeClass('hidden-div');
			$redDiv.fadeOut(1200);
			$main.css('font-family', 'courier new');
			$main.html('<h2>YOU WIN!</h2><p>The div disappears!</p><p>HTML level up! CSS level up!</p><p>You learnt new skill: "BASIC READING COMPREHENSION"!</p><p>(Type "NEXT" to continue.)');
		}
		else if (choice == 'NEXT' && part == 5) {
			part = 6;
			$main.html('<p>Suddenly, everything seems clear to you, <br> like you\'ve found the answer you\'ve been looking for.</p>In your mind, a bright door of light opens to the <strong>EAST</strong>...</p><p>What will you do?</p>');
		}
		else if (choice == 'GO EAST' && part == 6) {
			goEast();
		}
		else if (choice !== 'GO EAST' && part == 6) {
			$main.html('<p>There\'s nothing more to do than to go <strong>EAST</strong>...<p>What will you do?</p>');
		}
		else if (choice !== 'E' && part == 4) {
			$main.css('font-family', 'courier new');
			$main.html('<div class="red-div"></div><p>........seriously? <br> Come on, man, just type "E".</p><p>Which option will you choose?</p>');
			divFightEnd();
		}
	}

	function battleMusic() {
		var $battle =  document.getElementById('battle');
		var fanfare = new Audio('../audio/Fanfare.mp3');
		if (part == 2 && !choiceA && !choiceB && !choiceC && !choiceD) {
			$battle.play();
		}
		else if (part == 5) {
			$battle.pause();
			fanfare.play();
		}
	}

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
		$main.html('<p>I already told you the door to the south is closed.</p><p>What will you do?</p>');
	}

	function goEast() {
		window.location.href="page4.html";
	}

	function noGo() {
		$main.html('<p>There\'s nothing interesting over there. Honest.</p><p>What will you do?</p>');
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

	function takeBeanBag() {
		$main.html('<p>There\'s a weird looking stain on the chair <br> and you don\'t want to touch it.</p><p>What will you do?</p>');
	}

	function takeFoosballTable() {
		$main.html('<p>You try to put the foosball table in your pocket, but you can\'t. <br> BECAUSE IT\'S A TABLE.</p><p>What will you do?');
	}

	function takeWaterCooler() {
		$main.html('<p>You pick up the water cooler and the jug falls out, <br> spilling water everywhere. <br> Nice one, genius.</p><p>What will you do?</p>');
	}

	function getPaperBall() {
		$main.html('<p>You pick up the paper ball. (Ugh, it\'s soggy.)</p><div class="img-box"> <div id="img-bar"> <p>object.jpg</p> <div id="X3"> <p>X</p></div></div><img src="../images/paperball.jpg"/></div><p>You uncrumple it. There seems to be something written on it...</p><p>What will you do?');
		hasPaperBall = true;
	}

	function getPaperBallError() {
		$main.html('<p>You already have the paper ball. <br> Please stop trying to break my game.</p><p>What will you do?</p>');
	}

	// CHILD INSPECT FUNCTIONS
	function inspectRoomSouth() {
		$main.html('<p>You\'re in a hip, open-plan office. Everything looks sleek and up-to-date.</p><p>In the corner of the room is a large <strong>WHITEBOARD</strong> and a <strong>SIGN</strong>.<p>In the middle of the room is a table with a sleek <strong>LAPTOP</strong> on it.</p><p>It looks like there is more of the office to the <strong>NORTH</strong>.</p><p>What will you do?</p>');
	}

	function inspectRoomNorth() {
		$main.html('<p>In the corner of the room is a <strong>WATER COOLER</strong> and a <strong>BEAN BAG CHAIR</strong>. <br> In the centre is a <strong>FOOSBALL TABLE</strong>. <p>There is more of the room to the <strong>SOUTH</strong>.<p>What will you do?</p>');
	}

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
		$main.html('<p>It\'s a crumpled up paper ball clogging the water cooler. <br> I just told you that. What did you think was going to change? <br> PICK IT UP FIRST.</p><p>What will you do?');
	}

	function inspectPaperBall() {
		$main.html('<p>On the paper, you can barely make out the phrase "m0rph3u5".</p><p>What will you do?</p>');
	}

	// CHILD USE FUNCTIONS
	function useWhiteboard() {
		$main.html('<p>You draw some dirty pictures on the whiteboard and giggle to yourself. <br> Wow. You\'re really mature.</p><p>What will you do?</p>');
	}

	function useSign() {
		$main.html('<p>How exactly were you planning on using the sign? <br> Like, really, what were you expecting to happen?</p><p>What will you do?</p>');
	}

	function useBeanBag() {
		$main.html('<p>You sit in the bean bag chair and feel something moist. <br> You shudder.</p><p>What will you do?');
	}

	function useFoosballTable() {
		$main.html('<p>You play foosball with yourself for a little while. <br> How terribly sad.</p><p>What will you do?</p>');
	}

	function useWaterCooler() {
		$main.html('<p>You turn on the water cooler, but it\'s clogged. <br> Upon closer inspection, there is a <strong>PAPER BALL</strong> wedged inside it.</p><p>What will you do?');
		waterCoolerUsed = true;
	}

	function useWaterCoolerAgain() {
		$main.html('<p>The clog now cleared, you pour yourself a nice, refreshing cup of water. <br> Really hits the spot. <br> Now back to work.</p><p>What will you do?</p>');
	}

	function usePaperBall() {
		$main.html('<p>The paper balll creates a wormhole to another dimension <br> and you find yourself trapped in a horrible nightmare realm <br> filled with demons made of your deepest fears.<p>GAME OVER</p><p>Just kidding, it actually does nothing because it\'s just a paper ball.</p>What will you do?</p>');
	}

	function usePaperBallError() {
		$main.html('<p>It\'s clogged in the water cooler, <br> better take it out first.</p><p>What will you do?</p>');
	}

	function useLaptop() {
		$main.html('<p>The laptop reads:</p><p>ENTER USERNAME <br> OR "QUIT" TO EXIT.</p><p>What will you type?</p>');
		step = 1;
	}

	function divFight() {
		$main.html('<p>...suddenly, a stray div attacks!</p> <div class="red-div"></div> <p>Hurry, get rid of it!</p><p>(Type "NEXT" to continue.)');
		step = 0;
		part = 1;
	}







});