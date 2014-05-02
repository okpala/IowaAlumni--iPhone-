var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
var WebView = require('ui/common/WebView');
var EK = require("ti.eventkit");
Titanium.event = require('ti.eventkit');
/*
 * Return a Single Post Area for Events Window
 * that contains Tilte, Time, and Place
 */

function SingleRow(post, tracker, title) {

   var table = Ti.UI.createTableView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		scrollable: 		false
	});

	 var rowText = Ti.UI.createTableViewRow({
	        height: 150
	    });

	 rowText.addEventListener('click', function(e) {
			new WebView (post.url);
			tracker.trackEvent({
				category: "Events",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + post.url,
				value: 1
			});
	 });
	table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: table.height+15,
		padding: 0,
		top: 0,
		bottom: 0,
		link: 				post.url,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);
	var addEventButton = Ti.UI.createButton({
		title:'+',
		width:25,
		height:25,
		backgroundColor:'#ccc',
		bottom: 0,
  		right: 10,
  		zIndex: 5,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		
	});
	if (post.startDate != 'NA' && post.endDate != 'NA') {
		table.add(addEventButton);
	}
	//Ti.API.info(post.startDate);
	
	addEventButton.addEventListener('click', function(e){
		if(Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
    		performCalendarWriteFunctions(post);
		} 
		else {
    		Ti.Calendar.requestEventsAuthorization(function(e){
            if (e.success) {
                performCalendarWriteFunctions(post);
            } else {
                alert('Access to calendar is not allowed');
            }
        });
       }
	});



	titlelbl = getTitleLabel(post.title);
	rowText.add(titlelbl);

	timebl  = timeLabel();
	rowText.add(timebl);

	inputtimebl  = getTime(post.snl);
	rowText.add(inputtimebl);

	inputplacebl  = getPlace(post.place);
	rowText.add(inputplacebl);

	placebl  = placeLabel();
	rowText.add(placebl);


	timebl.top =   titlelbl.height + 15 ;
	inputtimebl.top  = timebl.top;
	placebl.top =  inputplacebl.top = timebl.height  + titlelbl.height + 15 ;




	rowText.height = titlelbl.height + inputtimebl.height + inputplacebl.height +  25;
	table.height = rowText.height;
	row.height = table.height + 15;




	return row;
}

/*
 * Helper Functions
 */


function getTitleLabel(title) {
	// Temp label to get height
	// At this font-size/font-face the height per line is 32

	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: 250,
		color:'#efc006',
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: 250,
		height:'auto'
	});
	view.add(temp);



	var label = Ti.UI.createLabel({
		text: title,
		left: 15,
		top: 10,
		bottom:10,
		height: view.toImage().height,
		textAlign:'left',
		width: 270,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	});

	return label;
}

function performCalendarWriteFunctions(post){
     var dlg = Titanium.UI.createAlertDialog({
     	title: post.title,
	    message:'Do you want to save this event to your calendar?', 
	    buttonNames: ['Yes','No']
	});
	dlg.addEventListener('click', function(ev) {
	    if (ev.index == 0) { // clicked "Yes"
	    	var defCalendar = Ti.Calendar.defaultCalendar;
		   	var date1 = new Date(post.startDate),
        	date2 = new Date(post.endDate);
		    Ti.API.info('Date1 : '+ date1 + 'Date2 : '+ date2);
		    
		    var event1 = defCalendar.createEvent({
		                        title: post.title,
		                        notes: post.description,
		                        location: post.place,
		                        begin: date1,
		                        end: date2,
		                        availability: Ti.Calendar.AVAILABILITY_FREE,
		                        allDay: false,
		     });
  
	      	event1.save(Ti.Calendar.SPAN_THISEVENT);
	    } 
	    else if (ev.index == 1) { // clicked "No"
	      // do nothing
	    }
	});
	dlg.show();

}

function getpubDateLabel(pubDate) {

	var text = Ti.UI.createLabel({
		text: pubDate,
		left: 15,
		top: 10,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#5c4e1a',
		shadowColor:'#f0d87f',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
	});

	return text;

}

function timeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Time: ',
		left: 15,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}

function getTime (snl){

	var text = Ti.UI.createLabel({
		text: (new EditText (snl)).adjustedText(),
		left: 55,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});

	return text;
}

function getPlace (place){

	var text = Ti.UI.createLabel({

		text: (new EditText (place)).adjustedText(),
		left: 55,
		bottom: 10,
		top:0,
		height: 20,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});

	return text;
}


function placeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Place: ',
		left: 15,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}


module.exports = SingleRow;