var com = com || {};
com.linbr = com.linbr || {};
com.linbr.FeaturesTable = com.linbr.FeaturesTable || {};

com.linbr.FeaturesTable = function() {
	this.features = [];
};

com.linbr.FeaturesTable.prototype.populateTable = function(features) {
	var featuresList = $("#featuresList");
	featuresList.empty();
	
	for(var i = 0; i < features.length; i++) {
		featuresList.append('<li>' + features[i].name + '</li>');
		
	}
};