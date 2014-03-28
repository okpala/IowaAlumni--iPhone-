var ApplicationWindow = require('ui/common/ApplicationWindow');

function EventsWindow(title, tracker) {
	var mainWindow = Ti.UI.createWindow();
	var self = new ApplicationWindow(mainWindow);

	tracker.trackScreen(title);
	
	var tabView = Ti.UI.createView({
	  bottom: 0,
	  backgroundColor: '#ccc',
	  contentWidth: Ti.UI.FILL,
	  contentHeight: 100,
	  showVerticalScrollIndicator: false,
	  showHorizontalScrollIndicator: true
	});
	mainWindow.add(tabView);
	
	return self;
}

module.exports = EventsWindow;