$(document).ready(function(){ 

	$("#contactArea").css('height', '0px');

	$("a.contact").toggle( 
				function () { 
 					$("#contactArea").animate({height: "225px"}, {queue:false, duration: 1700, easing: 'easeOutBounce'}) 
                }, 
                function () { 
					$("#contactArea").animate({height: "0px"}, {queue:false, duration: 1700, easing: 'easeOutBounce'})  
				} 
		); 
        
}); 