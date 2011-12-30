/**
 * This class runs the Twitter Search REST API call. Based on the query,
 * it includes querying the search query and the location within a specified
 * radius. One thing to note is that if there are no tweets within the specified
 * coordinates, the search query will default and search all relevant tweets with
 * those keywords (in the case, a restaurant name). 
 * 
 * Note: Some resultant tweets will not be related to the coordinates or the buffer range
 * because of the default behavior of the REST API.
 * 
 * More info at https://dev.twitter.com/docs/api/1/get/search
 * 
 * @author Bryan Lin
 */
var linbr = linbr || {};
linbr.twitter = linbr.twitter || {};
linbr.twitter.TwitterAnalysis = linbr.twitter.TwitterAnalysis || {};

var SEARCH_JSON_URL = "http://search.twitter.com/search.json?callback=?&";

/**
 * TwitterAnalysis construcor
 * @returns {linbr.twitter.TwitterAnalysis}
 */
linbr.twitter.TwitterAnalysis = function() {};

/**
 * Finds the surrounding tweets from the selected feature's buffer (radius). Calls
 * the Twitter REST call with a GET search.
 * @param args - Contains the query parameters.
 * @param callback - The callback function when searching tweets are finished.
 */
linbr.twitter.TwitterAnalysis.prototype.findTweets = function(args, callback) {
	
	var query = "";
	if(args.next_page || args.previous_page) {
		query = args.next_page ? args.next_page : args.previous_page;
		query = query.substring(1, query.length);
	}
	else {
		var initQuery = encodeURI(sprintf("q=%s&amp;", args.query));
		var geocode = sprintf("geocode=%f,%f,%f%s", args.lat, args.long, args.radius, args.units);
		var requestPerPage = sprintf("rpp=%d", 50);
		var includeEntities = sprintf("include_entities=%s", 'true');
		var resultType = sprintf("result_type=%s", 'mixed');
		query = sprintf("%s%s&%s&%s&%s", initQuery, geocode, requestPerPage, includeEntities, resultType);
	}

	$.ajax({
	    url: SEARCH_JSON_URL,
	    type: 'GET',
	    dataType : 'json',
	    data: query,
	    success: function(args) { callback(args); },
	    error : function(args) { alert('Error in finding tweets: ' + args); } 
	});
};

/**
 * Finds the current trends of the selected feature's area.
 * @param args
 * @param callback
 */
linbr.twitter.TwitterAnalysis.prototype.findTrends = function(args, callback) {
	/** TODO **/
};