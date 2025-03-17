"use strict";
////////////////////////////////////////////////////////
///////////////dropdown//////////////
////////////////////////////////////////////////////////
$(function(){
    $(".dropdown").hover(            
            function() {
                $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");                
            },
            function() {
                $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");                
            });
    });
    

////////////////////////////////////////////////////////
///////////////on scroll animation effects//////////////
////////////////////////////////////////////////////////


new WOW().init();

////////////////////////////////////////////////////////
///////////////Smooth scroll for top navbar/////////////
////////////////////////////////////////////////////////


smoothScroll.init({
			speed: 1000,
			easing: 'easeInOutCubic',
			offset: 85,
			updateURL: false,
			callbackBefore: function ( toggle, anchor ) {},
			callbackAfter: function ( toggle, anchor ) {}
});

////////////////////////////////////////////////////////
///////////////Smooth scroll for top navbar/////////////
////////////////////////////////////////////////////////
// On document ready:
jQuery(document).ready(function() {
//ISOTOPE FUNCTION - FILTER PORTFOLIO FUNCTION
	var $portfolio;
	var $portfolio_selectors;
	$(window).load(function(){
		$portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : 'li',
			layoutMode : 'fitRows'
		});
		$portfolio_selectors = $('.portfolio-filter >li>a');
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});
});
////////////////////////////////////////////////////////
///////////////Parallax effects/////////////////////////
////////////////////////////////////////////////////////


$('div.bgParallax').each(function(){
	var $obj = $(this);

	$(window).scroll(function() {
		var yPos = -($(window).scrollTop() / $obj.data('speed')); 

		var bgpos = '50% '+ yPos + 'px';

		$obj.css('background-position', bgpos );
 
	}); 
});


////////////////////////////////////////////////////////
///////////////Image hovers effects and captions///////
////////////////////////////////////////////////////////


$(window).load(function(){
  $('.hcaption').hcaptions({effect: "fade"});
});


////////////////////////////////////////////////////////
///////////////prettyPhoto///////////////////////////
////////////////////////////////////////////////////////

$("a.preview").prettyPhoto({
		social_tools: false
	});



////////////////////////////////////////////////////////
///////////////main slider ///////////////////////////
////////////////////////////////////////////////////////

	
$('.carousel').carousel({
        interval: 3000
});						


////////////////////////////////////////////////////////
///////////////back to top ///////////////////////////
////////////////////////////////////////////////////////


jQuery(document).ready(function() {
				var offset = 220;
				var duration = 500;
				jQuery(window).scroll(function() {
					if (jQuery(this).scrollTop() > offset) {
						jQuery('.back-to-top').fadeIn(duration);
					} else {
						jQuery('.back-to-top').fadeOut(duration);
					}
				});
				
				jQuery('.back-to-top').click(function(event) {
					event.preventDefault();
					jQuery('html, body').animate({scrollTop: 0}, duration);
					return false;
			})
});

////////////////////////////////////////////////////////
///////////////gallery owl-carousel ///////////////////////////
////////////////////////////////////////////////////////

// $(document).ready(function() {
 
//   $(".slider-grid").owlCarousel({
//       singleItem:true,
// 	  autoPlay : 5000
//   });
// });

////////////////////////////////////////////////////////
///////////////Animated Number ///////////////////////////
////////////////////////////////////////////////////////

    // $('#numbers').appear(function () {
    //     $('#number1').animateNumber({number: 1258}, 1500);
    //     $('#number2').animateNumber({number: 5856}, 1500);
    //     $('#number3').animateNumber({number: 149}, 1500);
	// 	$('#number4').animateNumber({number: 6399}, 1500);
    // }, {accX: 0, accY: -200});
	
////////////////////////////////////////////////////////
///////////////contact form ///////////////////////////
////////////////////////////////////////////////////////

$("#contact-form").validate({
         ignore: ":hidden",
         rules: {
             name:{
                minlength: 2,
                maxlength: 50,
                required: true
            },
            email:{
                minlength: 2,
                required: true
            },
			
			message:{
                minlength: 3,
                maxlength: 300,
                required: true
            }
         },
		 submitHandler: function (form) {
            
             $.ajax({
                 type: "POST",
                 url: "sendemail.php",
                 data: $("#contact-form").serialize(),
					error:function(){
						//alert('asdasdasd');
						console.log('Some thing went wrong! :D');
						},
                 		success:function(data) {
						//alert(data);
						if(data=='fail'){
							$('#errormessage').html("<label for='captcha_code' class='error'>Security Code was incorrect.</label>");
						}else{
							$('.reg-form').html("<div id='message'></div>");
							 $('#message').html("<h2> Merci pour votre message!</h2>")
								 .hide()
								 .fadeIn(1500, function (data) {
								 $('#message').append("");
							 });
						}
                     
                 }
             });
             return false; // required to block normal submit since you used ajax
         }
     });
	
////////////////////////////////////////////////////////
///////////////preloader ///////////////////////////
////////////////////////////////////////////////////////

$(window).load(function() { // makes sure the whole site is loaded
			$('#status').fadeOut(); // will first fade out the loading animation
			$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
			$('body').delay(350).css({'overflow':'visible'});
	});
	
////////////////////////////////////////////////////////
///////////////// google map start ///////////////////////////
////////////////////////////////////////////////////////	


$(window).load(init);

var map;

function init() {
    var mymap = L.map('contact_map').setView([50.746230, 3.157500], 16);
    var marker = L.marker([50.746230, 3.157500]).addTo(mymap);
    marker.bindPopup("<b>SPA Addict</b><br>104 rue de Tourcoing<br>59960 Neuville-en-Ferrain.").openPopup();
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic3BhYWRkaWN0IiwiYSI6ImNrdThpMTQzMTQ1Y2kzMHA4YWFtdGYwZWcifQ.BRl7HC_JaXQ1EAoIKqSaeg'
}).addTo(mymap);
	
}