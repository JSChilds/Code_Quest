$(function() {

	// JQUERY VARIABLES
	$input = $('input');
	$icon = $('#icon');
	$console = $('.console');
	$x = $('#X');

	// FUNCTION TO CLICK ON ICON AND OPEN INSTRUCTIONS
	$icon.dblclick(function(event){
		$icon.hide();
		$console.show();
	});

	$x.click(function(event){
		$console.hide();
		$icon.show();
	});


});