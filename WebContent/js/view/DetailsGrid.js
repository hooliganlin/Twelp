/**
 * This view component displays the details and results of a selected feature.
 * It provides the list component for tweets and the data table to be displayed 
 * when queried.
 * 
 * @author Bryan Lin
 */
var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.DetailsGrid = linbr.view.DetailsGrid || {};

/**
 * DetailsGrid default constructor
 * @returns {linbr.view.DetailsGrid}
 */
linbr.view.DetailsGrid = function() {};

/**
 * Populates the DetailsGrid with the selected feature's attributes.
 * @param feature linbr.model.Feature
 */
linbr.view.DetailsGrid.prototype.populateGrid = function(feature) {

	var analysisDiv = $("#analysisDiv");
	analysisDiv.html('<table cellpadding="0" cellspacing="0" border="1" class="display" id="detailsTable"></table>');

	var columnArr = [ { "sTitle": "Field Name" },
	                { "sTitle": "Value" },
	              ];
	
	$("#detailsTable").dataTable({
		"aaData" :  feature.toArray(true),
		"aoColumns" : columnArr,
		"bFilter" : false,
		"bInfo" : false,
		"bPaginate" : false,
		"bLengthChange " : false
	});
};

/**
 * Populates the DetailsGrid with a list of tweets in the Tweeter List group.
 * @param twitterResponse - The returned response data from the Twitter Search API call.
 */
linbr.view.DetailsGrid.prototype.populateTweets = function(twitterResponse) {
	$("#analysisDiv").empty();
	if(twitterResponse.error) {
		$("#analysisDiv").html(twitterResponse.error);
	}
	else {
		var resultsArr = twitterResponse.results;
		if(resultsArr.length > 0) {
			//create the tweet list to populated
			var tweetsDiv = $(document.createElement('div'));
			var tweetListItems = this.createTweetListItems(resultsArr);
			tweetsDiv.attr('id', 'tweetListDiv');
			tweetsDiv.append(tweetListItems);
			
			//create and populate the trends list tab
			var trendsDiv = $(document.createElement('div'));
			trendsDiv.attr('id', 'trendsListDiv');
			trendsDiv.append("<p>Trends will be implemented later...stay tuned!</p>");

			var twitterTabsDiv = $(document.createElement('div'));
			twitterTabsDiv.attr('id', 'twitterTabsDiv');
			twitterTabsDiv.append("<ul><li><a href='#tweetListDiv'>Tweets</a></li><li><a href='#trendsListDiv'>Trends</a></li></ul>");
			twitterTabsDiv.append(tweetsDiv, trendsDiv, this.createTweetNavigationDiv(twitterResponse));
			
			twitterTabsDiv.tabs();
			
			$("#analysisDiv").append(twitterTabsDiv);
		}
		else {
			$("#analysisDiv").append("<span class='emptyTweetsClass'>No Tweets were found for this restaurant :(</span>");
		}
	}
};

/**
 * Creates and populates the list item of tweets for the selected feature.
 * @param {Array} tweets
 * @returns DOM ListElement of tweets
 */
linbr.view.DetailsGrid.prototype.createTweetListItems = function(tweets) {
	var tweetsList = $(document.createElement('ol'));
	tweetsList.attr('id', 'tweetList');
	tweetsList.selectable();
	
	//Setup tweet list item template
	var markup = "<li class='ui-widget-content'><table><tr rowspan=3><td><img src='${profile_image_url}' width='32' height='32' /></td>"
		+ "<td><table><tr><td style='font-weight:bold'>${from_user}</td></tr><tr><td class='tweetDate'>${created_at}</td></tr><tr><td>${text}</td></tr></table></tr></table></li>";

	$.template("tweetListTemplate", markup);
	$.tmpl("tweetListTemplate", tweets).appendTo(tweetsList);

	return tweetsList;
};

/**
 * Creates the bottom group for the navigation buttons for the tweets.
 * @param tweetArgs The twitter JSON results
 */
linbr.view.DetailsGrid.prototype.createTweetNavigationDiv = function(tweetArgs) {

	var navigationDiv = $(document.createElement('div'));
	navigationDiv.attr('class', 'tweetNavigation');
	navigationDiv.attr('align', 'center');
	
	var btnNextPageProps = { 
			id : "btnNextPage",
			className : "btnNextPageClass",
			icon : "ui-icon-circle-arrow-e",
			disable : tweetArgs.next_page ? false : true
	};
	
	var btnPrevPageProps = {
			id : "btnPrevPage",
			className : "btnPrevPageClass",
			icon : "ui-icon-circle-arrow-w",
			disable : tweetArgs.previous_page ? false : true
	};
	
	var btnNextPage = this.createTweetNavButtons(btnNextPageProps, tweetArgs);
	var btnPrevPage = this.createTweetNavButtons(btnPrevPageProps, tweetArgs);
	
	navigationDiv.append(btnPrevPage, btnNextPage);
	return navigationDiv;
};

/**
 * Creates the Twitter Navigation buttons for the Tweeter feeds.
 * @param property The property of the button.
 * @param tweetArgs The Twitter JSON results
 */
linbr.view.DetailsGrid.prototype.createTweetNavButtons = function(property, tweetArgs) {
	var self = this;
	var navButton = $(document.createElement('button'));
	navButton.attr('id', property.id);
	navButton.attr('class', property.className);

	navButton.button({icons: { primary : property.icon}, disabled: property.disable, text : false});
	navButton.click(tweetArgs, function(args){
		var tweetData = args.data;
		var twitterAnalysis = new linbr.twitter.TwitterAnalysis();
		var featureCreator = linbr.geoiq.FeatureCreator.getInstance();
		var datasetId = linbr.geoiq.DatasetCreator.getInstance().datasetId;
		
		if(this.id == "btnNextPage") {
			//each new tweet page is a call to the twitter search api
			twitterAnalysis.findTweets({'next_page' : tweetData.next_page }, function(twitterResponse){
				self.populateTweets(twitterResponse);
				featureCreator.addFeature(twitterResponse, datasetId);
			});
		}
		else {
			twitterAnalysis.findTweets({'previous_page' : tweetData.previous_page }, function(twitterResponse){
				self.populateTweets(twitterResponse);
			});
		}
	});
	
	return navButton;
};