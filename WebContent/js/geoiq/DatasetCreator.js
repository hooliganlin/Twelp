var linbr = linbr || {};
linbr.geoiq = linbr.geoiq || {};
linbr.geoiq.DatasetCreator= linbr.geoiq.DatasetCreator|| {};

var GEOIQ_DATASET_URL = "http://geocommons.com/datasets.json";
var GEOIQ_CREATE_FEATURE_URL = "http://geocommons.com/datasets/%s/features.json";

linbr.geoiq.DatasetCreator = function() {
	
};

/**
 * Creates the dataset for the queried tweets.
 * @param twitterData
 * @param featureData
 */
linbr.geoiq.DatasetCreator.prototype.createDataset = function(twitterData, featureData) {
	//create an empty dataset for each feature that was buffered
	var dataset = sprintf('{' +
			'"title" : "Twitter Data: %s - %s",'+
			'"description" : "Twitter data collected from Yelp data on %s",' +
			'"attributes" : [ {"name" : "Name", "type" : "string" },' +
			               '{"name" : "Lat", "type" : "latitude", "description" : "Latitude coordinate of the tweet" },' +
			                '{"name" : "Lon", "type" : "longitude", "description" : "Longitude coordinate of the tweet"},' +
			                '{"name" : "Tweet", "type" : "string" },' +
			                '{"name" : "TweetID", "type": "string"} ]}', featureData.name, featureData.guid, featureData.name);
	var self = this;
	$.ajax({
	    url: GEOIQ_DATASET_URL,
	    type: 'POST',
	    contentType : "application/json",
	    data: dataset,
	    beforeSend : this.setRequestHeader,
	    success: function(response) {
	    	self.onSuccess(twitterData, response);
	    },
	    error : this.onError
	});
};

/**
 * 
 * @param request
 */
linbr.geoiq.DatasetCreator.prototype.setRequestHeader = function(request) {
	var requestHeader = new linbr.util.RequestHeader("hooliganlin", "password123");
	var auth = requestHeader.makeBaseAuth();
	request.setRequestHeader('Authorization', auth);
};

/**
 * On create dataset success method. Populates the newly empty dataset with the tweets.
 * @param response
 */
linbr.geoiq.DatasetCreator.prototype.onSuccess = function(twitterData, response) {
	console.info("Successfully created dataset: " + response.title + " with id: " + response.id);
	var twitterResults = twitterData.results;
	try{
		if(twitterResults.length > 0) {
			for(var i = 0; i < twitterResults.length; i++) {
				if(twitterResults[i].geo != null) {
					//create a feature from the geo property
					var lat = twitterResults.geo.coordinates[0];
					var lon = twitterResults.geo.coordinates[1];
					var geometryType = twitterResults.geo.type;
				}
			}
		}
		else {
			console.info("No results found for the feature");
		}
	}
	catch(error) {
		alert(error);
	}
	
};

/**
 * 
 * @param error
 */
linbr.geoiq.DatasetCreator.prototype.onError = function(error) {
	alert('Error in creating dataset: ' + error.responseText);
};


linbr.geoiq.DatasetCreator.prototype.findDataset = function(tweetData) {
	/** TODO find the created dataset and populate it **/
};
