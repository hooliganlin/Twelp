/**
 * 
 */

/** namespace **/
var com = com || {};
com.linbr = com.linbr || {};
com.linbr.Map = com.linbr.Map || {};


com.linbr.Map = function (mapId, domId) {
	this.geoIQMap = new F1.Maker.Map({ map_id: mapId,
										dom_id: domId,
										uiLayers : true
									});
	
	this.geoIQMap.setCallback('onMapLoaded', this.showEvent('onMapLoaded','wooo'));
	
};

com.linbr.Map.prototype.initializeMapComponents = function() {	

};

com.linbr.Map.prototype.showEvent = function (eventName, message) {
	$("callback_results").innerHTML += eventName + " = " + message + "<br/>" ;
};