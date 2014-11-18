function init(){

}

$(window).load(function(){
	$(window).bind('hashchange', function() {
		var	newHash  = window.location.hash,
		loadFile = newHash.replace('#', '');
		loadFile = loadFile === '' ? 'home' : loadFile;

		$('#content').load('inc/'+loadFile+'.html', function(){

			$('#content').on('click', '.meridian span', function(e){
				$('.meridian .am').toggleClass('selected');
				$('.meridian .pm').toggleClass('selected');
			});
			$('#content').on('click', '#add-notification', function(e){
				e.preventDefault();
				e.stopPropagation();
				$('.reminder-form').show();
			});
			$( "#datepicker" ).datepicker({ 
				dateFormat: "M dd yy"});
			$('#content form.jqtransform').jqTransform();
			$('#content form').find('select.jqtransform').each(function(){
				$(this).jqTransSelect();
			});
			$('#content').on('focus', '#datepicker', function(){
				$(this).removeClass('error');
			})
			// REFILL REMINDER
			$('.reminder-form.refill #save').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				var time = $('#hour .jqTransformSelectWrapper div span').html();
				var merid = $('#hour .meridian').find('.selected').html();
				var date = $('#datepicker').datepicker('getDate');
				var month = $.datepicker.formatDate( "M", date);
				var day = $.datepicker.formatDate( "dd", date);
				var year = $.datepicker.formatDate( "yy", date);
				if(date===null){
					$('#datepicker').addClass('error');
				}else{
					$('.reminder-form').hide();
					$('.all-reminders').append(
						'<div class="reminder-set"><div class="time">'+ time+
						'</div><div class="am-pm">'
						+merid+
						'</div><div class="month">'
						+month+
						'</div><div class="day">'
						+day+
						'</div><div class="year">'
						+year+
						'</div></div>');
				}
			});
			// DAILY REMINDER
			$('.reminder-form.sched #save').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				var time = $('.time .jqTransformSelectWrapper div span').html();
				$('.reminder-form').hide();
				$('.all-reminders').append(
					'<div class="reminder-set"><div class="time">'
					+time+' before</div></div>'
					);
			});
		});



});
	// initial trigger
	$(window).trigger('hashchange');
})