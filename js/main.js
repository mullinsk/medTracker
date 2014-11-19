window.meds = {};
current = '';
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
		// Dynamically update Med Profile
		if(window.location.hash==='#medprofile'){
			$('#currName2').html(current);
			$('#currDose').html(meds[current]['dose']);
			$('#currDaily').html(meds[current]['daily']);
			$('#currQuant').html(meds[current]['quant']);
			$('#currRefill').html(meds[current]['refill']);
			$('#currAdd').html(meds[current]['add']);
		}
		$('#content').on('click', '.delete', function(e) {
			$(this).parent('.reminder-set').remove();
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
		});
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
						'</div><span class="delete"></span></div>');
				}
			});
			$('#content').on('click', '.reminder-form #cancel', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$('.reminder-form').hide();
			});
			// DAILY REMINDER
			$('.reminder-form.sched #save').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				var time = $('.time .jqTransformSelectWrapper div span').html();
				$('.reminder-form').hide();
				$('.all-reminders').append(
					'<div class="reminder-set"><div class="time">'
					+time+' before</div><span class="delete"></span></div>'
					);
			});
			$('#verify').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				var name = $('#name').val();
				var namecheck = $('#name').val();
				var dose = $('#dose').val();
				var daily = $('.jqTransformSelectWrapper div span').html();
				var quant = $('#quant').val();
				var refill = $('#refill').val();
				var date = $('#datepicker').datepicker('getDate');
				var day = $.datepicker.formatDate( "mm/dd/yy", date);
				var add = $('#add').val();
				if(dose=="" || quant =="" || refill=="" || namecheck=="" || day==""){

					$('.error-message').show();
				}else{

					$('.verify #currName2').html(name);
					$('.verify #currDose').html(dose);
					$('.verify #currDaily').html(daily);
					$('.verify #currQuant').html(quant);
					$('.verify #currRefill').html(refill);
					$('.verify #currAdd').html(add);
					$('.verify').show();
					$('#verify').hide();
					$('#addmed').show();
					$('#goback').show();
					$('form').hide();
				}
			});
			$('#goback').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				$('.verify').hide();
					$('#verify').show();
					$('#addmed').hide();
					$('#goback').hide();
					$('form').show();
			});
			$('#addmed').on('click', function(e){
				var name = $('#name').val();
				var namecheck = $('#name').val();
				var dose = $('#dose').val();
				var daily = $('.jqTransformSelectWrapper div span').html();
				var quant = $('#quant').val();
				var refill = $('#refill').val();
				var date = $('#datepicker').datepicker('getDate');
				var day = $.datepicker.formatDate( "mm/dd/yy", date);
				var add = $('#add').val();
				console.log(name);
					meds[name] = {
						'dose':dose,
						'daily':daily,
						'quant':quant,
						'refill':refill,
						'datepicker':day,
						'add':add
					}
			});
			
			$.each(meds, function(i, val){
				var name = i;
				$('.med-links').append('<li><a href="#medprofile">'+name+'</a></li>');
				current = name;
			});
			if($('.med-links').html()==""){
				$('.med-links').html('<p>No Medicines Added</p>');
			}
		});





});
	// initial trigger
	$(window).trigger('hashchange');
})