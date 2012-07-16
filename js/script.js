/* Author:

*/

$(document).ready(function() {

	// Let the headers take full column-width
	$('h2').textfill({ maxFontPixels: 60 });
	
	// Define function to resize logo if viewport becomes to small
	$(window).resize(function() {
		var viewportWidth = $(window).width();
		var headerPadding = parseInt($('header').css('padding-left').replace("px", ""));
		var logoWidth = $('#logo').width();
		
		if ( (viewportWidth < 470+(headerPadding*2)) && (logoWidth <= 470) ) {
			var newWidth = viewportWidth-(headerPadding*2)
			$('#logo').width(newWidth);
			$('#logo').height(72/470*newWidth);
		} else if (logoWidth < 470){
			$('#logo').width(470);
			$('#logo').height(72);
		}
	});
	
	// Trigger resize function to make sure the logo fits
	$(window).resize();
	
	loadGigs("upcomming-gigs");
	loadGigs("past-gigs", "2000-01-01,"+new Date().format("yyyy-mm-dd"));
	
});


var loadGigs = function(target, range){
	var date = "";
	if (range != undefined){
		date += "&date="+range;
	}
	$.getJSON('https://api.bandsintown.com/artists/About%20Today/events.json?app_id=abouttodaywebsite&api_version=2.0&artist_id=fbid_125753003016&callback=?'+date,
		function(gigs) {
			var html = "<ul>";
			for (var i in gigs){
				var gig;
				if (range == undefined){
					gig = gigs[i];
				} else {
					gig = gigs[gigs.length-i-1];
				}
				var datetime = gig.datetime.split("T");
				var date = datetime[0].split("-");
				var time = datetime[1].split(":");
				datetime = new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2], 0);
				date = dateFormat(datetime, "dddd mmmm dS, HH:MM");
				html += "<li>"+
					date+"<br>"+
					gig.venue.name+"<br>"+
					gig.venue.city+
					"</li>";
				
			}
			html += "</ul>";
			$('#'+target).html(html);		
		});
}