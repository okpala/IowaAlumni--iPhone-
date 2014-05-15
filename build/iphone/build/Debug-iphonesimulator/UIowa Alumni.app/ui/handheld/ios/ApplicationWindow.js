//Application Window Component Constructor
var RootWindow = require('ui/common/RootWindow');

function ApplicationWindow(feed,windowtitle, tracker) {
	
	tracker.trackScreen(windowtitle);
	//declare module dependencies
	var RSS = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView'),	
		Description = require('ui/common/Description');
	
		
	//var rssfeed = new RSS(feed);

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		//barImage: 'navbar.png'
		navBarHidden: true
	});
	/*
	
	var statusBar = Ti.UI.createView({
	    backgroundColor:'#000',
	    top: 0,
	    height: 20
	});
	
	self.add(statusBar);
*/
	//construct UI
	var masterView = new MasterView(feed, windowtitle, tracker);
	var	detailView = new DetailView();

	

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: windowtitle,
		navBarHidden:false,
		barImage:'navbar.png',
		translucent:false,
		width: Ti.Platform.displayCaps.platformWidth,
		left: 0,
		//titleControl: Ti.UI.createLabel({ text: windowtitle, color: 'white', font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:20,fontWeight:'bold'} }),
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	
	if (Ti.Platform.version >= 7.0){
		masterContainerWindow.titleControl = Ti.UI.createLabel({ text: windowtitle, color: 'white', font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:20,fontWeight:'bold'} });
		
	}
	
	var menuButton = Ti.UI.createButton({
		backgroundImage: 'newmenubutton.png',
		backgroundSelectedImage: 'newmenubuttonselected.png',
		title: '',
		height: 22,
		width: 30,
		//left: 15,
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);
	masterContainerWindow.add(masterView);
	
	//create iOS specific NavGroup UI
	var navGroup = Titanium.UI.iOS.createNavigationWindow({
		window:masterContainerWindow
	});
	
	//menuButton event
	menuButton.addEventListener('click', function(e){
		navGroup.fireEvent('menuClick');
	});

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({barImage: 'navbar.png',navBarHidden:false});
	detailContainerWindow.add(detailView);

	
	//self.add(navGroup);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.showArticle(e.link);
		navGroup.open(detailContainerWindow);
	});

	
	
	return navGroup;
	
};
module.exports = ApplicationWindow;