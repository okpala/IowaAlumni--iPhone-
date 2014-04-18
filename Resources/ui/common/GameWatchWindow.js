var WebView = require('ui/common/WebView');
var EditText = require('ui/common/EditText');
var ClubsWindow = require('ui/common/ClubsWindow');
var Map = require('ti.map');
/*
 * Clubs and Game Watch Tabs 
 */
function GameWatchWindow(clubData, clubInfoData, tracker) {
	
//-----------	Game Watch Window -----------//

	var perviousPage = 0;
	var scrollBoxHeight = 60;
	var windowtitle = clubData[0].state;
	
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: true,
		//barColor:'#99cc66',
		
		
	});
	
	var statusBar = Ti.UI.createView({
	    backgroundColor:'#000',
	    top: 0,
	    height: 20
	});
	//self.add(statusBar);
	
	
	
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: windowtitle,
		navBarHidden:false,
		width: Ti.Platform.displayCaps.platformWidth,
		top: 0,
		left: 0,
		barImage:'navbar.png',
		translucent:false,
		//hires:true,
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		
		//title: 'Back',
		height: 26,
		width: 15,
		backgroundImage: 'back.png',
		font: {fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);

	//backButton event
	menuButton.addEventListener('click', function(e){
		
		//tabGroup.close();
		navGroup1.close();
		
	});
	
	var navGroup1 = Titanium.UI.iOS.createNavigationWindow({
		window:masterContainerWindow
	});
	//self.add(navGroup);
	
	
	if (Ti.Platform.version < 7.0){
		var top = 43;
		
	}
	else{
		var top = 63;
		
	}
	//top = 43;
	
	var mapWin = Ti.UI.createView({
	    top: top,
	    backgroundColor:'#ffffff',
		bottom: scrollBoxHeight,
	});

	
	
	
	
	
	var gameWatchInfo = [];
	for (var i = 0; i <= clubData.length - 1; i++) {
		gameWatchInfo.push(
			Map.createAnnotation(
			{
			    latitude:  clubData[i].latitude,
			    longitude: clubData[i].longitude,
			    title: clubData[i].place,
			    subtitle: clubData[i].street,
			    pincolor: Map.ANNOTATION_RED,
			    animate:true,
			})
		);
		
	}
 		
	
	var map = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {latitude: clubData[0].latitude, longitude: clubData[0].longitude,
			latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation: true,
		height: 200,
	    annotations: gameWatchInfo,
		top: 0
	});

	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 200
	});

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= gameWatchInfo.length - 1; i++) {
		if (rowCounter % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	club: clubData[i].club,
		    	latitude:  clubData[i].latitude,
				longitude: clubData[i].longitude,
		        height: 'auto',
		        bottom: 10
		    });
		}
		else{
			var row = Ti.UI.createTableViewRow({
		    	club: clubData[i].club,
		    	latitude:  clubData[i].latitude,
				longitude: clubData[i].longitude,
		        height: 'auto',
		        backgroundColor:'#cccccc',
		        bottom: 10
		    });
		}
	    var clubLabel = Ti.UI.createLabel({
	        text: (clubData[i].club),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var placeLabel = Ti.UI.createLabel({
	        text: (clubData[i].place),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        height: 14,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    var streetLabel = Ti.UI.createLabel({
	        text: clubData[i].street,//new EditText(clubData[i].street).adjustedText(),
	        textAlign: 'left',
	        left: 10,
	        top: 46,
	        height: 14,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    if (clubData[i].phone != 'NA'){
	    	var phoneLabel = Ti.UI.createLabel({
	        	text: (clubData[i].phone),
		        textAlign: 'left',
		        left: 10,
		        top: 61,
		        height: 14,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
			
		    row.add(phoneLabel);
	    }
	    row.add(clubLabel);
	    row.add(placeLabel);
	    row.add(streetLabel);
	    data.push(row);
	    rowCounter++;
	};
	data = addRows(i, data, false);
	table.setData(data);
	
	mapWin.add(map);
	mapWin.add(table);
	
	//masterContainerWindow.add(mapWin);
	
	//self.add(statusBar);
	if (Ti.Platform.version >= 7.0){
		//self.add(statusBar);
		
	}
	table.addEventListener('click', function(e){
		
		tracker.trackEvent({
					category: "Game Watches",
					action: "click",
					label: clubData[e.index].club,
					value: 1
		});
		
		map = Map.createView({
			mapType: Map.NORMAL_TYPE,
			region: {latitude: e.row.latitude, longitude: e.row.longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			regionFit: true,
			userLocation: true,
			height: 200,
		    annotations: gameWatchInfo,
			top: 0
		});
		
		mapWin.add(map);
		
		map.selectAnnotation(gameWatchInfo[e.index]);
	});
	
	var title = ["Iowa Clubs", "Game Watch Locations"];
	var imageNames = ["dots2_1.png", "dots2_2.png"] ;
	var imageViewArray = [];
	for(var i = 0; i < 2 ; i++){
		var View = Titanium.UI.createView({});
		var titleLabel = Ti.UI.createLabel({
				text: title[i],
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		var dotsImage = Ti.UI.createImageView({
			image: imageNames[i],
			top: 45,
			width: 16,
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
		
	});
	var clubsView = new ClubsWindow(clubData, clubInfoData,  tracker, top);
	navGroup1.add(clubsView);
	navGroup1.add(scrollingView);

	
	viewArray = [navGroup1, clubsView, mapWin];
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
/*
var baseWinTab1 = Titanium.UI.createWindow({
    navBarHidden: true
});
baseWinTab1.add(navTab1);


	
var tab1 = Titanium.UI.createTab({  
    icon: "people.png",
    title: 'Iowa Clubs',
    window: baseWinTab1
});
tabGroup.addTab(tab1); 


var tab2 = Titanium.UI.createTab({  
    icon: 'tv.png',
    title: 'Game Watch Locations',
    window: navGroup1
});
tabGroup.addTab(tab2); 

//tabGroup.setActiveTab(0); 
//tabGroup.add(statusBar);
if (Ti.Platform.version >= 7.0){
	//tabGroup.add(statusBar);
}

//--------------Club Window ----------------------//
var mainWinTab1 = Titanium.UI.createWindow({
    navBarHidden: true,
    backgroundColor:'#e2e2e2'
});


	
	if (Ti.Platform.version >= 7.0){
		mainWinTab1.add(statusBar);
		
	}

var navTab1 = Titanium.UI.iPhone.createNavigationGroup({
    window: mainWinTab1
});

	
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: clubData[0].state,
		navBarHidden:false,
		barImage:'navbar.png',
		//hires:true,
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		
		//title: 'Back',
		height: 26,
		width: 15,
		backgroundImage: 'back.png',
		//left: 15,
		font: {fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);

	//menuButton event
	menuButton.addEventListener('click', function(e){
		tabGroup.close();
		self.close();
		
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	mainWinTab1.add(navGroup);
	//masterContainerWindow.add(mainWinTab1);
	var table = Ti.UI.createTableView({
		height: 'auto',
		top: top
	});

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubInfoData.length - 1; i++) {
		if (rowCounter % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        selectionStyle: 'none',
		        bottom: 10
		    });
		}
		else{
			 var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        selectionStyle: 'none',
		        backgroundColor:'#cccccc',
		        bottom: 10
		    });
		}
	    var cityLabel = Ti.UI.createLabel({
	        text: (clubInfoData[i].city),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    row.add(cityLabel);
	    
	   var leaderLabel = Ti.UI.createLabel({
	        text: (clubInfoData[i].leader),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    }); 
	    row.add(leaderLabel);
	    
	    var currentTop = 46;
	    
	    if (clubInfoData[i].phone != 'NA'){
		    var phoneLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].phone),
		        textAlign: 'left',
		        left: 10,
		        top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
		    row.add(phoneLabel);
		    currentTop = currentTop + 15;
	    }
	    if (clubInfoData[i].email != 'NA'){
		    var emailLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].email),
		        textAlign: 'left',
		        color: 'blue',
		        left: 10,
		        top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
		    
		   
	    	emailLabel.addEventListener('click', function(e) {
	    		//data[e.index].emailLabel.color = 'purple'
	    		//Ti.API.info(e.row);
				var emailDialog = Ti.UI.createEmailDialog();
				emailDialog.toRecipients = [clubInfoData[e.index].email];
				var f = Ti.Filesystem.getFile('cricket.wav');
				emailDialog.addAttachment(f);
				emailDialog.open();
	}); 
	
		    row.add(emailLabel);
	    	currentTop = currentTop + 15;
	    	
	    }
	    
	    if (clubInfoData[i].web != 'NA'){
		    var webLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].web),
		        textAlign: 'left',
		        left: 10,
		        top: currentTop,
		        color: "blue",
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
		   
		    
		    webLabel.addEventListener('click', function(e) {
				new WebView (clubInfoData[e.index].web);
			}); 
			row.add(webLabel);
	    }
	   rowCounter++;
	    data.push(row);
	    
	};
	data = addRows(i, data, true);
	table.setData(data);
	
	mainWinTab1.add(table);
 
var baseWinTab1 = Titanium.UI.createWindow({
    navBarHidden: true
});
baseWinTab1.add(navTab1);


var tab1 = Titanium.UI.createTab({  
    icon: "people.png",
    title: 'Iowa Clubs',
    window: baseWinTab1
});
tabGroup.addTab(tab1); 


var tab2 = Titanium.UI.createTab({  
    icon: 'tv.png',
    title: 'Game Watch Locations',
    window: baseWinTab2
});
tabGroup.addTab(tab2); 

tabGroup.setActiveTab(0); 
if (Ti.Platform.version >= 7.0){
	tabGroup.add(statusBar);
}
tabGroup.open();

return mainWinTab1;

}




	
	tabGroup.open();*/
	return navGroup1;
}

//Helper Functions
function addRows(i, data, flag){
	if (i == 1 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    bottom: 10
		});
		data.push(row);
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
	}
	else if (i == 1 && flag == false){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 2 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 3 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		     backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	
	return data;
}

module.exports = GameWatchWindow;