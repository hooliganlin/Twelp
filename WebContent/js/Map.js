/**
 * 
 */

/** namespace **/
var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.Map = linbr.view.Map || {};


var mapObj;
/**
 * 
 * @param mapId
 * @param domId
 */
linbr.view.Map = function (mapId, domId) {
	var mapObj = this;
	this.geoIQMap = new F1.Maker.Map({ map_id: mapId,
										dom_id: domId,
										onLayerLoaded : mapObj.onLayersLoaded,
										onFeatureSelected : mapObj.showFeatureInfo
									});
};

/**
 * For testing purposes. Getting layers from the map and outputting on the table
 * 
 * @param map
 */
linbr.view.Map.prototype.onLayersLoaded = function(args) {
	
	/** TODO  figure out if charts should be implemented**/ 
	F1.Visualizer.utils.get_data_from_flash("2", function(data) {
	    var features = jq.map(data.features, function(feature) { 
	    if (feature) { 
	    	return feature.attributes;
	    } 
	  });

	    data.features = features;
	    F1.Visualizer.charts.grid(600, "100%", data, "projects-table");
	 }, mapObj.geoIQMap);
};

/**
 * Displays the feature info in a list outside the map.
 * 
 * @param features
 */
linbr.view.Map.prototype.showFeatureInfo = function(features) {
	
	//convert list to hashmap
	var featuresMap = {};
	for (var i = 0; i < features.length; i++) {
		var fid = "f" + i;
		featuresMap[fid] = features[i];
	}
	
	var featuresList = new linbr.view.FeaturesList();
	featuresList.populateList(featuresMap);
};
