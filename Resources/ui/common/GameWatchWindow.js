var WebView = require('ui/common/WebView');
var EditText = require('ui/common/EditText');
var ClubsWindow = require('ui/common/ClubsWindow');
var Map = require('ti.map');
/*
 * Clubs and Game Watch Tabs 
 */
function GameWatchWindow(clubData, clubInfoData, tracker, top) {
	var perviousPage = 0;
	var scrollBoxHeight = 60;
	var windowtitle = clubData[0].state;
	
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
 		
	var curLatitude = clubData[0].latitude;
	var curLongitude = clubData[0].longitude;
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
	
	var routeButton = Ti.UI.createButton({
		title:'Get Route',
		width:80,
		height:30,
		backgroundColor:'#66CCFF',
		borderRadius:		5,
		borderWidth: 		1,
		//color: "#fff",
		bottom: 5,
  		left: 5,
		font: {fontFamily:'Helvetica',fontSize:14,fontWeight:'bold'}
		
	});
	map.add(routeButton);
	
	routeButton.addEventListener('click', function(e){
		
		
		if(Ti.Network.online){
	        Ti.Geolocation.purpose = "Receive User Location";
	        Titanium.Geolocation.getCurrentPosition(function(e){
	
	            if (!e.success || e.error)
	            {
	                alert('Could not find the device location');
	                return;
	            }
	            var longitude = parseFloat( e.coords.longitude, 10).toFixed(5);
	            var latitude =  parseFloat(e.coords.latitude, 10).toFixed(5);
	
	          
				var url = 'http://maps.google.com/maps?saddr=' +latitude+ ',' + longitude + '&daddr=' + curLatitude+','+curLongitude;
				new WebView (url);
				 //Titanium.Platform.openURL(url); 
				//alert("latitude: " + latitude + "longitude: " + longitude);
			
	        });
		    }
		   else{
		        alert("Internet connection is required to use localization features");
		   }/*
		   */
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
		map.add(routeButton);
		mapWin.add(map);
		curLatitude =  e.row.latitude;
		curLongitude =  e.row.longitude;
		map.selectAnnotation(gameWatchInfo[e.index]);
	});
	
	return mapWin;
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