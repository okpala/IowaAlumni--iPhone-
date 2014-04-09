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
	//tracker.trackScreen(title);
	
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
	
	var allEventstable = createEventView(events, title, scrollBoxHeight);
	var eventsSportstable = createEventView(eventsSportsCategoryFeed, title, scrollBoxHeight);
	var eventsClubstable = createEventView(eventsClubsCategoryFeed, title, scrollBoxHeight);
	var eventsUIAAtable = createEventView(eventsUIAACategoryFeed, title, scrollBoxHeight);
	var eventsStudenttable = createEventView(eventsStudentCategoryFeed, title, scrollBoxHeight);
	
	mainView.add(allEventstable);
	var title = ["All Events", "Athletics", "Clubs", "UIAA", "Student"];
	var imageViewArray = [];
	var viewArray = [mainWindow,mainView];
	var imageNames = ["dots1.png", "dots2.png", "dots3.png", "dots4.png", "dots5.png"] ;
	
	
	for(var i = 0; i < 5 ; i++){
		var View = Titanium.UI.createView({});
		var titleLabel = Ti.UI.createLabel({
				text: title[i],
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		var dotsImage = Ti.UI.createImageView({
			image: imageNames[i],
			top: 45,
			width: 40,
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
		borderWidth: 2,
		borderColor: '#000',
		mainContent: mainView
	});
	
	mainWindow.add(mainView);
	mainWindow.add(scrollingView);
	//Ti.API.info(mainWindow);
	scrollingView.addEventListener('scrollend', function(e){
		Ti.API.info("C=" + e.currentPage);

		
		 if(e.currentPage == 0 && perviousPage == 1){
		 	viewArray[1].remove(eventsSportstable);
		 	perviousPage = 0;
		 }
		 else if(e.currentPage == 1 && perviousPage == 0){
		 	viewArray[1].add(eventsSportstable);
		 	perviousPage = 1;
		 }
		 else if(e.currentPage == 1 && perviousPage == 2){
		 	viewArray[1].remove(eventsClubstable);
		 	perviousPage = 1;
		 }
		 else if(e.currentPage == 2 && perviousPage == 1){
		 	Ti.API.info("hello" + e.currentPage);
		 	viewArray[1].add(eventsClubstable);
		 	perviousPage = 2;
		 }
		 else if(e.currentPage == 2 && perviousPage == 3){
		 	viewArray[1].remove(eventsUIAAtable);
		 	perviousPage = 2;
		 }
		 
		 else if(e.currentPage == 3 && perviousPage == 2){
		 	viewArray[1].add(eventsUIAAtable);
		 	perviousPage = 3;
		 }
		
		else if(e.currentPage == 3 && perviousPage == 4){
		 	viewArray[1].remove(eventsStudenttable);
		 	perviousPage = 3;
		 }
		 else if(e.currentPage == 4 && perviousPage == 3){
		 	viewArray[1].add(eventsStudenttable);
		 	perviousPage = 4;
		 }
		
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

function createEventView(events, title, scrollBoxHeight){
	var table = new PostTable();
	table.bottom = scrollBoxHeight;
	var rows = [];
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
	else{	
				
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
			rows.push(row);
			Counter++;		
			tempDate = post.pubDate;
		}
		
	}
	table.setData(rows);
	return table;
}

module.exports = EventsWindow;