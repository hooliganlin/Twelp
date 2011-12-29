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
										onMapLoaded : mapObj.onMapLoaded,
										onFeatureSelected : mapObj.showFeatureInfo
									});
};

/**
 * When all layers are loaded for the premade map, create an empty datasets
 * for the Twitter feeds.
 * @param map
 */
linbr.view.Map.prototype.onMapLoaded = function(args) {
	
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
