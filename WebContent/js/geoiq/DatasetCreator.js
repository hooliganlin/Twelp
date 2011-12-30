var linbr = linbr || {};
linbr.geoiq = linbr.geoiq || {};
linbr.geoiq.DatasetCreator= linbr.geoiq.DatasetCreator|| {};

var GEOIQ_DATASET_URL = "http://geocommons.com/datasets.json";
var GEOIQ_CREATE_FEATURE_URL = "http://geocommons.com/datasets/%s/features.json";

/**
 * Singleton object which CRUDS the datasets when searching for
 * tweets in the buffer.
 */
linbr.geoiq.DatasetCreator = (function() {
	var instance = null;
	function Instance(){
		this.datasetId = "";
		/**
		 * Creates the dataset for the queried tweets.
		 * @param datasetName
		 * @param twitterData
		 * @param featureData
		 */
		this.createDataset = function(datasetParam, callback) {
			var self = this;
			var dataset = sprintf('{' +
					'"title" : "%s",'+
					'"description" : "Twitter data collected from Yelp data on %s",' +
					'"attributes" : [ {"name" : "Name", "type" : "string" },' +
					               '{"name" : "Lat", "type" : "latitude", "description" : "Latitude coordinate of the tweet" },' +
					                '{"name" : "Lon", "type" : "longitude", "description" : "Longitude coordinate of the tweet"},' +
					                '{"name" : "Tweet", "type" : "string" },' +
					                '{"name" : "TweetID", "type": "string"} ]}', datasetParam.datasetName, datasetParam.featureData.name);
			$.ajax({
			    url: GEOIQ_DATASET_URL,
			    type: 'POST',
			    contentType : "application/json",
			    data: dataset,
			    beforeSend : this.setRequestHeader,
			    success: function(response) { 
			    	var jsonResponse = response;
			    	try{
			    		//for IE and firefox
			    		jsonResponse = JSON.parse(response);
			    	}
			    	catch(error) {
			    		//do nothing if it's in Chrome
			    	}
			    	
			    	self.datasetId = jsonResponse.id;
			    	callback(jsonResponse); 
			    },
			    error : this.onError
			});
		};

		/**
		 * 
		 * @param request
		 */
		this.setRequestHeader = function(request) {
			var requestHeader = new linbr.util.RequestHeader("hooliganlin", "password123");
			var auth = requestHeader.makeBaseAuth();
			request.setRequestHeader('Authorization', auth);
		};

		/**
		 * 
		 * @param error
		 */
		this.onError = function(error) {
			alert('Error in creating dataset: ' + error.responseText);
		};
	};	
		
	return new function() {
		this.getInstance = function(){
			if(instance === null) {
				instance = new Instance();
			}
			return instance;
		};
	};
	
})();

