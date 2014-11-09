$(document).ready(function(){
	$('form.jqtransform').jqTransform();
	$('form').find('select.jqtransform').jqTransform();
	$('.meridian span').on('click', function(e){
		$('.meridian .am').toggleClass('selected');
		$('.meridian .pm').toggleClass('selected');
	});
	$('#add-notification').on('click', function(e){
		$('.reminder-form').show();

	});
});