var com = com || {};
com.linbr = com.linbr || {};
com.linbr.FeaturesTable = com.linbr.FeaturesTable || {};

com.linbr.FeaturesTable = function() {
	this.features = [];
};

com.linbr.FeaturesTable.prototype.populateTable = function(features) {
	
	var self = this;
	this.features = features;
	var featuresList = $("#featuresList");
	featuresList.empty();
	
	for(var i = 0; i < features.length; i++) {
		//create the lsit item and its attributes
		var fid = 'f'+i;
		var listItem = document.createElement('li');
		listItem.setAttribute('id', fid);
		listItem.innerHTML = sprintf("<a href='#'>%s</a></li>", features[i].name);
		listItem.onclick = function() {
			var feature = self.features[i];
			self.showFeatureDetails(feature);
		};
		
		featuresList.append(listItem);
	}
};

com.linbr.FeaturesTable.prototype.showFeatureDetails = function(args) {
	alert(args);
};