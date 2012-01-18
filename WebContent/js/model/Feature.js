/**
* Wrapper for GeoCommons Feature object
* 
* @author Bryan Lin
*/
var linbr = linbr || {};
linbr.model = linbr.model || {};
linbr.model.Feature = linbr.model.Feature || {};

linbr.model.Feature = function(feature) {
	this.feature = feature;
	this.fields = this.serializeFields(feature);
	
	/** common fields for all GeoCommons features **/
	this.guid = feature.guid;
	this.geometry = feature.geometry;
};

/**
 * Serializes the attribute fields that are not default GeoCommons
 * attributes into Objects.
 * @param feature The feature data retrieved from a GeoCommons dataset. 
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
 * Converts the Feature {Object} to an {Array}
 * @param showOnlyFields Flag to show only the fields or all feature details (geometry, guid, extent)
 * @returns {Array}
 */
linbr.model.Feature.prototype.toArray = function(showOnlyFields) {
	var featureArr = [];
	var listObj = showOnlyFields ? this.fields : this.feature;
	
	if(listObj) {
		for(key in listObj) {
			var tempArr = [];
			if(key == "date") {
				tempArr.push(key, listObj[key].time);
			}
			else {
				tempArr.push(key, listObj[key]);	
			}
			featureArr.push(tempArr);	
		}
	}
	return featureArr;
};
