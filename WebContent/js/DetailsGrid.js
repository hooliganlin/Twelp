var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.DetailsGrid = linbr.view.DetailsGrid || {};


linbr.view.DetailsGrid = function(feature) {
	
};

/**
 * 
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
 * 
 * @param args - The returned arguments from the Twitter Search API call.
 */
linbr.view.DetailsGrid.prototype.populateTweets = function(args) {
	$("#analysisDiv").empty();
	if(args.error) {
		$("#analysisDiv").html(args.error);
	}
	else {
		var resultsArr = args.results;
		if(resultsArr.length > 0) {
			//create the tweet list to populated
			var tweetsDiv = $(document.createElement('div'));
			var tweetListItems = this.createTweetListItems(resultsArr);
			tweetsDiv.attr('id', 'tweetListDiv');
			tweetsDiv.append(tweetListItems);
			
			//create and populate the trends list tab
			var trendsDiv = $(document.createElement('div'));
			trendsDiv.attr('id', 'trendsListDiv');
			trendsDiv.append("<p>TRENDS!!</p>");
			
			var twitterTabsDiv = $(document.createElement('div'));
			twitterTabsDiv.attr('id', 'twitterTabsDiv');
			twitterTabsDiv.append("<ul><li><a href='#tweetListDiv'>Tweets</a></li><li><a href='#trendsListDiv'>Trends</a></li></ul>");
			twitterTabsDiv.append(tweetsDiv, trendsDiv);
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
	var markup = "<li class='ui-widget-content'><table><tr rowspan=2><td><img src='${profile_image_url}' width='32' height='32' /></td>"
		+ "<td><table><tr><td style='font-weight:bold'>${from_user}</td></tr><tr><td>${text}</td></tr></table></tr></table></li>";

	$.template("tweetListTemplate", markup);
	$.tmpl("tweetListTemplate", tweets).appendTo(tweetsList);

	return tweetsList;
};