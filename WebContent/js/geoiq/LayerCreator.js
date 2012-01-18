/**
 * Singleton class which creates a layer from a dataset id.
 * The dataset must exist on the GeoCommons server before a layer
 * can be added to the map.
 * 
 * @author Bryan Lin
 */
var linbr = linbr || {};
linbr.geoiq = linbr.geoiq || {};
linbr.geoiq.LayerCreator= linbr.geoiq.LayerCreator|| {};

/**
 * Singleton class which creates a layer from a dataset id.
 * The dataset must exist on the GeoCommons server before a layer
 * can be added to the map.
 */
linbr.geoiq.LayerCreator = (function() {

	var instance = null;
	function Instance(){
		
		/**
		 * Adds the selected dataset from its ID as a layer
		 * onto the GeoIQ map.
		 */
		this.addLayer = function(datasetId) {
			geoIQMap.addLayer({ source : "finder:" + datasetId,
								zoomToExtent : true,
								styles : { icon: { symbol : "pushpinIcon", size:1, color : 0xFF0000},  
										   stroke: { color: 0x00FF00, alpha: .5, weight : 3}}
			});
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