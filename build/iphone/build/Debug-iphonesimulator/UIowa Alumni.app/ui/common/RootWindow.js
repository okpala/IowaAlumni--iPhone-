var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var SingleRow = require('ui/common/SingleRow');
var PostTable = require('ui/common/PostTable');
var HomeImageSlider = require('ui/common/HomeImageSlider');
var SinglePost = require('ui/common/SinglePost');
var HomeSMSection = require('ui/common/HomeSMSection');
var Row = require('ui/common/Row');
var FormatDate = require('ui/common/FormatDate');
var StaticAd = require('ui/common/StaticAd');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');

/*
 * Home Window
 */
function RootWindow(title, tracker) {
	tracker.trackScreen(title);
	var masterView = Ti.UI.createView();
	
	var Feeds = new Feed();
	var tableView = new PostTable();
	tableView.top = 0;
	tableView.bottom = 70;
	tableView.selectionStyle ='none';
	
	// PostTable Event Listeners
	
	tableView.addEventListener('scroll',function(e)
	{
		var offset = e.contentOffset.y;
		if (offset < -65.0 && !tableView.pulling && !tableView.reloading)
		{
			tableView.pulling = true;
			tableView.updateLabelText("Release to refresh...");
		}
		else if((offset > -65.0 && offset < 0 ) && tableView.pulling && !tableView.reloading)
		{
			tableView.pulling = false;
			tableView.updateLabelText("Pull down to refresh...");
		}    
	});
	
	tableView.addEventListener('dragEnd', function()
	{	
		if(tableView.pulling && !tableView.reloading)
		{
			tableView.reloading = true;
			tableView.pulling = false;
			tableView.showActInd();
			tableView.setContentInsets({top:60},{animated:true});
			tableView.scrollToTop(-60,true);
			beginReloading();
		}
	});
	
	function beginReloading() {
		// just mock out the reload
		refreshRSS();
		endReloading();
	}
	function endReloading() {
		tableView.setContentInsets({top:60},{animated:true});
		tableView.reloading = false;
		tableView.updateLabelText("Refreshing...");
		setTimeout(resetTable,700);
	}
	function resetTable() { 
		tableView.setContentInsets({top:0},{animated:true});
		tableView.updateDateText("Last Updated: "+ (new FormatDate()).getDate());
		tableView.hideActInd();
		tableView.updateLabelText("Pull down to refresh...");
	}


	function refreshRssTable() {
		
		var rows = [];
		
	//---------------------------------------------------------------------------------------
	
		var row = new HomeImageSlider();
		rows.push(row);
	//----------------------------------------------------------------------------------------	
		var introLabel = Ti.UI.createLabel({
			text: "No matter how many years or miles may separate you from the campus, the UI Alumni Association can help you feel part of the life of the University of Iowa.",
			width: 300,
			top: 10,
			left: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		
		var row = Ti.UI.createTableViewRow();
		
		row.add(introLabel);
		rows.push(row);
		
		
	//-----------------------------------------------------------------------------------------
	
	var alerts = new GetFeed (Feeds.mobileAlertsFeed());
	
	
	if (alerts.length > 0){
		for (var i = 0; i < alerts.length; i++){
			var headerLabel = Ti.UI.createLabel({
				text: alerts[i].header,
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			
			row.add(headerLabel);
			rows.push(row);
			
			var row = new SinglePost(alerts[i], tracker, title);
			rows.push(row);
		}
	}	
	
	//-----------------------------------------------------------------------------------------	
		var events = new GetFeed (Feeds.todayEventsFeed());
		
		if(events.length > 0){
			var eventHeaderLabel = Ti.UI.createLabel({
				text: "Today's Events",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			row.add(eventHeaderLabel);
			
			rows.push(row);
			
			
			for (var i = 0; i < events.length; i++) {
				var row = new SingleRow (events[i], tracker, title);
				
				rows.push(row);
			}
		}
	//-----------------------------------------------------------------------------------------
		var magazineHeaderLabel = Ti.UI.createLabel({
			text: "Article of the Week",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(magazineHeaderLabel);
		
		rows.push(row);
	
		var article = new GetFeed (Feeds.articleOfTheWeekFeed());
		var row = new SinglePost(article[0],tracker);
		
		rows.push(row);
	//----------------------------------------------------------------------------	
		var iowaInsiderLabel = Ti.UI.createLabel({
			text: "Iowa Insider",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		
		var row = new HomeSMSection(tracker);
		
		rows.push(row);
		
		tableView.setData(rows);
		masterView.add(tableView);
		
	}
	
	function refreshRSS() {	
		refreshRssTable();

	}

	// load initial rss feed
	refreshRSS();

	var ad = new StaticAd(9,392, tracker, title);
	
	
	masterView.add(ad);
	
	var self = new ApplicationWindow("Home", masterView);
	

	return self;

}

function printEventDetails(eventID) {
    Ti.API.info('eventID:' + eventID);
    var defCalendar = Ti.Calendar.defaultCalendar;
    var eventFromCalendar = defCalendar.getEventById(eventID);
    if (eventFromCalendar != null) {
        Ti.API.info('Printing event values ::');
        Ti.API.info('title : '+ eventFromCalendar.title);
        Ti.API.info('notes : ' + eventFromCalendar.notes);
        Ti.API.info('location:' + eventFromCalendar.location);
        Ti.API.info('allDay ? :' + eventFromCalendar.allDay);
        Ti.API.info('status : '+ eventFromCalendar.status);
        Ti.API.info('availability : '+ eventFromCalendar.availability);
        Ti.API.info('hasAlarm ? : '+ eventFromCalendar.hasAlarm);
        Ti.API.info('id : '+ eventFromCalendar.id);
        Ti.API.info('isDetached ? : '+ eventFromCalendar.isDetached);
        Ti.API.info('begin : '+ eventFromCalendar.begin);
        Ti.API.info('end : '+ eventFromCalendar.end);
        var eventRule = eventFromCalendar.recurrenceRules;
        Ti.API.info("recurrenceRules : " + eventRule);
        for (var i = 0; i < eventRule.length; i++) {
            Ti.API.info("Rule # "+ i);
            Ti.API.info('frequency : ' + eventRule[i].frequency);
            Ti.API.info('interval : ' + eventRule[i].interval);
            Ti.API.info('daysofTheWeek : ' );
            var daysofTheWeek = eventRule[i].daysOfTheWeek; 
            for (var j = 0; j < daysofTheWeek.length; j++) {
                Ti.API.info('{ dayOfWeek : '+ daysofTheWeek[j].dayOfWeek +'weekNumber : '+daysofTheWeek[j].week +'}, ');
            }
            Ti.API.info('firstDayOfTheWeek : ' + eventRule[i].firstDayOfTheWeek);
            Ti.API.info('daysOfTheMonth : ');
            var daysOfTheMonth = eventRule[i].daysOfTheMonth;
            for(var j=0;j<daysOfTheMonth.length;j++) {
                Ti.API.info(' ' + daysOfTheMonth[j]);
            }
            Ti.API.info('daysOfTheYear : ');
            var daysOfTheYear = eventRule[i].daysOfTheYear;
            for(var j=0;i<daysOfTheYear.length;j++) {
                Ti.API.info(' ' + daysOfTheYear[j]);
            }
            Ti.API.info('weeksOfTheYear : ');
            var weeksOfTheYear = eventRule[i].weeksOfTheYear;
            for(var j=0;j<weeksOfTheYear.length;j++) {
                Ti.API.info(' ' + weeksOfTheYear[j]);
            }
            Ti.API.info('monthsOfTheYear : ');
            var monthsOfTheYear = eventRule[i].monthsOfTheYear;
            for(var j=0;j<monthsOfTheYear.length;j++) {
                Ti.API.info(' ' + monthsOfTheYear[j]);
            }
            Ti.API.info('daysOfTheYear : ');
            var setPositions = eventRule[i].setPositions;
            for(var j=0;j<setPositions.length;j++) {
                Ti.API.info(' ' + setPositions[j]);
            }
        };
        Ti.API.info('alerts : '+ eventFromCalendar.alerts);
        var newAlerts = eventFromCalendar.alerts;
        
        for(var i=0 ; i < newAlerts.length ; i++) {
            Ti.API.info('*****ALert '+ i);
            Ti.API.info('absoluteDate :'+ newAlerts[i].absoluteDate);
            Ti.API.info('relativeOffset ;' + newAlerts[i].relativeOffset);
        }
   }
}

function performCalendarWriteFunctions(){
    
   
    
    
}

module.exports = RootWindow;