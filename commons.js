var $$transform;
var isHandheld =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 1200;
var mobilePlatform = isMobile();
var mobileCheck = mobilePlatform || viewport().width <= 990;
var windowWidth;
var windowHeight;
var scrollThreshold_1_2; 
var scrollThreshold_1_5; 
var scrollThreshold_2; 
var scrollType;
var ios_device;
var ua = navigator.userAgent.toLowerCase();

var v_specials = false;
var o_specials;
var is_specials = false;
var is_form = false;
var is_gallery = false;

var $headerPic;
var $headerPass;

var arrivalDatepicker; 
var departureDatepicker;
var hideDatepickerArrival;
var hideDatepickerDeparture;
var arrivalDate = new Date()
var departureDate = new Date();



$(document).ready(function() {

		
	
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	
	$headerPass =  windowHeight+100;
	
	pageY = 0;
	
	 $('.send').bind('click',mailer);
	
	$('.langs').bind('click',show_lang);
	$('.socials').bind('click',show_social);
	
	$('.lang_box ul li').bind('click',set_lang);
	
	if($('.specials').length != 0){
		is_specials = true;
		
		o_specials = $('.specials').offset().top -windowHeight;
		
		specials_length = $('.special_blocks .block').length;
		$specialsView = $('.specials').offset().top - scrollThreshold_2 - 600;

		
		specials_visible = [];
	
		specials_offset = [];
		
		$('.special_blocks .block').each(function(i){
			specials_offset.push($('.special_blocks .block:eq('+i+')').offset().top - scrollThreshold_1_5 - 600);
			specials_visible.push(false);
		 });

	}
	
	if($('.open_gallery').length != 0){
		is_gallery = true;
		$('.open_gallery:not(.gallery_menu):not(.map_button)').bind('click',open_gallery);
		gallery_component_ready();
	}
	

	$autofill = $('.auto_fill');
    $autofill.imageScale({ 
        rescaleOnResize: true,
        align: "right"
      });
	
	
	
	$('.room_cell').bind('click', function(e){
		e.preventDefault();
		$this = $(this);
		$('#home_rooms .room_type').each(function(i){
			setTimeout(function(){
				$('#home_rooms .room_type:eq('+i+') p').addClass('top_hidden');
			},(100*i));
		})
		
		setTimeout(function(){$('html').addClass('no_opacity')},200);
		
		if(ua.toLowerCase().indexOf('trident/') < 0 && ua.toLowerCase().indexOf('msie ')) {
		
		$this.addClass('opened').zoomTo({
			targetsize:2,
			duration:1000,
			easing:[0.895, 0.030, 0.685, 0.220]
			
		})
		}
		
		setTimeout(function(){
			window.location.href = $this.attr('href');
		},1200);
	});
	
	$('#menu_controller').bind('click',open_menu);
	
	scrollThreshold_1_2 =  windowHeight / 1.2;
	scrollThreshold_1_5 =  windowHeight / 1.5;
	scrollThreshold_2 =  windowHeight / 2;
	
	$('.url_manager').bind('click',manage_links);
 
	
	
	$$transform = [Modernizr.prefixed('transform')];
	
	 if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
		 $('body').addClass('ios_device');
		 ios_device = true;
	 }
	
	
	$headerPic = $('.top_image > img')[0];
	
	$('body').removeClass('preload');
    
   
    
    setTimeout(function(){
    	$('#scroll_down').removeClass('hidden_by_scaling_full');
    },1000)
    
      setTimeout(function(){
    	$('#scroll_down .arrow_down').removeClass('hidden_1');
    },1300)
     setTimeout(function(){
    	$('#scroll_down .arrow_down').removeClass('hidden_2');
    },1600)
    
    if($('.form_wrapper').length != 0){
		is_form = true;
		arrivalDatepicker = $('.arrival').glDatePicker(
				{
					cssName: 'flatwhite',
					zIndex: 1,
				    borderSize: 0,
				    selectableDateRange: [{ from: new Date(), to:new Date(3000,1,1)}],
				    monthNames : getMonthNames(),
				    dowNames : getDowNames(),
				    onShow: function(calendar){
				    	arrivalDatepicker.render();
				    	clearTimeout(hideDatepickerArrival);
				    	calendar.find('div').addClass('top_double').addClass('has_transition_600');
				    	calendar.show();
				    	calendar.find('div').each(function(c){
				    		setTimeout(function(){
				    			calendar.find('div:eq('+c+')').removeClass('top_double')
				    		},5*c);
				    	})
				    	
				    },
				    onHide:function(calendar){
				    	hideDatepickerArrival = setTimeout(function(){
				    	calendar.addClass('has_transition_300').addClass('no_opacity')
				    	setTimeout(function(){calendar.hide();},300)
				    	},1);
				    },
				    onClick: function(el, cell, date, data) {
				    	var dd = date.getDate();
				    	var mm = date.getMonth()+1;
				    	var yyyy = date.getFullYear();
				    	
				    	if(dd<10) {
				    	    dd='0'+dd
				    	}
				    	
				    	if(mm<10) {
				    	    mm='0'+mm
				    	} 
				    	
				    	
				    	selected = dd+'/'+mm+'/'+yyyy;
				    	el.children('input').val(selected);
				    },
				    
				}
			).glDatePicker(true);
	departureDatepicker = $('.departure').glDatePicker(
				{
					cssName: 'flatwhite',
					zIndex: 1000,
				    borderSize: 0,
				    selectableDateRange: [{ from: new Date(), to:new Date(3000,1,1)}],
				    monthNames : getMonthNames(),
				    dowNames : getDowNames(),
				    onShow: function(calendar){
				    	clearTimeout(hideDatepickerDeparture);
				    	departureDatepicker.render();
				    	calendar.find('div').addClass('top_double').addClass('has_transition_600')
				    	calendar.show();
				    	calendar.find('div').each(function(c){
				    		setTimeout(function(){
				    			calendar.find('div:eq('+c+')').removeClass('top_double')
				    		},5*c);
				    	})
				    	
				    },
				    onHide:function(calendar){
				    	hideDatepickerDeparture = setTimeout(function(){
					    	calendar.addClass('has_transition_300').addClass('no_opacity')
					    	setTimeout(function(){calendar.hide();},300)
					    },1);
				    	
				    },
				    onClick: function(el, cell, date, data) {
				    	var dd = date.getDate();
				    	var mm = date.getMonth()+1;
				    	var yyyy = date.getFullYear();
				    	
				    	if(dd<10) {
				    	    dd='0'+dd
				    	}
				    	
				    	if(mm<10) {
				    	    mm='0'+mm
				    	} 
				    	
				    	
				    	selected = dd+'/'+mm+'/'+yyyy;
				    	el.children('input').val(selected);
				    },
				}
			).glDatePicker(true);
	}
    
   
    if(isHandheld){
    	setTimeout(function(){
    		$(window).trigger('scroll')
    	},500);
    	
    	
    	if(isHandheld && windowWidth < 992){
	    	$('section.top').css('height','auto');
    		$('.top_image').height(windowHeight/2);

	   // 	if(current == "index"){
		 //   	$('section.top').height(windowHeight);
	    	//	$('.top_image').height(windowHeight);

	    //	}
	    	
	    	
	    
	 } else if(isHandheld && windowWidth > 992){
	    	$('section.top:not(#specials .top)').height(windowHeight);  
	    	
	    		$('.top_image').css('height','100%');
	    	
	 }  
    	
    	
    	}

});


$(window).resize(function(){
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	
	isHandheld =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 1200;
	mobileCheck = mobilePlatform || viewport().width <= 990;
	
	$headerPass =  windowHeight+100;
	
	if(is_specials){
	o_specials = $('.specials').offset().top -windowHeight;
	specials_offset = [];
	
	$('.special_blocks .block').each(function(i){
		specials_offset.push($('.special_blocks .block:eq('+i+')').position().top);
		specials_visible.push(false);
	 });
	}

	
	
	
	if(is_gallery){	
	gallery_slider_setup();
		
		if(window.innerWidth > window.innerHeight){
			
			$('.advice').addClass('no_opacity');
		} else if (window.innerWidth < window.innerHeight) {
			
				$('.advice').removeClass('no_opacity');
				
	
		}
		
		
	}

	
	
})


 $(window).on('orientationchange', function(event) {
	 
	setTimeout(function(){
		if(isHandheld && windowWidth < 992){
	    	$('section.top').css('height','auto');
    		$('.top_image').height(windowHeight/2);

	    	if(current == "index"){
		    	$('.top').height(windowHeight);
	    	}
	    	
	    	
	    
	 } else if(isHandheld && windowWidth > 992){
	    	$('section.top').height(windowHeight);  
	    	
	    		$('.top_image').css('height','100%');
	    	
	 }  
		$(window).trigger('resize');
		$(window).trigger('scroll');
		$autofill.imageScale('scale');
		
	 },100);
 })

function open_menu () {
	$('.navigation').removeClass('hidden');
	
	if(lang_open) {
		show_lang ();
	}
	
	if(social_open) {
		show_social ();
	}
	
	$('.site_header').addClass('force_no_logo');
	
	$('#menu_controller').addClass('opened');
	$('#menu_controller').unbind('click');
	
	setTimeout(function(){
		$('.navigation').addClass('active');
	},1);
	
	setTimeout(function() {
		$('.navigation ._nanganinn_01 > img').removeClass('top_hidden')
	},200);
	
	setTimeout(function() {
		$('.navigation ._nanganinn_02 > img').removeClass('top_hidden')
	},300);
	
	setTimeout(function() {
		$('.navigation ._nanganinn_03 > img').removeClass('top_hidden')
	},400);
	
	
	
	setTimeout(function() {
		$('.navigation .nanganinn > img').removeClass('top_hidden')
	},400);
	
	setTimeout(function() {
		$('.navigation .guesthouse > img').removeClass('top_hidden')
	},500);

	
	$('.menu_container ul li').each(function(i){
		setTimeout(function(){
			$('.menu_container ul li:eq('+i+')').removeClass('hidden');
		},100+(50*i));
		
		setTimeout(function(){
			$('.menu_container ul li:eq('+i+') a').removeClass('top_hidden');
		},650+(50*i))
	})
	
	setTimeout(function() {
		$('#menu_controller').bind('click', close_menu);
	},900);
	
	setTimeout(function() {
		$('.navigation .langs p').removeClass('top_hidden');

	},1000);
	
	setTimeout(function() {
		$('.navigation .socials p').removeClass('top_hidden');
	},1100);
	
	setTimeout(function() {
		$('.navigation .contacts a').removeClass('top_hidden');
	},1200);
	
	
	
}

function close_menu () {
	
	$('#menu_controller').removeClass('opened');
	$('#menu_controller').unbind('click');
	
	$('.site_header').removeClass('force_no_logo');


		$('.navigation .langs p').addClass('top_hidden');

	
	
	setTimeout(function() {
		$('.navigation .socials p').addClass('top_hidden');
	},100);
	
	setTimeout(function() {
		$('.navigation .contacts a').addClass('top_hidden');
	},200);
	
	remove_menu_items ();
	
	setTimeout(function() {
		$('.navigation').addClass('no_opacity');
	},450);
	
	setTimeout(function() {
		$('.navigation').addClass('hidden').removeClass('no_opacity').removeClass('active');
		$('#menu_controller').bind('click', open_menu);
		$('.navigation ._nanganinn_01 > img, .navigation ._nanganinn_02 > img, .navigation ._nanganinn_03 > img, .navigation .nanganinn > img, .navigation .guesthouse > img').removeClass('has_transition_600');
		$('.menu_container ul li a').removeClass('has_transition_600');
		$('.menu_container ul li').removeClass('no_opacity');

	},1400);
	

	
}

function remove_menu_items (){
$('.menu_container ul li a,.navigation ._nanganinn_01 > img, .navigation ._nanganinn_02 > img, .navigation ._nanganinn_03 > img, .navigation .nanganinn > img, .navigation .guesthouse > img').addClass('has_transition_600');
	
$('.navigation .langs p').addClass('top_hidden');

if(lang_open) {
	show_lang ();
}

if(social_open) {
	show_social ();
}

setTimeout(function() {
	$('.navigation .socials p').addClass('top_hidden');
},100);

setTimeout(function() {
	$('.navigation .contacts a').addClass('top_hidden');
},200);

	setTimeout(function(){
		$('.navigation ._nanganinn_01 > img').addClass('top_hidden')
	},0);
	
	setTimeout(function() {
		$('.navigation ._nanganinn_02 > img').addClass('top_hidden')
	},50);
	
	setTimeout(function() {
		$('.navigation ._nanganinn_03 > img').addClass('top_hidden')
		$('.navigation .nanganinn > img').addClass('top_hidden')
		$('.navigation .guesthouse > img').addClass('top_hidden')

	},100);
	
	
	$('.menu_container ul li').each(function(i){
		setTimeout(function(){
			$('.menu_container ul li:eq('+i+')').addClass('no_opacity');
			$('.menu_container ul li:eq('+i+') a').addClass('top_hidden');

		},10*i);
	})
}


function common_scroll() {
	if(is_specials){
		if(!v_specials && pageY > o_specials){
			v_specials = true;		
			
	    		$('.specials .headline hr').removeClass('no_width')
	    	
	    	setTimeout(function() {
	    		$('.specials .headline p').removeClass('top_hidden').removeClass('bottom_hidden')
	
	    	},600);
			
		}
		
		if(pageY > $specialsView ){
			for(i=0;i<specials_length;i++) {
				if(!specials_visible[i] && pageY >  specials_offset[i]){
		    		specials_visible[i] = true;
		    		show_specials(i);
		    	}	
			};
		}
	}
}


function set_lang(e) {
    e.preventDefault();
    current_url = window.location.href;
    if (current_url.indexOf("/" + lang + "/") == -1) {
        window.location = "/" + $(this).attr("rel") + "/home"
    } else {
        new_url = current_url.replace("/" + lang + "/", "/" + $(this).attr("rel") + "/");
        window.location = new_url
    }
}

function manage_links (e) {
	e.preventDefault();
	
	url = $(this).attr('href');
	
	
	 if($('.navigation').hasClass('active')){
			
		 remove_menu_items();
		 $('#menu_controller').removeClass('opened');
		// $('#menu_controller,.book_now').addClass('no_opacity');
		 if (current == "index" && playing) {
		 gainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 1);
		 }
			setTimeout(function(){
				window.location.href = url;
			},600)
			
			
			
	} else {
		
		$('#main').addClass('out');
		$('#main_veil').removeClass('no_width')
		
		$('.site_header').addClass('force_no_logo');
		 if (current == "index" && playing) {
			 gainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 1);
			 }

		setTimeout(function(){window.location.href = url;},1200);
	}	
}

function show_specials (i){
	$('.special_blocks .block:eq('+i+')').removeClass('top_translated').removeClass('top_translated_opacity');
	setTimeout(function(){
		$('.special_blocks .block:eq('+i+') .body .cover,.special_blocks .block:eq('+i+') .body .content ').removeClass('hidden');

	},500);
}

function open_gallery(){
	
	if(scrollType == "iScroll"){	
	myScroll.disable();
	}

	
	$('.header_back').addClass('no_height');
	
	if(window.innerWidth > window.innerHeight){
		
		$('.advice').addClass('no_opacity');
	}
	
	
	
	
	if($('.open_gallery:not(.gallery_menu)').length != 0){ // NEED TO FIND A BETTER SOLUTION!!!!
	
	if(scrollType == "iScroll"){	
		offset_delay = 0;
		$('#gallery_container').css('transform','translateX('+$('.open_gallery:not(.gallery_menu)').offset().left+'px) translateY('+$('.open_gallery:not(.gallery_menu)').offset().top+'px)');
	} else {
		offset_delay = 0;
		$('#gallery_container').css('transform','translateX('+$('.open_gallery:not(.gallery_menu)').offset().left+'px) translateY('+($('.open_gallery:not(.gallery_menu)').offset().top - pageY)+'px)');

	}
	
	} else {
		if(scrollType == "iScroll"){	
			offset_delay = 0;
			$('#gallery_container').css('transform','translateX('+$('.open_gallery').offset().left+'px) translateY('+$('.open_gallery').offset().top+'px)');
		} else {
			offset_delay = 0;
			$('#gallery_container').css('transform','translateX('+$('.open_gallery').offset().left+'px) translateY('+($('.open_gallery').offset().top - pageY)+'px)');

		}
	}
		$('#gallery_container').addClass('ready');
		gallery_component_load();
		
		
		setTimeout(function(){
			$('#gallery_container').css({
				'transform':'translateX(0) translateY(0)',
				'width':'100%',
				'height':'100%'
					});
			
			$('#gallery_container > .borders .top,#gallery_container > .borders .bottom').addClass('no_width');
			$('#gallery_container > .borders .left,#gallery_container > .borders .right').addClass('no_height')
		

		},50)
		

		
		
		setTimeout(function(){
			gallery_slider_setup();
			$('.gallery_slider').removeClass('hidden');
			if(mobileCheck){
				$('.site_header').addClass('no_back');
			}
		},1100 - offset_delay);
		
		setTimeout(function(){
			$('#gallery_container  .pic_big:first-child > img').imagesLoaded(function(){
				$('#gallery_container .top_veil').addClass('no_width');
		    	$('#gallery_container  .pic_big:first-child > img').removeClass('from_left');
		    	setTimeout(function() {
					$('.bottom_bar').removeClass('hidden');

				},450)
				
				setTimeout(function(){
					$('.bottom_bar').removeClass('top_hidden')
				},500);
				
				setTimeout(function(){
					$('.bottom_bar .l_arrow_wrapper').removeClass('top_hidden')
				},900)
				
				setTimeout(function(){
					$('.bottom_bar .index').removeClass('top_hidden')
				},950)
				
				setTimeout(function(){
					$('.bottom_bar .divider').removeClass('top_hidden')
				},1000)
				
				setTimeout(function(){
					$('.bottom_bar .total').removeClass('top_hidden')
				},1050)
				setTimeout(function(){
					$('.bottom_bar .r_arrow_wrapper').removeClass('top_hidden');
					$('.mobile_close_gallery').removeClass('hidden_by_scaling_full');

				},1100);
			});
		},1150 - offset_delay);
		
		setTimeout(function(){
			$('#gallery_container .left_elements').removeClass('hidden');
		},1250 - offset_delay)
		
		setTimeout(function(){
			$('#gallery_container .left_elements .open_gallery_line').removeClass('no_width')
			$('#gallery_container .left_elements .open_gallery').removeClass('top_hidden')
		},1380 - offset_delay)		
}


function close_gallery (){
	
		$('.site_header').removeClass('no_back');

	
	
	$('#gallery_container .left_elements .open_gallery_line').addClass('no_width')
	 $('#gallery_container .left_elements .open_gallery').addClass('top_hidden');
	 
		$('.mobile_close_gallery').addClass('hidden_by_scaling_full');

	
	 if(scrollType == "iScroll"){$('.open_gallery img,.open_gallery p').addClass('top_single');};
	 setTimeout(function(){
		 $('.bottom_bar').addClass('top_hidden');
	 },200);
	 
		$('#gallery_container .top_veil').removeClass('no_width');
    	$('#gallery_container  .pic_big.active > img').addClass('from_left').removeClass('active');
    	
    
    setTimeout(function(){
    	$('#gallery_container .gallery_slider,#gallery_container .bottom_bar,#gallery_container .left_elements').addClass('hidden');
    	
    	
    	if(windowWidth<1200){
    		$('#gallery_container').css({
        		'transform':'translateX('+$('.open_gallery').offset().left+'px) translateY('+$('.open_gallery').offset().top+'px)',

    			'width':'140px',
    			'height':'140px'
    				});
    	} else {
    		$('#gallery_container').css({
        		'transform':'translateX('+$('.open_gallery').offset().left+'px) translateY('+$('.open_gallery').offset().top+'px)',

    			'width':'186px',
    			'height':'186px'
    				});
    	}
    	
    	$('.header_back').removeClass('no_height');

		
    },1400)
    
    setTimeout(function(){
    	$('#gallery_container > .borders .top,#gallery_container > .borders .bottom').removeClass('no_width');
		$('#gallery_container > .borders .left,#gallery_container > .borders .right').removeClass('no_height');
		
    },1950)
    
    setTimeout(function(){

    	$('#gallery_container').removeClass('ready');
    	
    	$('.open_gallery img').removeClass('top_single');
    	setTimeout(function(){
        	$('.open_gallery p').removeClass('top_single');
    	},50);
    	if(scrollType == "iScroll"){	
    	myScroll.enable();
    	}
    },2500);    
}

lang_open = false;

function show_lang () {
	if(!lang_open){
		lang_open = true;
		$('.langs').addClass('active');
		$('ul.menu').addClass('mobile_shift');

		$('.lang_box ul li').each(function(i){
			setTimeout(function(){
				$('.lang_box ul li:eq('+i+')').removeClass('top_single');
			},100*i);
		
		
		})
	} else {
		lang_open = false;
		if(!social_open) {
		$('ul.menu').removeClass('mobile_shift');
		}

		$('.langs').removeClass('active');

		
			
				$('.lang_box ul li').addClass('top_single');
			
		
	}
}

social_open = false;

function show_social () {
	if(!social_open){
		social_open = true;
		$('.socials').addClass('active');
		$('ul.menu').addClass('mobile_shift');
		$('.social_box ul li').each(function(i){
			setTimeout(function(){
				$('.social_box ul li:eq('+i+')').removeClass('top_single');
			},100*i);
		
		
		})
	} else {
		social_open = false;
		if(!lang_open) {
		$('ul.menu').removeClass('mobile_shift');
		}

		$('.socials').removeClass('active');
		$('.social_box ul li').addClass('top_single');
			
		
	}
}


function mailer(){
	$scope = $(this).parent();
	
	email = $('#mail').val();
	name = $('#name').val();
	surname = $('#surname').val();
	arrival = $('#arrival').val();
	departure = $('#departure').val();
	guests = $('#people').val();
	rooms = $('#rooms').val();
	message = $('#message').val();
	
	if(current == 'offers' && action == 'detail'){
		page = $('#offers .big_title > div').text();
	} else {
		page = '';
	}
	controller = current;

	
	
	prv = $('#prv');
	
	
	
	var email_reg_exp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;

	validating = true;
	
	$('.required',$scope).each(function(){
		if($(this).val() == "" || $(this).val() == undefined || $(this).val() == null){
			validating = false;
		}
	})
	
	if(!validating){
		switch(lang){
    	case 'en':
    		alert('Please fill all  fields!');
    	break;
    	case 'it':
    		alert('Si prega di compilare tutti i campi, grazie!');
    	break;
    	case 'fr':
    		alert('S\'il vous plaît, remplir tous les champs, merci!');
    	break;

    	}
		return false;
	} 
	
	
	
	if (!email_reg_exp.test(email)) {
		switch(lang){
    	case 'en':
    		alert('Please provide a valid email address!');
    	break;
    	case 'it':
    		alert('Si prega di inserire una mail valida grazie!');
    		break;
    	case 'it':
    		alert('S\'il vous plaît, entrer une adresse email valide, merci!');
    	break;

    	}
		$("#email").focus();
		return false;
	}
	
	if(message == ''){
		switch(lang){
    	case 'en':
    		alert('Please insert a message!');
    	break;
    	case 'it':
    		alert('Si prega di inserire il messaggio!');
    	break;
    	case 'fr':
    		alert('S\'il vous plaît entrer dans le message!');
    	break;

    	}
		$("#message").focus();
		return false;
	}
	
	if(!prv.prop('checked')){
		switch(lang){
    	case 'en':
    		alert('You should accept the privacy policy in order to contact us!');
    	break;
    	case 'it':
    		alert('Si prega di accettare i termini della privacy policy per poterci contattare!');
    	break;
    	case 'fr':
    		alert('S\'il vous plaît, accepter les termes de la privacy policy pour nous contacter!');
    	break;

    	}
		return false;
	}
	
	vars = $.param({"page":page,"controller":controller,"name": name,"surname": surname,"rooms": rooms,"email": email,"message":message,"guests": guests,"arrival": arrival,"departure": departure});

	
	$.ajax({
	      type: "POST",
	      url: "/mailer",
	      data: vars,
	      dataType: "json",
	      success: function(msg)
	      {
	    	   if(msg.message == '0'){
			        	switch(lang){
			        	case 'en':
			        		alert('Thank you! Your request has been submitted and we will contact you as soon as we can!');
			        	break;
			        	case 'it':
			        		alert('Grazie! La Vostra richiesta è stata inviata, Vi risponderemo appena possibile!');
			        		break;
			        	case 'fr':
			        		alert('Merci! Votre demande a été envoyée et nous vous répondrons dès que possible!');
			        	break;
			        	}
		        	$('input[type!="submit"][type!="reset"]').each(function(){
						/*if($(this).attr('id')!='prv'){
							$(this).val('');
						};*/
					});
		        	
		        	$('#prv').prop('checked',false);
		        	
		        } else if(msg.message == '1'){
		        	switch(lang){
		        	case 'en':
		        		alert('We are sorry, but there was a problem while processing your request, please try again later, thank you!');
		        	break;
		        	case 'it':
		        		alert('Nous sommes désolés mais il ya eu une erreur dans le traitement de votre demande, s\'il vous plaît essayer de nouveau plus tard, merci');
		        		break;

		        	}
		        	
		        }
	      }
	    }); 
}














/********* GALLERY SETUP ****************/

function __pageX(e) {
    if (Modernizr.touchevents) {
        return e.originalEvent.touches[0].pageX
    } else {
        return e.pageX
    }
}

function __pageY(e) {
    if (Modernizr.touchevents) {
        return e.originalEvent.touches[0].pageY
    } else {
        return e.pageY
    }
}

var mouse_initialX;
var mouse_deltaX;
var directionX;
var sections_initial_position;
var page_bind = false;
var treshold_gallery = 100;
var treshold_specials = 100;
var $url;
var galleryReady = true;


function gallery_component_ready(){
	$('.r_arrow_wrapper ').bind('click',go_next);
	$('.l_arrow_wrapper ').bind('click',go_prev);
	
	  $("#gallery_container .gallery_slider").bind(_mousedown, start_gallery_drag);
	  
	 if(isMobile){
		
		$('body').on('doubletap',function(event){
			if(!$fullscreen){
				launchIntoFullscreen(document.getElementById('fullscreen_gallery'));
				$fullscreen = true;
			} else if($fullscreen){
				exitFullScreen();
				$fullscreen = false;
			}
			
		});
		
		
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
		 if(lang == "it"){
			 $('.rotate').text('ruota il telefono per visualizzare in modalità panorama, per visualizzare in fullscreen doppio tocco sulla foto, doppio tocco per uscire')
		 } else if(lang == "en"){
			 $('.rotate').text('rotate the device for landscape view, double-tap to go fullscreen, double-tap to exit')
		 }
		}
		 
	
		
		if(window.innerWidth > window.innerHeight){
			 $portrait = false;
			 $('.rotate').addClass('no_opacity');
			 $('#main_menu').addClass('landscape');
		} else {
			 $portrait = true;
				$('.rotate').removeClass('no_opacity');
				 $('#main_menu').removeClass('landscape');

		}
	 }
	 
	
	 $('.close_gallery,.mobile_close_gallery').bind('click',close_gallery);
	 
	 

}


function gallery_component_load(){
	load_others();
	$('.pic_big:not(:first-child)').addClass('no_transition').css('transform','translate3d('+$(window).width()+'px,0,0)');
	 $('#gallery_container  .pic_big').removeClass('active');
	 $('#gallery_container  .pic_big img').removeClass('from_left');
	 $('#gallery_container  .pic_big:first-child').addClass('active').css('transform','translate3d(0,0,0)');
	 
	 $('#gallery_container  .pic_big:first-child img').addClass('from_left');
	 
	  $(".pic_big.active").nextAll().css("transform","translate3d("+windowWidth+"px, 0, 0)");
	    $(".pic_big.active").prevAll().css("transform","translate3d("+(-windowWidth)+"px, 0, 0)");
	    $('#gallery_container .index_container').css('transform','translate3d(0,0,0)');

}

function gallery_resize(){
	
}

/*$(window).resize(function(){
	gallery_slider_setup();
	full_slider_setup();
	if(isMobile){
	if(window.innerWidth > window.innerHeight){
		 $portrait = false;
		 $('.rotate').addClass('no_opacity');
		 $('#main_menu').addClass('landscape');
	} else {
		 $portrait = true;
			$('.rotate').removeClass('no_opacity');
			 $('#main_menu').removeClass('landscape');

	}
	}
});*/



function gallery_scroll(){
	

}

function define_position(){
	
}

img_loaded = 0;

function load_others(){
	img_loaded++;
	if( $('.gallery_slider .pic_big:eq('+img_loaded+') img').is("[data-src]")){
		$('.gallery_slider .pic_big:eq('+img_loaded+') img').attr('src',$('.gallery_slider .pic_big:eq('+img_loaded+') img').attr('data-src')).removeAttr('data-src');
		$('.gallery_slider .pic_big:eq('+img_loaded+') img').imagesLoaded(function() {
			$('.gallery_slider .pic_big:eq('+img_loaded+') .loader').remove();
			gallery_slider_setup();
			load_others();
		});
		
	} else if($('.gallery_slider .pic_big:eq('+img_loaded+') img').is("[src]")){
		gallery_slider_setup();
		load_others();
	}
	
	
}

function gallery_slider_setup() {
	viewport_height = $(window).height();
    viewport_width = $(window).width();
    
    if(mobileCheck && typeof screen) {
    	viewport_height = screen.height;
        viewport_width = screen.width;
        
        if(ios_device){
        	if($(window).height() < $(window).width()) {
        		viewport_width = screen.height;
                viewport_height = screen.width;
        	} else if($(window).height() > $(window).width()) {
        		viewport_height = screen.height;
                viewport_width = screen.width;
        	} 
        }
    }
    
    screen_ratio = viewport_width / viewport_height;
    pic_ratio = 1920 / 1080;

    $('.gallery_slider .pic_big').height(viewport_height);

    if (pic_ratio > screen_ratio) {
        $('.gallery_slider .pic_big > img').css({
            height: viewport_height,
            width: Math.round(viewport_height * pic_ratio),
            marginLeft: Math.round(-(viewport_height * pic_ratio - viewport_width) / 2),
            marginTop: 0
        })
    } else {
        $(".gallery_slider .pic_big > img").css({
            width: viewport_width,
            height: Math.round(viewport_width / pic_ratio),
            marginTop: Math.round(-(viewport_width / pic_ratio - viewport_height) / 2),
            marginLeft: 0
        })
    }
    
    $('.pic_big').addClass('no_transition');
    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
    $(".pic_big.active").nextAll().css("transform","translate3d("+windowWidth+"px, 0, 0)");
    $(".pic_big.active").prevAll().css("transform","translate3d("+(-windowWidth)+"px, 0, 0)");
};



function start_gallery_drag(e) {
    e.preventDefault();
    if(galleryReady){
		galleryReady = false;
    
    $('.pic_big').addClass('no_transition');
    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
    $(".pic_big.active").nextAll().css("transform","translate3d("+windowWidth+"px, 0, 0)");
    $(".pic_big.active").prevAll().css("transform","translate3d("+(-windowWidth)+"px, 0, 0)");

    $(window).bind(_mouseup, stop_gallery_drag);
    mouse_deltaX = 0;
    $("#gallery_container .gallery_slider").bind(_mousemove, move_gallery);
    mouse_initialX = __pageX(e);
   
    sections_initial_position = 0;
    return false;

    }
    
}

function stop_gallery_drag(e) {
    e.preventDefault();
    $(window).unbind(_mouseup);
    $('.pic_big').removeClass('no_transition');
    $("#gallery_container .gallery_slider").unbind(_mousemove);
    $("#gallery_container .gallery_slider").stop();
    if (mouse_deltaX > treshold_gallery && directionX == "left") {
        if ($("#gallery_container .pic_big.active").next().length != 0) {
            slide_next();
        } else {
            $("#gallery_container .pic_big.active").css("transform","translate3d(0, 0, 0)");
            setTimeout(function(){
            	
        		galleryReady = true;
            },500)

        }
    }
    if (mouse_deltaX > treshold_gallery && directionX == "right") {
        if ($("#gallery_container .pic_big.active").prev().length != 0) {
           slide_prev();
        } else {
            $("#gallery_container .pic_big.active").css("transform","translate3d(0, 0, 0)");
            setTimeout(function(){
            	
        		galleryReady = true;
            },500)

        }
    } else if (mouse_deltaX < treshold_gallery) {
    	
        $("#gallery_container .pic_big.active").css("transform","translate3d(0, 0, 0)");
        $("#gallery_container .pic_big.active").next().css("transform","translate3d("+windowWidth+"px, 0, 0)");
        $("#gallery_container .pic_big.active").prev().css("transform","translate3d("+(-windowWidth)+"px, 0, 0)");
      
        setTimeout(function(){
        	
    		galleryReady = true;
        },500)


    }
    
  

}

function move_gallery(e) {
    e.preventDefault();
    if (__pageX(e) > mouse_initialX) {
        mouse_deltaX = __pageX(e) - mouse_initialX;
        directionX = "right";
    } else if (__pageX(e) < mouse_initialX) {
        directionX = "left";
        mouse_deltaX = mouse_initialX - __pageX(e)

    }
    if (directionX == "right") {
        sections_current_position = sections_initial_position + mouse_deltaX
        $("#gallery_container .pic_big.active").prev().css("transform","translate3d("+(-windowWidth+mouse_deltaX/1.5) + "px, 0, 0)");
        $("#gallery_container .pic_big.active").next().css("transform","translate3d("+(windowWidth+mouse_deltaX/1.5) + "px, 0, 0)");
     


    } else {
        sections_current_position = sections_initial_position - mouse_deltaX
        $("#gallery_container .pic_big.active").next().css("transform","translate3d("+(windowWidth-mouse_deltaX/1.5) + "px, 0, 0)");
        $("#gallery_container .pic_big.active").prev().css("transform","translate3d("+(-windowWidth-mouse_deltaX/1.5) + "px, 0, 0)");
      



    }
    $("#gallery_container .pic_big.active").css("transform","translate3d("+sections_current_position/3 + "px, 0, 0)");


    return false;
}

function slide_next() {
	
		if ($(".gallery_slider .pic_big.active").next().length != 0) {
			galleryReady = false;
	        $(".gallery_slider .pic_big.active").css("transform","translate3d("+(-windowWidth/3)+"px, 0, 0)").removeClass("active").next().addClass("active");
	        $("#gallery_container .pic_big.active").css("transform","translate3d(0, 0, 0)");
	        if(windowWidth > 1200){
	        $('.counter .index_container').css('transform','translateY('+(-(55*$(".gallery_slider .pic_big.active").index()))+'px');
	        } else {
		        $('.counter .index_container').css('transform','translateY('+(-(32*$(".gallery_slider .pic_big.active").index()))+'px');

	        }
	        setTimeout(function(){
	        	
	    		galleryReady = true;
	    },500)
		}
	
  
}

function slide_prev() {
	
		if ($(".gallery_slider .pic_big.active").prev().length != 0) {
			galleryReady = false;
	    	 $(".gallery_slider .pic_big.active").css("transform","translate3d("+windowWidth/3+"px, 0, 0)").removeClass("active").prev().addClass("active");
	         $("#gallery_container .pic_big.active").css("transform","translate3d(0, 0, 0)");
	         if(windowWidth > 1200){
	 	        $('.counter .index_container').css('transform','translateY('+(-(55*$(".gallery_slider .pic_big.active").index()))+'px');
	 	        } else {
	 		        $('.counter .index_container').css('transform','translateY('+(-(32*$(".gallery_slider .pic_big.active").index()))+'px');

	 	        }		        setTimeout(function(){
		        	
		    		galleryReady = true;
		    },500)
	       
	    }
   
	 
}

function go_next(){
	if(galleryReady){	
	$('.pic_big').addClass('no_transition');
	    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
	    $(".pic_big.active").nextAll().css("transform","translate3d("+windowWidth+"px, 0, 0)");
	    $(".pic_big.active").prevAll().css("transform","translate3d("+(-windowWidth)+"px, 0, 0)");
	    setTimeout(function(){
	    	$('.pic_big').removeClass('no_transition');
	    	  slide_next();
	    },20);
	}
}

function go_prev() {
	if(galleryReady){	
	$('.pic_big').addClass('no_transition');
    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
    $(".pic_big.active").nextAll().css("transform","translate3d("+windowWidth+"px, 0, 0)");
    $(".pic_big.active").prevAll().css("transform","translate3d("+(-windowWidth)+"px, 0, 0)");
    setTimeout(function(){
    $('.pic_big').removeClass('no_transition');
    slide_prev();
    },20);
	}
}


(function($){

	  $.event.special.doubletap = {
	    bindType: 'touchend',
	    delegateType: 'touchend',

	    handle: function(event) {
	      var handleObj   = event.handleObj,
	          targetData  = jQuery.data(event.target),
	          now         = new Date().getTime(),
	          delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
	          delay       = delay == null ? 300 : delay;

	      if (delta < delay && delta > 30) {
	        targetData.lastTouch = null;
	        event.type = handleObj.origType;
	        ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
	          event[property] = event.originalEvent.changedTouches[0][property];
	        })

	        // let jQuery handle the triggering of "doubletap" event handlers
	        handleObj.handler.apply(this, arguments);
	      } else {
	        targetData.lastTouch = now;
	      }
	    }
	  };

	})(jQuery);






var _mousemove;
var _click;
var _mouseenter;
var _mouseleve;
var _mousedown;
var _mouseup;

if (Modernizr.touchevents) {
	
    _mousemove = "touchmove";
    _click = "touchend";
    _mousedown = "touchstart";
    _mouseup = "touchend";
    _mouseenter = "mouseenter";
    _mouseleave = "mouseleave"
} else {
    _mousemove = "mousemove";
    _click = "click";
    _mousedown = "mousedown";
    _mouseup = "mouseup";
    _mouseenter = "mouseenter";
    _mouseleave = "mouseleave"
}

var $fullscreen = false;

   function launchIntoFullscreen(element) {
   	  if(element.requestFullscreen) {
   	    element.requestFullscreen();
   	  } else if(element.mozRequestFullScreen) {
   	    element.mozRequestFullScreen();
   	  } else if(element.webkitRequestFullscreen) {
   	    element.webkitRequestFullscreen();
   	  } else if(element.msRequestFullscreen) {
   	    element.msRequestFullscreen();
   	  }
   	}


   function exitFullScreen()
   {
       if (document.exitFullscreen)
           document.exitFullscreen();
       else if (document.msExitFullscreen)
           document.msExitFullscreen();
       else if (document.mozCancelFullScreen)
           document.mozCancelFullScreen();
       else if (document.webkitExitFullscreen)
           document.webkitExitFullscreen();
   }
   
   
   
   
   
   
   
   
   
   
   
   
 //dates //

   var mesi = new Array();
      mesi[0] = "Gennaio";
      mesi[1] = "Febbraio";
      mesi[2] = "Marzo";
      mesi[3] = "Aprile";
      mesi[4] = "Maggio";
      mesi[5] = "Giugno";
      mesi[6] = "Luglio";
      mesi[7] = "Agosto";
      mesi[8] = "Settembre";
      mesi[9] = "Ottobre";
      mesi[10] = "Novembre";
      mesi[11] = "Dicembre";
      
      
      
   var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      
      var mois = new Array();
      mois[0] = "Janvier";
      mois[1] = "Février";
      mois[2] = "Mars";
      mois[3] = "Avril";
      mois[4] = "Mai";
      mois[5] = "Juin";
      mois[6] = "Juillet";
      mois[7] = "Août";
      mois[8] = "Septembre";
      mois[9] = "Octobre";
      mois[10] = "Novembre";
      mois[11] = "Décembre";
      
      var monate = new Array();
      monate[0] = "Januar";
      monate[1] = "Februar";
      monate[2] = "März";
      monate[3] = "April";
      monate[4] = "Mai";
      monate[5] = "Juni";
      monate[6] = "Juli";
      monate[7] = "August";
      monate[8] = "September";
      monate[9] = "Oktober";
      monate[10] = "November";
      monate[11] = "Dezember";
      
   var giorni = new Array();
     giorni[1] = "Lun";
     giorni[2] = "Mar";
     giorni[3] = "Mer";
     giorni[4] = "Gio";
     giorni[5] = "Ven";
     giorni[6] = "Sab";
     giorni[0] = "Dom";
     
     
     var jours = new Array();
     jours[1] = "Lun";
     jours[2] = "Mar";
     jours[3] = "Mer";
     jours[4] = "Jeu";
     jours[5] = "Ven";
     jours[6] = "Sam";
     jours[0] = "Dim";
     
     var tage = new Array();
     tage[1] = "Mo";
     tage[2] = "Di";
     tage[3] = "Mi";
     tage[4] = "Do";
     tage[5] = "Fr";
     tage[6] = "Sa";
     tage[0] = "So";


      function getMonthNames(){
      	if(lang=="it"){
      		return mesi;
      	} else 	if(lang=="fr"){
      		return mois;
      	}	if(lang=="de"){
      		return monate;
      	} else {
      		return month
      	}
      }

      function getDowNames(){
      	if(lang=="it"){
      		return giorni;
      	} else 	if(lang=="fr"){
      		return jours;
      	} else 	if(lang=="de"){
      		return tage;
      	} else {
      		return null
      	}
      }
      
      function getDowOffset(){
   	 	if(lang=="it"){
   	   		return 1;
   	   	} else 	if(lang=="fr"){
   	   		return 1;
   	   	} else 	if(lang=="de"){
   	   		return 1;
   	   	} else {
   	   		return 0
   	   	}
     }
