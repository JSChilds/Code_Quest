$(function() {
	$input = $('input');
	$icon = $('#icon');
	$console = $('.console');
	$x = $('#X');

	$icon.dblclick(function(event){
		$icon.hide();
		$console.show();
	});

	$x.click(function(event){
		$console.hide();
		$icon.show();
	});


});