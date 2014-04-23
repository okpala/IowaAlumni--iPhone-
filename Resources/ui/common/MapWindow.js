var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var NavigateWindow = require('ui/common/NavigateWindow');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
var Map = require('ti.map');

function MapWindow(title, tracker) {
	tracker.trackScreen(title);
	var Feeds = new Feed();
	var mapWin = Ti.UI.createView({
	    
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});


	
	
	var businessesInfo =  new GetFeed (Feeds.iowaCityFeed());
	
	var companyInfo = [];
	var curLatitude = businessesInfo[0].latitude;
	var curLongitude = businessesInfo[0].longitude;
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		companyInfo.push(
			Map.createAnnotation(
			{
			    latitude:  businessesInfo[i].latitude,
			    longitude: businessesInfo[i].longitude,
			    title: businessesInfo[i].company,
			    subtitle: businessesInfo[i].street,
			    pincolor: Map.ANNOTATION_RED,
			    animate:true
			})
		);
	}
 
	
	var map = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {latitude: companyInfo[0].latitude, longitude: companyInfo[0].longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation:true,
		height: 200,
	    annotations: companyInfo,
		top: 0
	});
	
	var routeButton = Ti.UI.createButton({
		title:'Get Route',
		width:80,
		height:25,
		backgroundColor:'#ffffff',
		bottom: 20,
  		left: 20,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		
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
	

	
	var textView = Ti.UI.createView({
		backgroundColor: 	'#e2e2e2',
		height:				70,
		top:				200,
		
	});
	var introLabel = Ti.UI.createLabel({
			 text: ('UI Alumni Association members have').concat('\nan array of available to them. Use your member benefit card at any of these locations.'),
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	textView.add(introLabel);	
	
	var linkLabel = Ti.UI.createLabel({
			 text: 'benefits',
			 textAlign: 'left',
			 left: 236.5,
			 top: 10,
			 color: 'blue',
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
		
	linkLabel.addEventListener('click', function(e){
		new WebView ('http://iowalum.com/membership/benefits.cfm');
		tracker.trackEvent({
						category: "Benefits",
						action: "click",
						label: "Members Benefits' Website",
						value: 1
					});
	});
	textView.add(linkLabel);	

	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 270
	});

	
	var data = [];
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		if (i % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	company: businessesInfo[i].company,
		    	latitude:  businessesInfo[i].latitude,
				longitude: businessesInfo[i].longitude,
		        height: 'auto',
		        bottom: 10,
		    });
		}
		else{
			var row = Ti.UI.createTableViewRow({
		    	company: businessesInfo[i].company,
		    	latitude:  businessesInfo[i].latitude,
				longitude: businessesInfo[i].longitude,
		        height: 'auto',
		        backgroundColor:'#cccccc',
		        bottom: 10,
		    });
		}
	    var companyLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].company),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var discountLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].discount),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    row.add(companyLabel);
	    row.add(discountLabel);
	    data.push(row);
	};

	table.setData(data);
	
	mapWin.add(map);
	mapWin.add(textView);
	mapWin.add(table);
	
   
	
	

	table.addEventListener('click', function(e){
		
		
		map = Map.createView({
			mapType: Map.NORMAL_TYPE,
			region: {latitude: e.row.latitude, longitude: e.row.longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			regionFit: true,
			userLocation: true,
			height: 200,
		    annotations: companyInfo,
			top: 0
		});
		curLatitude = e.row.latitude;
		curLongitude = e.row.longitude;
		mapWin.add(map);
		
		map.selectAnnotation(companyInfo[e.index]);
		
		tracker.trackEvent({
			category: "Benefits",
			action: "click",
			label: companyInfo[e.index].title,
			value: 1
		});
		map.add(routeButton);
	
	});
	
	
        
	var self = new NavigateWindow("Iowa City Benefits", mapWin);
    
return self;


}



module.exports = MapWindow;