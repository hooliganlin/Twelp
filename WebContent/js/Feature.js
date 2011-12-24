/**
* Wrapper for GeoCommons Feature object
*/
var linbr = linbr || {};
linbr.model = linbr.model || {};
linbr.model.Feature = linbr.model.Feature || {};

linbr.model.Feature = function(feature) {

	this.fields = this.serializeFields(feature);
	
	/** common fields for all GeoCommons features **/
	this.extent = this.serializeExtent(feature.extent);
	this.guid = feature.guid;
	this.geometry = feature.geometry;
};

/**
 * 
 */
linbr.model.Feature.prototype.serializeFields = function(feature) {
	var fieldObj = new Object();
	for(field in feature){
		if(field != "extent" && field != "geometry" && field != "guid") {
			fieldObj[field] = feature[field];
		}
	}
	return fieldObj;
};

/**
 * 
 * @param extentArray
 * @returns {Object}
 */
linbr.model.Feature.prototype.serializeExtent = function(extentArray) {
	var extentObj = new Object();
	for(var i = 0; i < extentArray.length; i++) {
		extentObj[i] = extentArray[i];
	}
	return extentObj;
};