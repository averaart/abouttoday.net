/* Author:

*/



$(document).ready(function() {
	$('h2').textfill({ maxFontPixels: 60 });
	
	$(window).resize(function() {
		var viewportWidth = $(window).width();
		var headerPadding = parseInt($('header').css('padding-left').replace("px", ""));
		var logoWidth = $('#logo').width();
		
		if (
			(viewportWidth < 470+(headerPadding*2))
			&&
			(logoWidth <= 470)
			){
				var newWidth = viewportWidth-(headerPadding*2)
				$('#logo').width(newWidth);
				$('#logo').height(72/470*newWidth);
			} else if (logoWidth < 470){
				$('#logo').width(470);
				$('#logo').height(72);
			}
		
		
		
// 		if	(
// 				(viewportWidth < 470+(headerPadding*2))
// 				&&
// 				(logoWidth == 470)
// 			){
// 			console.log("kleiner");
// 		console.log(viewportWidth);
// 		console.log(headerPadding);
// 		console.log(logoWidth);
// 			$('#logo').width(220);
// 		} else if(
// 				(viewportWidth > 470+(headerPadding*2))
// 				&&
// 				(logoWidth == 220)
// 			){
// 			console.log("groter");
// 		console.log(viewportWidth);
// 		console.log(headerPadding);
// 		console.log(logoWidth);
// 			$('#logo').width(470);
// 		}
	});
	
	$(window).resize();
});

