/*jslint browser:true */
"use strict()";


window.onscroll = function() {scrollFunction();};
function scrollFunction() {
	if(window.innerWidth >= 768){
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
		if  (!document.getElementById("navbar-top").className.match(/(?:^|\s)navbar-default(?!\S)/)) {
			document.getElementById("navbar-top").className += " navbar-default";
			TweenMax.to(".navbar-default", 0.5, {opacity: 1, delay: 0.1});
		}
    }
     else {
     	if  (document.getElementById("navbar-top").className.match(/(?:^|\s)navbar-default(?!\S)/)) {
			TweenMax.to(".navbar-default", 0.5, {opacity: 0, delay: 0.1});
			document.getElementById("navbar-top").className = document.getElementById("navbar-top").className.replace( /(?:^|\s)navbar-default(?!\S)/g , '' );
			
		}
     	
    	}
	}
	else{
		document.getElementById("navbar-top").className += " navbar-default";
		TweenMax.to(".navbar-default", 0.5, {opacity: 1, delay: 0.1});
	}
	
}