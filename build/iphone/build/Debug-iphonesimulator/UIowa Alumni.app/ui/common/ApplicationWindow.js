function ApplicationWindow(windowtitle, masterView) {

	var statusBar = Ti.UI.createView({
	    backgroundColor:'#000',
	    top: 0,
	    height: 20
	});

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: windowtitle,
		backgroundColor:'#e2e2e2',
		//horizontalWrap: false,
		width: Ti.Platform.displayCaps.platformWidth,
		left: 0,
		barImage:'navbar.png',
		translucent:false,
		//titleControl: Ti.UI.createLabel({ text: windowtitle, color: 'white', font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:20,fontWeight:'bold'} }),
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	
	var menuButton = Ti.UI.createButton({
		backgroundImage: 'newmenubutton.png',
		backgroundSelectedImage: 'newmenubuttonselected.png',
		title: '',
		height: 22,
		width: 37,
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);
	masterContainerWindow.add(masterView);
	//masterContainerWindow.add(statusBar);
	var navGroup = Titanium.UI.iOS.createNavigationWindow({
		window:masterContainerWindow
	});
	
	

	//menuButton event
	menuButton.addEventListener('click', function(e){
		navGroup.fireEvent('menuClick');
	});

	navGroup.addEventListener('swipeToggle', function(e){
		navGroup.fireEvent('menuClick');
	});
	navGroup.addEventListener('swipe', function(e){
		navGroup.fireEvent('menuClick');
	});
	navGroup.addEventListener('swipeListen', function(e){
		navGroup.fireEvent('menuClick');
	});
	
	
	return navGroup;
	
};
module.exports = ApplicationWindow; 