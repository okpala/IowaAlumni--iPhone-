var WebView = require('ui/common/WebView');

function SocialMediaIcons(){
	return "";
}

SocialMediaIcons.prototype.facebook = function(iconTop, iconLeft,tracker) {
	var facebookimage = Ti.UI.createImageView({
	  image:    'facebook.png',
	  top:    iconTop,
	  left: iconLeft
	});
	
	facebookimage.addEventListener('click', function(e) {
		new WebView ('https://www.facebook.com/UIowaAlumni');
		tracker.trackEvent({
				category: "Social Media",
				action: "click",
				label: "Facebook",
				value: 1
			});
	}); 
	
	
	return facebookimage;
};



SocialMediaIcons.prototype.twitter = function(iconTop, iconLeft,tracker) {
	var twitterimage = Ti.UI.createImageView({
	  image:    'twitter.png',
	  top:    iconTop,
	  left: iconLeft
	});

	
	twitterimage.addEventListener('click', function(e) {
		new WebView ('https://twitter.com/uiowaAlumni');
		tracker.trackEvent({
				category: "Social Media",
				action: "click",
				label: "Twitter",
				value: 1
			});
	}); 
	
	
	
	return twitterimage;
};

SocialMediaIcons.prototype.foursquare = function(iconTop, iconLeft,tracker) {
	var foursquareimage = Ti.UI.createImageView({
	  image:    'fourquare.png',
	  top:   iconTop,
	  left: iconLeft
	});
	
	foursquareimage.addEventListener('click', function(e) {
		new WebView ('https://foursquare.com/uiowaalumni');
		tracker.trackEvent({
				category: "Social Media",
				action: "click",
				label: "Four Square",
				value: 1
			});
	}); 

	return foursquareimage;
};

SocialMediaIcons.prototype.linkedIn = function(iconTop, iconLeft,tracker) {
	var linkedInimage = Ti.UI.createImageView({
	  image:    'linkedin.png',
	  top:    iconTop,
	  left: iconLeft
	});
	
	
	linkedInimage.addEventListener('click', function(e) {
		new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
		tracker.trackEvent({
				category: "Social Media",
				action: "click",
				label: "Linked In",
				value: 1
			});
	}); 
	
	
	
	return linkedInimage;
};



SocialMediaIcons.prototype.pinterest = function(iconTop, iconLeft,tracker) {
	var pinterestimage = Ti.UI.createImageView({
	  image:    'pinterest.png',
	   top:   iconTop,
	  left: iconLeft
	});

	pinterestimage.addEventListener('click', function(e) {
		new WebView ('https://www.pinterest.com/uiowaalumni');
		tracker.trackEvent({
				category: "Social Media",
				action: "click",
				label: "Pinterest",
				value: 1
			});
	}); 
	
	
	return pinterestimage;
};

SocialMediaIcons.prototype.instagram = function(iconTop, iconLeft,tracker) {
	var instagramimage = Ti.UI.createImageView({
	  image:    'instagram.png',
	  top:    iconTop,
	  left: iconLeft
	});
	
	instagramimage.addEventListener('click', function(e) {
		new WebView ('http://instagram.com/uiowaalumni');
		tracker.trackEvent({
				category: "Social Media",
				action: "click",
				label: "Instagram",
				value: 1
			});
	}); 
	
	return instagramimage;
};

module.exports = SocialMediaIcons;
