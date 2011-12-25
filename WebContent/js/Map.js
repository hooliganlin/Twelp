/**
 * 
 */

/** namespace **/
var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.Map = linbr.view.Map || {};

/**
 * 
 * @param mapId
 * @param domId
 */
linbr.view.Map = function (mapId, domId) {
	var mapObj = this;
	this.geoIQMap = new F1.Maker.Map({ map_id: mapId,
										dom_id: domId,
										onMapLoaded : mapObj.populateLayers,
										onFeatureSelected : mapObj.showFeatureInfo
									});
};

/**
 * For testing purposes. Getting layers from the map and outputting on the table
 * 
 * @param map
 */
linbr.view.Map.prototype.populateLayers = function(map) {	
	/*var layers = map.getLayers();
	var layersTable = $("#layersTable > tbody:last");
	for (var i=0; i < layers.length; i++) {
		var layer = layers[i];
		layersTable.append('<tr><td>' + layer.title +'</td><td>' + layer.source +'</td></tr>');
	}*/
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
