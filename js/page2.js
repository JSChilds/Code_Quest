$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');
	var $h1 = $('h1');

	// ROOM-SPECIFIC VARIABLES
	var doorOpen = false;
	var powerOn = false;
	var doorControlsOn = false;
	var deskInspected = false;
	var drawerOpen = false;
	var hasScrewdriver = false;
	var computerInspected = false;
	var serversInspected = false;
	var doorInspected = false;
	var hasScrewdriver = false;
	var grateOpen = false;
	var comptuerPowerOn = false;
	var step = 0;

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
		if (step > 0) {
			computerChoices(choice);
		}
  		else if (choice.indexOf('GO') > -1) {
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
		if (choice == 'TAKE SCREWDRIVER' && drawerOpen) {
			getScrewdriver();
		}
		else if (choice == 'TAKE DESK') {
			takeDesk();
		}
		else if (choice == 'TAKE SERVERS') {
			takeServers();
		}
		else if (choice == 'TAKE POWER BUTTON' && computerInspected) {
			takePowerButton();
		}
		else if (choice == 'TAKE SWITCH' && grateOpen) {
			takeSwitch();
		}
		else if (choice == 'TAKE COMPUTER') {
			takeComputer();
		}
		else {
			takeWhat();
		}
	}

	function inspectChoices2(choice) {
		if (choice == 'INSPECT COMPUTER') {
			inspectComputer();
		}
		else if (choice == 'INSPECT POWER BUTTON' && computerInspected) {
			inspectPowerButton();
		}
		else if (choice == 'INSPECT DESK') {
			inspectDesk();
		}
		else if (choice == 'INSPECT SERVERS') {
			inspectServers();
		}
		else if (choice == 'INSPECT DOOR') {
			inspectDoor();
		}
		else if (choice == 'INSPECT DRAWER' && deskInspected) {
			inspectDrawer();
		}
		else if (choice == 'INSPECT SCREWDRIVER' && drawerOpen) {
			inspectScrewdriver();
		}
		else if (choice == 'INSPECT SWITCH' && grateOpen) {
			inspectSwitch();
		}
		else if (choice == 'INSPECT KEYPAD' && doorControlsOn) {
			inspectKeypad();
		}
		else if (choice == 'INSPECT KEYPAD') {
			inspectKeypadError();
		}
		else {
		inspectWhat();
		}
	}

	function useChoices2(choice) {
		if (choice == 'USE DRAWER' && deskInspected) {
			useDrawer();
		}
		else if (choice == 'USE DESK') {
			useDesk();
		}
		else if (choice == 'USE SCREWDRIVER' && hasScrewdriver && !serversInspected) {
			useScrewdriverError();
		}
		else if (choice == 'USE SCREWDRIVER' && grateOpen) {
			useScrewdriverAgain();
		}
		else if (choice == 'USE SCREWDRIVER' && hasScrewdriver) {
			useScrewdriver();
		}
		else if (choice == 'USE POWER BUTTON' && powerOn) {
			usePowerButton();
		}
		else if (choice == 'USE POWER BUTTON' && computerInspected) {
			usePowerButtonError();
		}
		else if (choice == 'USE SERVERS') {
			useServers();
		}
		else if (choice == 'USE COMPUTER' && comptuerPowerOn) {
			useComputer();
		}
		else if (choice == 'USE COMPUTER') {
			useComputerError();
		}
		else if (choice == 'USE SWITCH' && grateOpen) {
			useSwitch();
		}
		else if (choice == 'USE KEYPAD' && doorInspected && doorControlsOn) {
			useKeypad();
		}
		else if (choice == 'USE KEYPAD' && doorInspected) {
			useKeypadError();
		}
		else if (choice == 'USE DOOR') {
			useDoor();
		}
		else {
			useWhat();
		}
	}

	function computerChoices(choice) {
		if (choice == 'CD DOOR_CONTROL' && step == 1) {
			step = 2;
			$main.html('<p>CHANGED DIRECTORY TO DOOR_CONTROL. <br> PLEASE LIST ALL FILES IN WORKING DIRECTORY.</p>What will you type?</p>');
		}
		else if (choice == 'LS' && step == 2) {
			step = 3;
			$main.html('<p>PLANNER.TXT <br> SERVERS.TXT <br> CUTE_KITTEN.PNG <br> ERROR: NO DOOR_CONTROL.EXE FILE FOUND. <br> PLEASE CREATE NEW FILE TITLED DOOR_CONTROL.EXE</p><p>What will you type?');
		}
		else if (choice == 'TOUCH DOOR_CONTROL.EXE' && step == 3) {
			step = 4;
			$main.html('<p>DOOR_CONTROL.EXE CREATED. <br> DOOR_CONTROL.EXE LINKED WITH DOOR_CONTROLS. <br> PLEASE OPEN DOOR_CONTROL.EXE TO ACCESS DOOR CONTROLS.</p><p>What will you type?');
		}
		else if (choice == 'OPEN DOOR_CONTROL.EXE' && step == 4) {
			step = 0;
			doorControlsOn = true;
			$main.html('<p>DOOR CONTROLS INITIATED. YOU ARE SMART AND BEAUTIFUL <br> AND ALL THE OTHER KIDS ARE JEALOUS OF YOU. <br> GOODBYE XXX ;)</p><p>The eerily supportive computer switches off. <br> You better go check the door.</p><p>What will you do?</p>');
		}
		else if (choice !== 'CD DOOR_CONTROL' && step == 1) {
			$main.html('<p>INCORRECT COMMAND. PLEASE CHANGE TO DOOR_CONTROL DIRECTORY.</p><p>What will you type?</p>');
		}
		else if (choice !== 'LS' && step == 2) {
			$main.html('<p>INCORRECT COMMAND. PLEASE LIST ALL FILES IN WORKING DIRECTORY.</p><p>What will you type?</p>');
		}
		else if (choice !== 'TOUCH DOOR_CONTROL.EXE' && step == 3) {
			$main.html('<p>INCORRECT COMMAND. PLEASE CREATE A FILE CALLED DOOR_CONTROL.EXE.</p><p>What will you type?</p>');
		}
		else if (choice !== 'OPEN DOOR_CONTROL.EXE' && step == 4) {
			$main.html('<p>INCORRECT COMMAND. PLEASE OPEN DOOR_CONTROL.EXE. <br> [P.S. YOU ARE REALLY CLOSE TO OPENING THE DOOR, I PROMISE.]</p><p>What will you type?</p>');
		}
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
	function takeComputer() {
		$main.html('<p>Sorry, it\'s bolted down. You thief.</p><p>What will you do?</p>');
	}

	function takeDesk() {
		$main.html('<p>The desk is way too heavy to carry. <br> Clearly, you don\'t lift. Pathetic.</p><p>What will you do?</p>');
	}

	function getScrewdriver() {
		$main.html('<p>You picked up the screwdriver. <br> Praise be to you, O great master of tools. <img style="height: 329px; margin-top: 17px" src="../images/screwdriver.jpg"/><p>What will you do?</p>');
		hasScrewdriver = true;
	}

	function takeServers() {
		$main.html('<p>You feel like unplugging any of these would be a bad idea. <br> Best just leave them where they are.</p><p>What will you do?</p>');
	}

	function takePowerButton() {
		$main.html('<p>You\'d have to snap it off and then the game might be unplayable, <br> so you\'d better not.</p><p>What will you do?</p>');
	}

	function takeSwitch() {
		$main.html('<p>You try to wrestle the switch off of the wall, but to no avail. <br> What an utter waste of time.</p><p>What will you do?</p>');
	}

	// CHILD INSPECT FUNCTIONS
	function inspectComputer() {
		$main.html('<p>This computer\'s hardly modern, but it looks functional. <br> The <strong>POWER BUTTON</strong> is off.</p><p>What will you do?</p>');
		computerInspected = true;
	}

	function inspectPowerButton() {
		$main.html('<p>Yep, that\'s a power button all right. <br> (USE IT!!!!!!!!!!) </br><p>What will you do?</p>');
	}

	function inspectDesk() {
		$main.html('<p>It\'s an old desk with a single <strong>DRAWER</strong>. <br> Somebody has carved "Sunil wuz here" into the wood. <br> You feel deep regret that you will likely never meet this great artist.</p><p>What will you do?</p>');
		deskInspected = true;
	}

	function inspectDrawer() {
		$main.html('<p>It\'s a drawer... <br> Maybe try opening it?</p><p>What will you do?</p>');
	}

	function inspectScrewdriver() {
		$main.html('<p>It\'s a screwdriver. <br> A Philip\'s head to be precise. <br> You use it to unscrew things. <br> Aren\'t you glad you inspected this?</p><p>What will you do?</p>');
	}

	function inspectServers() {
		$main.html('<p>There are a ton of servers with wires running out of them. <br> Behind one of the servers, you can see a metal grate that\'s screwed on tight.</p>');
		serversInspected = true;
	}

	function inspectSwitch() {
		$main.html('<p>It\'s a simple switch. <br> It goes on or off. That\'s it. <br> I\'m starting to suspect you may not be too bright.</p><p>What will you do?</p>');
	}

	function inspectDoor() {
		$main.html('<p>It\'s a thick, metal door. Next to it is a KEYPAD</p><p>What will you do?</p>');
		doorInspected = true;
	}

	function inspectKeypad() {
		$main.html('<p>The keypad reads "READY"</p><p>What will you do?</p>');
	}

	function inspectKeypadError() {
		$main.html('<p>The keypad reads "LOCKED".</p><p>What will you do?</p>');
	}

	//CHILD USE FUNCTIONS
	function useDoor() {
		$main.html('<p>There\'s nothing to use. It\'s just a door. Duh.</p><p>What will you do?</p>');
	}

	function useComputer() {
		step = 1;
		$main.html('<p>The computer boots up and displays the following message:</p><p>WELCOME. TO ACCESS DOOR CONTROLS, PLEASE CHANGE TO DOOR_CONTROL DIRECTORY.</p>What will you type?</p>');
	}

	function useComputerError() {
		$main.html('<p>You stare blankly at the computer for several minutes <br> before realising it isn\'t turned on.</p><p>What will you do?</p>');
	}

	function useDesk() {
		$main.html('<p>You sit at the desk and compose a sonnet. <br> It\'s beautiful. <br> You start to cry.</p><p>What will you do?</p>');
	}
	function useDrawer() {
		$main.html('<p>You opened the drawer. <br> There\'s a small, flimsy-looking <strong>SCREWDRIVER</strong> inside.</p>');
		drawerOpen = true;
	}

	function useScrewdriver() {
		$main.html('<p>You carefully unscrew the metal grate to reveal a <strong>SWITCH</strong>, <br> breaking the flimsy screwdriver in the proccess. <br> Why there was a metal grate in the way of a switch you don\'t know, <br> it\'s almost like it was just there to waste your time. <br> Hmm.</p><p>What will you do?</p>');
		grateOpen = true;
	}

	function useScrewdriverError() {
		$main.html('<p>You\'d better find something to use it on first, don\'t you think?</p><p>What will you do?</p>');
	}

	function useScrewdriverAgain() {
		$main.html('<p>You don\'t have the screwdriver anymore, dingus. <br> Please try to pay attention.</p>What will you do?</p>');
	}

	function usePowerButtonError() {
		$main.html('<p>You press the power button, but nothing happens. <br> Bummer.</p><p>What will you do?</p>');
	}

	function usePowerButton() {
		$main.html('<p>You turn on the power and hear that familiar Windows XP start-up sound. <br> Ah, memories.</p><p>What will you do?</p>');
		comptuerPowerOn = true;
	}

	function useServers() {
		$main.html('<p>The servers are working fine already.</p><p>What will you do?</p>');
	}

	function useSwitch() {
		$main.html('<p>You flick the switch on. <br> Sparks fly as power rushes through a cable <br> to the computer in the middle of the room.</p><p>What will you do?</p>');
		powerOn = true;
	}
	
	function useKeypad() {
		$main.html('<p>You press enter on the keypad. It reads "door.slideUp();". <br> The door slides upward, opening the path to the <strong>WEST</strong>. <br> You better hurry through in case it closes on you and crushes you to death. <br> Or don\'t. Whatever.</p><p>What will you do?</p>');
		doorOpen = true;
	}

	function useKeypadError() {
		$main.html('<p>You tap buttons on the keypad, but nothing happens. <br> It seems you\'ll have to unlock access to it first.</p><p>What will you do?</p>');
	}
});