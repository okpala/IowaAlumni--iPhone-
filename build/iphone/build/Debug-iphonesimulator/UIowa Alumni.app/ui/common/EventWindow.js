var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var Feed = require('ui/common/Feed');
var Post = require('ui/common/Post');
var	HeaderRow = require('ui/common/HeaderRow');
var SingleRow = require('ui/common/SingleRow');
var Ad = require('ui/common/Ad');
var PostTable = require('ui/common/PostTable');

function EventsWindow(title, tracker) {
	var mainWindow = Titanium.UI.createView();
	var self = new ApplicationWindow(title, mainWindow);
	var perviousPage = 0;
	var scrollBoxHeight = 60;
	var Feeds = new Feed();
	tracker.trackScreen(title);
	var categoryArray = [];
	var events = new GetFeed (Feeds.eventsFeed());
	var eventsSportsCategoryFeed = new GetFeed (Feeds.eventsSportsCategoryFeed());
	var eventsClubsCategoryFeed = new GetFeed (Feeds.eventsClubsCategoryFeed());
	var eventsUIAACategoryFeed = new GetFeed (Feeds.eventsUIAACategoryFeed());
	var eventsStudentCategoryFeed = new GetFeed (Feeds.eventsStudentCategoryFeed());
	
	var mainView = Titanium.UI.createView({
	  top: 0,
	  left: 0,
	  //backgroundColor: '#000',
	  width: Ti.UI.FILL,
	  height: Ti.Platform.displayCaps.platformHeight - scrollBoxHeight,
	});
	
	var allEventstable = createEventView(events, title, scrollBoxHeight, categoryArray);
	var eventsSportstable = createEventView(eventsSportsCategoryFeed, title, scrollBoxHeight, categoryArray);
	var eventsClubstable = createEventView(eventsClubsCategoryFeed, title, scrollBoxHeight, categoryArray);
	var eventsUIAAtable = createEventView(eventsUIAACategoryFeed, title, scrollBoxHeight, categoryArray);
	var eventsStudenttable = createEventView(eventsStudentCategoryFeed, title, scrollBoxHeight, categoryArray);
	
	mainView.add(allEventstable);
	
	var imageViewArray = [];
	var viewArray = [mainWindow,mainView];
	var imageNames;
	if (categoryArray.length == 1){
		imageNames = ["dots1_1.png"];
	}
	else if(categoryArray.length == 2){
		imageNames = ["dots2_1.png", "dots2_2.png"];		
	}
	else if( categoryArray.length == 3){
		imageNames = ["dots3_1.png", "dots3_2.png", "dots3_3.png"];
	}
	else if( categoryArray.length == 3){
		imageNames = ["dots4_1.png", "dots4_2.png", "dots4_3.png", "dots4_4.png"];
	}
	else{
		imageNames = ["dots1.png", "dots2.png", "dots3.png", "dots4.png", "dots5.png"];
	}
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
		
	//Ti.API.info(categoryArray.length);
	for(var i = 0; i < categoryArray.length ; i++){
		var View = Titanium.UI.createView({});
		var titleLabel = Ti.UI.createLabel({
				text: categoryArray[i][0][0].category,
				font:{fontFamily:'HelveticaNeue-Light',fontSize:20,fontWeight:'bold'},
				top: 15
		});
		//Ti.API.info(categoryArray[i][0][0].category);
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
	  	contentHeight: 100,
		//borderWidth: 2,
		//borderColor: '#000',
		mainContent: mainView
	});
	mainWindow.add(rightArrowImage);
	mainWindow.add(leftArrowImage);
	mainWindow.add(mainView);
	mainWindow.add(scrollingView);
	rightArrowImage.hide();
	leftArrowImage.hide();
	//Ti.API.info(mainWindow);
	
	//leftArrowImage.show();
	scrollingView.addEventListener('scrollend', function(e){
		//Ti.API.info("C=" + e.currentPage)
		leftArrowImage.hide();
		rightArrowImage.hide();
		 if(e.currentPage == 0 && perviousPage == 1){
		 	viewArray[1].remove(categoryArray[1][1]);
		 	perviousPage = 0;
		 }
		 else if(e.currentPage == 1 && perviousPage == 0){
		 	viewArray[1].add(categoryArray[1][1]);
		 	perviousPage = 1;
		 }
		 else if(e.currentPage == 1 && perviousPage == 2){
		 	viewArray[1].remove(categoryArray[2][1]);
		 	perviousPage = 1;
		 }
		 else if(e.currentPage == 2 && perviousPage == 1){
		 	viewArray[1].add(categoryArray[2][1]);
		 	perviousPage = 2;
		 }
		 else if(e.currentPage == 2 && perviousPage == 3){
		 	viewArray[1].remove(categoryArray[3][1]);
		 	perviousPage = 2;
		 }
		 
		 else if(e.currentPage == 3 && perviousPage == 2){
		 	viewArray[1].add(categoryArray[3][1]);
		 	perviousPage = 3;
		 }
		
		else if(e.currentPage == 3 && perviousPage == 4){
		 	viewArray[1].remove(categoryArray[4][1]);
		 	perviousPage = 3;
		 }
		 else if(e.currentPage == 4 && perviousPage == 3){
		 	viewArray[1].add(categoryArray[4][1]);
		 	perviousPage = 4;
		 }
		
 	});
 	
 	scrollingView.addEventListener('scroll', function(e){
		leftArrowImage.hide();
		rightArrowImage.hide();

 	});
	//Displays arrows on touch events
	scrollingView.addEventListener('touchstart', function(e){
		//Ti.API.info("C=" + e.currentPage);
		if (categoryArray.length == 1){//only one category
		}
		
		else if(perviousPage == 0  && categoryArray.length != 1){//first category
			leftArrowImage.show();
			
		}
		else if(perviousPage == (categoryArray.length - 1) && categoryArray.length != 1){//last category 
			rightArrowImage.show();
		}
		else{//if there is next and pervious category
			rightArrowImage.show();
			leftArrowImage.show();
		}
 	});
 	
 	//hides arrows on the end of touch events
	scrollingView.addEventListener('touchend', function(e){
		rightArrowImage.hide();
		leftArrowImage.hide();
		
 	});
	
	mainWindow = null;
	scrollingView = null;
	table = null;
	ads = null;
	Feeds = null;
	mainView = null;
	events = null;
	
	return self;

}

function createEventView(events, title, scrollBoxHeight, categoryArray){
	var table = Ti.UI.createTableView({
		separatorColor: 'transparent',
		backgroundColor: '#e2e2e2'
		});
	table.bottom = scrollBoxHeight;
	var rows = [];
	/*
	if (events.length == 0){
		var titleLabel = Ti.UI.createLabel({
				text: "There are no Upcoming Events at the Moment.",
				font:{fontFamily:'Helvetica-Bold',fontSize:15,fontWeight:'normal'},
				textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
		});
		 var row = Ti.UI.createTableViewRow({});
		 row.add(titleLabel);
		 rows.push(row);
	}
	*/
	if (events.length > 0){	
				
		var Counter = 0;
		var headerCounter = 0;
		var adIndex = 0;
		var ads = new GetFeed(Feeds.adFeed() );
		var tempDate = "";
		
		for (var i = 0; i < events.length; i++) {
			
			var post = new Post(events[i]);
			if ((Counter == 0) ||(tempDate != post.pubDate && Counter != 0)){
				var header = new HeaderRow(post, tracker, title);
				if (headerCounter != 0 && (headerCounter % 3) == 0 && adIndex < 3 ){
					var row = new Ad(ads[adIndex], tracker, title);
					rows.push(row);
					adIndex++;
					if (adIndex == 3){
						adIndex = 0;
					} 
				}
				rows.push(header);
				headerCounter++;
			}
			var row = new SingleRow(post, tracker, title);
			//Ti.API.info(post.postDate);
			rows.push(row);
			Counter++;		
			tempDate = post.pubDate;
		}
	table.setData(rows);	
	categoryArray.push([events, table]);	
	}
	
	
	return table;
}

module.exports = EventsWindow;