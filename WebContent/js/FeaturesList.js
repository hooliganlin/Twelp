var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.FeaturesList = linbr.view.FeaturesList || {};

linbr.view.FeaturesList = function() {
	this.features = [];
};

/**
 * 
 * @param featuresMap
 */
linbr.view.FeaturesList.prototype.populateTable = function(featuresMap) {
	this.features = featuresMap;
	var featuresDiv = $("#featuresDiv");
	featuresDiv.empty();

	//create a new div for each feature
	for(var fid in featuresMap) {
		var detailsDiv = this.createDetailsDiv(fid, featuresMap[fid]);
		featuresDiv.append(detailsDiv);
	}
};

/**
 * 
 * @param id
 * @param feature
 * @returns
 */
linbr.view.FeaturesList.prototype.createDetailsDiv = function(id, feature) {
	var self = this;
	var detailsDiv = $(document.createElement('div'));
	detailsDiv.attr("class", "featureDetails");
	detailsDiv.attr('id', id);
	
	var detailsLink = $(document.createElement('p'));
	detailsLink.attr('class', 'featureLink');
	detailsLink.html(feature.name);
	detailsLink.click({ 'fid' : id,
						'feature' : feature }, function(args){
							self.showOpDetails(args);
					});
	
	detailsDiv.append(detailsLink);
	
	//create the operations div
	var opDiv = this.createOperationsDiv(id);
	detailsDiv.append(opDiv);
	
	return detailsDiv;
};
 
/**
 * 
 * @returns
 */
linbr.view.FeaturesList.prototype.createOperationsDiv = function(id) {
	var opDiv =  $(document.createElement('div'));
	opDiv.attr('class', 'opDiv '+id);
	
	var btnDetails = $(document.createElement('button'));
	var btnTweets = $(document.createElement('button'));
	
	btnDetails.attr('id', 'btnDetails');
	btnDetails.attr('type', 'button');
	btnDetails.html('Show Details');
	
	btnTweets.attr('id', 'btnTweets');
	btnTweets.attr('type', 'button');
	btnTweets.html('Find Tweets');
	
	/** TODO : implements onclick **/
	
	opDiv.append(btnTweets, btnDetails);
	return opDiv;
};


/**
 * 
 * @param args
 */
linbr.view.FeaturesList.prototype.showOpDetails = function(args) {
	var data = args.data;
	$(".opDiv").hide();
	$("."+data.fid).toggle();
	/*var fid = args.fid;
	var feature = new com.linbr.Feature(args.feature);
	if($('#'+fid).children() == None) {
		var detailsDiv = $(document.createElement('div'));
		detailsDiv.attr('id', 'detailsDiv');
		detailsDiv.append(this.buildDetailsTable(feature));
	}
	

	$('#'+fid).append(detailsDiv);*/
};

/**
 * 
 * @param feature
 * @returns
 */
linbr.view.FeaturesList.prototype.buildDetailsTable = function(feature) {
	
	var table = $(document.createElement('table'));
	table.attr('id', 'detailsTable');
	table.attr('border', '1');
	table.append("<thead><tr><th>Field</th><th>Value</th></tr></thead><tbody id='detailsBody'><tr></tr></tbody>");

	for(key in feature) {
		//populate the unique fields
		if(key == "fields") {
			var fieldsObj = feature[key];
			for(fieldName in fieldsObj) {
				var row = $(document.createElement('tr'));
				var tdField = $(document.createElement('td'));
				var tdValue = $(document.createElement('td'));
				tdField.html(fieldName);
				tdValue.html(fieldsObj[fieldName]);
				
				row.append(tdField);
				row.append(tdValue);
				$("#detailsBody").append(row);
			}
		}
		else {
			//tdField.append(key);
			//tdValue.append(feature[key]);
		}
		
		//$("#detailsBody").append(row);
	}
	
	
	return table;
};