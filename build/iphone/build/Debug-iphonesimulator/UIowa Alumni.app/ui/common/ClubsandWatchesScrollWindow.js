var NavigateWindow = require('ui/common/NavigateWindow');
var ClubsWindow = require('ui/common/ClubsWindow');
var  GameWatchWindow = require('ui/common/GameWatchWindow');

function  ClubsandWatchesScrollWindow (clubData, clubInfoData, tracker, gameWatchView) {
	
	var perviousPage = 0;
	var masterView = Ti.UI.createView({backgroundColor:"#fff"});
	var scrollBoxHeight = 60;
	var windowtitle = clubData[0].state;
	
	var top = 0;

	var rightArrowImage = Ti.UI.createImageView({
			image: 'slide_right.png',
			bottom: 3,
			right: 5,
			width: 54,
			height: 54,
			zIndex: 5
		});
		
		var leftArrowImage = Ti.UI.createImageView({
			image: 'slide_left.png',
			bottom: 3,
			left: 5,
			width: 54,
			height: 54,
			zIndex: 5
		});
		
	var title = ["Iowa Clubs", "Game Watch Locations"];
	var imageNames = ["dots2_1.png", "dots2_2.png"] ;
	var imageViewArray = [];
	for(var i = 0; i < 2 ; i++){
		var View = Titanium.UI.createView({});
		var titleLabel = Ti.UI.createLabel({
				text: title[i],
				font:{fontFamily:'HelveticaNeue-Light',fontSize:20,fontWeight:'bold'},
				top: 15
		});
		
		var dotsImage = Ti.UI.createImageView({
			image: imageNames[i],
			top: 45,
			//width: 40,
			height: 10,
		});
		View.add(titleLabel);
		View.add(dotsImage);
		imageViewArray[i] = View;
	}
	
	var scrollingView = Titanium.UI.createScrollableView({
		width: Ti.UI.FILL,
		height: scrollBoxHeight,
		views: imageViewArray,
		bottom: 0,
	  	backgroundColor: '#ccc',
	  	contentWidth: Ti.UI.FILL,
	  	contentHeight: 100
	});
	masterView.add(rightArrowImage);
	masterView.add(leftArrowImage);
	rightArrowImage.hide();
	leftArrowImage.hide();
	var clubsView = new ClubsWindow(clubData, clubInfoData,  tracker, top);
	
	masterView.add(clubsView);
	masterView.add(scrollingView);

	
	var viewArray = [masterView, clubsView, gameWatchView];
	scrollingView.addEventListener('scrollend', function(e){
		
		 if(e.currentPage == 0 && perviousPage == 1){
		 	viewArray[0].remove(viewArray[2]);
		 	perviousPage = 0;
		 }
		 else if(e.currentPage == 1 && perviousPage == 0){
		 	viewArray[0].add(viewArray[2]);
		 	perviousPage = 1;
		 }
		 
		
 	});
 	
 	scrollingView.addEventListener('scroll', function(e){
		leftArrowImage.hide();
		rightArrowImage.hide();

 	});
	
	scrollingView.addEventListener('touchstart', function(e){

		if(perviousPage ==0){
			leftArrowImage.show();			
		}
		else{
			rightArrowImage.show();			
		}
 	});
	scrollingView.addEventListener('touchend', function(e){
		if(perviousPage ==0){
			leftArrowImage.hide();	
		}

		else{
			rightArrowImage.hide();		
		}
 	});
	
	var self = new NavigateWindow(windowtitle, masterView);
	return self;
}



module.exports = ClubsandWatchesScrollWindow;