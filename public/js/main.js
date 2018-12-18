/*jslint browser:true */
"use strict()";


window.onscroll = function() {scrollFunction();};
function scrollFunction() {
	if(window.innerWidth >= 768){
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			TweenMax.to(".navbar-default", 0.5, {opacity: 1, delay: 0.1});
    }
     else {
			TweenMax.to(".navbar-default", 0.5, {opacity: 0, delay: 0.1});
			
		}
	}	
}

$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});