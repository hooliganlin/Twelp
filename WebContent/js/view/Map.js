/**
 * Map view component that displays the GeoIQ map.
 * 
 * @author Bryan Lin
 */
var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.Map = linbr.view.Map || {};

/**
 * Global scope map object. Is set when the map has been loaded.
 */
var geoIQMap = null;

/**
 * Map component that creates a GeoIQ map to be displayed
 * onto the page.
 * @param mapId The GeoCommons map id to be used.
 * @param domId DOM id which the map will be inserted.
 */
linbr.view.Map = function (mapId, domId) {
	this.mapObj = this;
	this.mapId = mapId;
	this.domId = domId;
};

/**
 * Loads the map onto the specified DOM.
 */
linbr.view.Map.prototype.loadMap = function() {
	this.geoIQMap = new F1.Maker.Map({ map_id: this.mapId,
		dom_id: this.domId,
		uiLayers: false,
		onLayerAdded : this.mapObj.onLayerAdded,
		onFeatureSelected : this.mapObj.showFeatureInfo
	});
	
	geoIQMap = this.geoIQMap;
};

/**
 * Layers added handler. 
 * @param args
 */
linbr.view.Map.prototype.onLayerAdded = function(args) {
	console.info("layer added:" + args);
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
