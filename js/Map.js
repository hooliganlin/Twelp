/**
 * 
 */

/** namespace **/
var com = com || {};
com.linbr = com.linbr || {};
com.linbr.Map = com.linbr.Map || {};

/**
 * 
 * @param mapId
 * @param domId
 */
com.linbr.Map = function (mapId, domId) {
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
 */
com.linbr.Map.prototype.populateLayers = function(map) {	
	var layers = map.getLayers();
	var layersTable = $("#layersTable > tbody:last");
	for (var i=0; i < layers.length; i++) {
		var layer = layers[i];
		layersTable.append('<tr><td>' + layer.title +'</td><td>' + layer.source +'</td></tr>');
	}
};

/**
 * Displays the feature info in a table outside the map.
 */
com.linbr.Map.prototype.showFeatureInfo = function(features) {
	var featuresTable = new com.linbr.FeaturesTable();
	featuresTable.populateTable(features);
};
