var GetFeed = require('ui/common/GetFeed');
var  ClubsandWatchesScrollWindow = require('ui/common/ClubsandWatchesScrollWindow');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');
var  GameWatchWindow = require('ui/common/GameWatchWindow');
/*
 * Root Window for Clubs and Gamewatches
 */

function StatesWindow(title, tracker){
	tracker.trackScreen(title);
	var Feeds = new Feed();
	var masterView = Ti.UI.createView();
	
	var introLabel = Ti.UI.createLabel({
			 text: 'Want to connect with fellow UI grads, need a place to watch the next game with fellow Hawkeye fans? IOWA clubs have you covered—find a location near you!',
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	masterView.add(introLabel);		
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		left: 0,
		width: Ti.Platform.displayCaps.platformWidth,
		bottom: 70,
		top: 145
	});
	
	var people = Ti.UI.createImageView({
	  image:    'clubsPeople.png',
	  left: 10,
	  width:  Ti.Platform.displayCaps.platformWidth - 20,
	  top:   85
	});
	
	masterView.add(people);
	
	var clubsInfo = new GetFeed(Feeds.clubsFeed());
	var clubs = new GetFeed(Feeds.gameWatchFeed());
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubs.length - 1; i++) {
		if ((i == 0) || ((clubs[i - 1].state != clubs[i].state) && i != 0) ){ 
		if (rowCounter % 2 == 0){
			    var row = Ti.UI.createTableViewRow({
			    	text: clubs[i].state,
			        height: 50
			    });
		  }
		  else{
		  		var row = Ti.UI.createTableViewRow({
			    	text: clubs[i].state,
			    	backgroundColor:'#cccccc',
			        height: 50
			    });
		  }

		var label = Ti.UI.createLabel({
			 text: clubs[i].state,
			 textAlign: 'center',
			 font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
			        
		});
		   
		    row.add(label);
		    data.push(row);
		  	rowCounter++;
	    }
	    
	};


	
 
	table.setData(data);
	masterView.add(table);
	table.addEventListener('click', function(e){
		var stateClubs = getStateList(clubs, clubsInfo, e.row.text);
		var gameWatchView = new GameWatchWindow(stateClubs[0], stateClubs[1],  tracker, 0);
		var win = new  ClubsandWatchesScrollWindow(stateClubs[0], stateClubs[1], tracker, gameWatchView);
		win.open();
	
		
		tracker.trackEvent({
			category: title,
			action: "click",
			label: e.row.text,
			value: 1
		});
		
	});
	
	
	var ad = new StaticAd(11,395, tracker, title);
	masterView.add(ad);
	
	
	var self = new ApplicationWindow(title, masterView);
	return self;
	
}

function getStateList (clubsList, clubsInfoList, state){
	var data = [];
	var stateList = [];
	var stateInfoList = [];
	for (var i = 0; i <= clubsList.length - 1; i++){
		if (clubsList[i].state == state ){
			stateList.push(clubsList[i]);
		}
	} 
	data.push(stateList);
	for (var i = 0; i <= clubsInfoList.length - 1; i++){
		if ((clubsInfoList[i].state).toUpperCase() == state ){
			stateInfoList.push(clubsInfoList[i]);
		}
	} 
	
	data.push(stateInfoList);
	return data;
}


module.exports = StatesWindow;