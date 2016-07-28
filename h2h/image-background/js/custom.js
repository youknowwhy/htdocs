jQuery(function () {
	"use strict";
    
    /*global jQuery, $*/
	jQuery(document).ready(function(){
		
		
		// Parallax 
		$('.header-area').parallax("50%", 0.1);
		$('.about-more-area').parallax("50%", 0.1);
		$('.services-area').parallax("50%", 0.1);
		$('.cta-area').parallax("50%", 0.1);
		
		// Responsive Video
		$(".videowraper").fitVids();
		
		// Magnific Popup 
		jQuery('.image-popup').magnificPopup({ 
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-fade'
			// other options
		});
		
		// OWL Carousel
		$("#owl-example").owlCarousel({
 
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			items : 2,
			itemsDesktop : [1199,2],
			itemsDesktopSmall : [979,2]
 
		});
		
		
	});
	
	
	
}());