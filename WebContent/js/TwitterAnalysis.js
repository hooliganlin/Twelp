var linbr = linbr || {};
linbr.analysis = linbr.analysis || {};
linbr.analysis.TwitterAnalysis = linbr.analysis.TwitterAnalysis || {};

var SEARCH_URL = "http://search.twitter.com/search.json?callback=?";

linbr.analysis.TwitterAnalysis = function() {
	
};

/**
 * Finds the surrounding tweets from the selected feature's buffer (radius).
 * @param args - Contains the query parameters.
 * @param callback - The callback function when the search of tweets is finished.
 */
linbr.analysis.TwitterAnalysis.prototype.findTweets = function(args, callback) {
	var query = encodeURI(sprintf("q=%s&amp;", args.query));
	var geocode = sprintf("geocode=%f,%f,%f%s", args.lat, args.long, args.radius, args.units);
	var requestPerPage = sprintf("rpp=%d", 50);
	var includeEntities = sprintf("include_entities=%s", 'true');
	var resultType = sprintf("result_type=%s", 'mixed');
	var combinedArgs = sprintf("%s%s&%s&%s&%s", query, geocode, requestPerPage, includeEntities, resultType);
	
	$.ajax({
	    url: SEARCH_URL,
	    type: 'GET',
	    dataType : 'json',
	    data: combinedArgs,
	    success: function(args) { 
	    	callback(args);
	    },
	    error : function(args) { 
	    	alert('Error in finding tweets: ' + args);
	    } 
	});
};

linbr.analysis.TwitterAnalysis.prototype.findTrends = function(args, callback) {
	
};