var linbr = linbr || {};
linbr.twitter = linbr.twitter || {};
linbr.twitter.TwitterAnalysis = linbr.twitter.TwitterAnalysis || {};

var SEARCH_JSON_URL = "http://search.twitter.com/search.json?callback=?&";

linbr.twitter.TwitterAnalysis = function() {
	
};

/**
 * Finds the surrounding tweets from the selected feature's buffer (radius).
 * @param args - Contains the query parameters.
 * @param callback - The callback function when the search of tweets is finished.
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
		var requestPerPage = sprintf("rpp=%d", 5);
		var includeEntities = sprintf("include_entities=%s", 'true');
		var resultType = sprintf("result_type=%s", 'mixed');
		query = sprintf("%s%s&%s&%s&%s", initQuery, geocode, requestPerPage, includeEntities, resultType);
	}

	$.ajax({
	    url: SEARCH_JSON_URL,
	    type: 'GET',
	    dataType : 'json',
	    data: query,
	    success: function(args) { 
	    	callback(args);
	    },
	    error : function(args) { 
	    	alert('Error in finding tweets: ' + args);
	    } 
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