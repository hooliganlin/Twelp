/**
 * This singleton class adds each geotagged Tweet as a feature in the dataset,
 * which is stored in GeoCommons.
 * @author Bryan lin
 */
var linbr = linbr || {};
linbr.geoiq = linbr.geoiq || {};
linbr.geoiq.FeatureCreator= linbr.geoiq.FeatureCreator|| {};

var GEOIQ_CREATE_FEATURE_URL = "http://geocommons.com/datasets/%s/features.json";

/**
 * Singleton object to create twitter features in a created dataset stored in GeoCommons.
 */
linbr.geoiq.FeatureCreator = (function() {

	var instance = null;
	function Instance(){
		
		/**
		 * Adds Twitter features that have associated geocode
		 * @param twitterData The queried Tweet results
		 * @param datasetId The associated dataset's ID that was created.
		 */
		this.addFeature = function(twitterData, datasetId) {
			try{
				var jsonData = "";
				var twitterResults = twitterData.results;
				if(twitterResults.length > 0) {
					var featuresArr = [];
					for(var i = 0; i < twitterResults.length; i++) {
						if(twitterResults[i].geo != null) {
							//create a feature from the geo property
							var lat = twitterResults[i].geo.coordinates[0];
							var lon = twitterResults[i].geo.coordinates[1];
							var jsonFeature = {
												Name : twitterResults[i].from_user, 
												TweetID : twitterResults[i].id_str, 
												Tweet : twitterResults[i].text, 
												Lat : lat, 
												Lon : lon, 
												geometry : { 
															type : twitterResults[i].geo.type, 
															coordinates : [lon, lat] 
															}
											};
						
							featuresArr.push(jsonFeature);
						}
					}
					jsonData = JSON.stringify(featuresArr);
					if(jsonData != "[]") {
						//only add features that have associated coordinates
						$.ajax({
						    url: sprintf(GEOIQ_CREATE_FEATURE_URL, datasetId),
						    type: 'POST',
						    contentType : "application/json",
						    data: jsonData,
						    beforeSend : this.setRequestHeader,
						    success: function(response) { 
						    	console.info("Added features: " + jsonData);
						    	linbr.geoiq.LayerCreator.getInstance().addLayer(datasetId);
						    },
						    error : this.onError
						});
					}
				}
				else {
					console.info("No results found for the feature");
				}
			}
			catch(error) {
				throw error;
			}
		};
		
		/**
		 * Create the request header for authentication
		 * TODO : Take out this username and password and create login!!!!
		 * @param request
		 */
		this.setRequestHeader = function(request) {
			//For test purposes only
			var requestHeader = new linbr.util.RequestHeader("hooliganlin", "password123");
			var auth = requestHeader.makeBaseAuth();
			request.setRequestHeader('Authorization', auth);
		};
		
		/**
		 * Error callback handler
		 * @param error
		 */
		this.onError = function(error) {
			alert('Error in creating feature: ' + error.responseText);
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