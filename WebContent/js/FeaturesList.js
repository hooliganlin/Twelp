var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.FeaturesList = linbr.view.FeaturesList || {};

/**
 * FeaturesList view group. Displays the list of features selected.
 * @returns {linbr.view.FeaturesList}
 */
linbr.view.FeaturesList = function() {
	this.features = [];
};

/**
 * Populates the features selected in a list.
 * @param featuresMap
 */
linbr.view.FeaturesList.prototype.populateList = function(featuresMap) {
	this.features = featuresMap;
	var featuresDiv = $("#featuresDiv");
	featuresDiv.empty();

	//create a new div for each feature
	for(var fid in featuresMap) {
		var data = {'fid' : fid, 'feature' : featuresMap[fid]};
		var detailsDiv = this.createDetailsDiv(data);
		featuresDiv.append(detailsDiv);
	}
};

/**
 * Creates the feature details group.
 * @param data
 * @returns 
 */
linbr.view.FeaturesList.prototype.createDetailsDiv = function(data) {
	var detailsDiv = $(document.createElement('div'));
	detailsDiv.attr("class", "featureDetails");
	detailsDiv.attr('id', data.fid);
	
	var detailsLink = $(document.createElement('p'));
	detailsLink.attr('class', 'featureLink');
	detailsLink.html(data.feature.name);
	detailsLink.click(data, this.showOpDetails);
	
	detailsDiv.append(detailsLink);
	
	//create the operations div
	var opDiv = this.createOperationsDiv(data);	
	opDiv.append(this.createBufferDiv(data));
	
	detailsDiv.append(opDiv);
	return detailsDiv;
};
 
/**
 * Creates the operations group. The operations group includes
 * displaying the details and buffering the selected feature.
 * @returns opDiv for the selected feature.
 */
linbr.view.FeaturesList.prototype.createOperationsDiv = function(data) {
	var opDiv =  $(document.createElement('div'));
	opDiv.attr('class', 'opDiv ' + data.fid);
	
	var btnDetails = $(document.createElement('button'));
	var btnTweets = $(document.createElement('button'));
	
	btnDetails.attr('id', 'btnDetails' + data.fid);
	btnDetails.attr('type', 'button');
	btnDetails.html('Show Details');
	btnDetails.click(data, this.showFeatureDetails);
	
	btnTweets.attr('id', 'btnTweet'+data.fid);
	btnTweets.attr('type', 'button');
	btnTweets.html('Find Tweets');
	btnTweets.click(data, this.showBufferOps);
	
	opDiv.append(btnTweets, btnDetails);
	return opDiv;
};


/**
 * Display the operation details group
 * @param args
 */
linbr.view.FeaturesList.prototype.showOpDetails = function(args) {
	var data = args.data;
	$(".opDiv").hide();
	$("."+data.fid).toggle();
};

/**
 * Toggles the buffer option parameters
 * @param args
 */
linbr.view.FeaturesList.prototype.showBufferOps = function(args) {
	$(".buffer"+args.data.fid).toggle();
	var bufferAnalysis = new linbr.analysis.BufferAnalysis();
	bufferAnalysis.createBuffer(args.data.feature);
};

/**
 * Shows the feature details table 
 * @param args
 */
linbr.view.FeaturesList.prototype.showFeatureDetails = function(args) {
	var detailsGrid = new linbr.view.DetailsGrid();
	var feature = new linbr.model.Feature(args.data.feature);
	detailsGrid.populateGrid(feature);
};


/**
 * Creates the buffer form when a feature is selected.
 * @param data
 */
linbr.view.FeaturesList.prototype.createBufferDiv = function(data) {
	var bufferDiv = $(document.createElement('div'));
	bufferDiv.attr('class', 'bufferDiv buffer'+data.fid);
	bufferDiv.append("<label>Distance:<label><br />");
	
	var txtBufferDist = $(document.createElement('input'));
	txtBufferDist.attr('id', 'txtBufferDist'+data.fid);
	txtBufferDist.attr('type', 'text');
	
	var btnBuffer = $(document.createElement('button'));
	btnBuffer.attr('id', 'btnBuffer'+data.fid);
	btnBuffer.html('Buffer');
	
	btnBuffer.click(data, function(args) {
		alert('run buffer!!!');
	});
	
	bufferDiv.append(txtBufferDist, btnBuffer);
	return bufferDiv;
};