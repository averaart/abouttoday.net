/* Author:

*/

$(document).ready(function() {

	$('#email').html(function(){
		var e = "band";
		var a = "@";
		var d = "abouttoday";
		var c = ".net";
		var h = 'mailto:' + e + a + d + c;
		$(this).parent('a').attr('href', h);
		return e + a + d + c;
	});
	
	// Define function to resize logo if viewport becomes to small
	
	$(window).resize(function() {
//		var origHeight = parseInt(jss('h1#logo').get()['height'].replace("px", ""));
//		var origWidth = parseInt(jss('h1#logo').get()['width'].replace("px", ""));
		var origHeight = 58;
		var origWidth = 376;
		var viewportWidth = $(window).width();
		var headerPadding = parseInt($('header').css('padding-left').replace("px", ""));
		var logoWidth = $('#logo').width();
		
		if ( (viewportWidth < origWidth+(headerPadding*2)) && (logoWidth <= origWidth) ) {
			var newWidth = viewportWidth-(headerPadding*2)
			$('#logo').width(newWidth);
			$('#logo').height(origHeight/origWidth*newWidth);
		} else if (logoWidth < origWidth){
			$('#logo').width(origWidth);
			$('#logo').height(origHeight);
		}
		
		if (viewportWidth >= 1030){
			$('body').removeClass('medium').removeClass('small');
		} else if (viewportWidth >= 720){
			$('body').removeClass('small').addClass('medium');
		} else {
			$('body').removeClass('medium').addClass('small');		
		}
	});
	
	// Trigger resize function to make sure the logo fits
	$(window).resize();
	
	$("#videolink a").colorbox({ innerWidth:'1280px', innerHeight:'720px', iframe:true });
	
	loadGigs("upcoming-gigs");
	var now = new Date();
	var today = now.format("yyyy-mm-dd");
	var yearAgo = new Date(now.getTime() - 365*24*60*60*1000).format("yyyy-mm-dd");
	loadGigs("past-gigs", yearAgo+","+today);
	loadFlickrSet("72157624826648990", "photolist", 30);
	
	
	
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
					"<a href='"+gig.facebook_rsvp_url+"' title='"+gig.title+"'>"+date+"</a><br>"+
					gig.venue.name+"<br>"+
					gig.venue.city+
					"</li>";
				
			}
			html += "</ul>";
			$('#'+target).html(html);		
		});
}

var loadFlickrSet = function(setId, target, limit){
	var per_page = "";
	if (limit != undefined){
		per_page = "&per_page="+limit;
	}
	var apiKey = "3d8a7e8f34196d45f383edd8d7a31c1a";
	var request = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+apiKey+'&photoset_id='+setId+'&extras=url_l%2C+url_sq&format=json&jsoncallback=?'+per_page;
	console.log(request);
	$.getJSON(request, function(response) {
		var photos = response.photoset.photo;
		var photo;
		var html = "";
		for (var i in photos){
			photo = photos[i];
			html += "<a href='"+photo.url_l+"' title='"+photo.title+"'>"+
					"<img src='"+photo.url_sq+"' />"+
					"</a>";
		}
		$("#"+target).html(html);
		$("#"+target+" a").colorbox({	transition: 'elastic',
										speed: 500,
										rel:target,
										maxWidth:'100%',
										maxHeight:'100%',
										slideshow: true,
										slideshowSpeed: 5000});
			// Let the headers take full column-width
	

	});			
}