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

	$(".videolink a").colorbox({ innerWidth:'1280px', innerHeight:'720px', iframe:true });

	loadFlickrSet("72157624826648990", "photolist", 30);

});

// <------------ END document ready -----------------------------


var loadFlickrSet = function(setId, target, limit){
	var per_page = "";
	if (limit != undefined){
		per_page = "&per_page="+limit;
	}
	var apiKey = "3d8a7e8f34196d45f383edd8d7a31c1a";
	var request = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+apiKey+'&photoset_id='+setId+'&extras=url_l%2C+url_sq&format=json&jsoncallback=?'+per_page;
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
	});
}