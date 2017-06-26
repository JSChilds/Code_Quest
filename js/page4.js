$(function(){

	// VARIABLES

	// JQUERY VARIABLES
	var $input = $('input');
	var $main = $('main');
	var $h1 = $('h1');
	var $body = $('body');

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

	function checkChoice(choice) {
		choice = choice.toUpperCase();
		if (choice == 'TARGET DIV') {
			$body.html('<p>You target the div, set display to hide and...</p><p>.....nothing happens.</p>.........no.</p><p>NOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!</p><h2 style="font-size: 50px">YOU...WIN...?</h2><h1 style="font-size: 96px">THE END</h1><p>Thanks for playing! xxx ;)</p>');
		}
		else {
			$main.html('<p>No time for that!</p>Type "TARGET DIV" before you forget it!</p>');
		}
	}
});