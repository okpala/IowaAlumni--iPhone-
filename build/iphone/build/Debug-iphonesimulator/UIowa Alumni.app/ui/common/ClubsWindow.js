var GetFeed = require('ui/common/GetFeed');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');

/*
 * Clubs View
 */

function ClubsWindow(clubData, clubInfoData,  tracker, top){
	var scrollBoxHeight = 60;
	var self = Ti.UI.createView({
	    backgroundColor:'#e2e2e2',
		top: top,
		bottom: 60
	});


	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 0
	});

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubInfoData.length - 1; i++) {

		if (rowCounter % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        selectionStyle: 'none',
		        index: i,
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
	    var currentLeft = 10;
	    
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
		        index: i,
		        left: 10,
		        top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
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
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
		   
			row.add(webLabel);
			currentTop = currentTop + 20;
	    }
	    if (clubInfoData[i].phone != 'NA'){
		    var phoneButton = Ti.UI.createButton({
		    	backgroundImage:"call.png",
				width:35,
				height:35,
				top: currentTop,
		  		left: currentLeft,
				buttonid: i,
			});
			currentLeft = currentLeft + 40;
		    row.add(phoneButton);
		   

		     phoneButton.addEventListener('click', function(e) {
		     	//Ti.API.info(e);
		     	//Ti.API.info( e.source.buttonid);
		     	//Ti.API.info(pos);
	    		var phone = (clubInfoData[e.source.buttonid].phone).replace(/(\|H: |C: |W: )/gm,"");
		    	phone = phone.replace(/(-)/gm, "");
		    	phone = phone.replace(/(H: )/gm, "");
	    		Titanium.Platform.openURL("tel:" + phone);
	    		//Ti.API.info(phone);
	    		
	    		tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[e.source.buttonid].city + " " + clubInfoData[e.source.buttonid].phone,
					value: 1
				});
			
			}); 
			
	    }
	    
	      if (clubInfoData[i].email != 'NA'){
		     var emailButton = Ti.UI.createButton({
		    	backgroundImage:"mail.png",
				width:35,
				height:35,
				top: currentTop,
		  		left: currentLeft,
				buttonid: i
			});
			currentLeft = currentLeft + 40;
		    
		   
	    	emailButton.addEventListener('click', function(e) {
	    		//Ti.API.info(e.index);
				var emailDialog = Ti.UI.createEmailDialog();
				emailDialog.toRecipients = [clubInfoData[e.source.buttonid].email];
				var f = Ti.Filesystem.getFile('cricket.wav');
				emailDialog.addAttachment(f);
				emailDialog.open();
				
	    		tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[e.source.buttonid].city + " " + clubInfoData[e.source.buttonid].email,
					value: 1
				});
			}); 
	
		    row.add(emailButton);
	    	
	    	
	    }
	    
	    if (clubInfoData[i].web != 'NA'){
		    var webButton = Ti.UI.createButton({
		    	backgroundImage:"web.png",
				width:35,
				height:35,
				top: currentTop,
		  		left: currentLeft,
				buttonid: i,
			});
			//currentLeft = currentLeft + 40;
		   
		    
		    webButton.addEventListener('click', function(e) {
				new WebView (clubInfoData[e.source.buttonid].web);
				
				tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[e.source.buttonid].city + " " + clubInfoData[e.source.buttonid].web,
					autoLink: Titanium.UI.AUTOLINK_URLS,
					value: 1
				});
			}); 
			row.add(webButton);
	
	    }
	    
	   rowCounter++;
	    data.push(row);
	    
	};
	data = addRows(i, data, true);
	table.setData(data);
	
	self.add(table);
	
	return self;
	
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


module.exports = ClubsWindow;