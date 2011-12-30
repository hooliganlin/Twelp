/**
 * This view component handles the features that are to be displayed in 
 * a list when it has been selected from the map. The FeaturesList
 * component lists each feature that has been selected and provides two
 * operations: 
 * 1) Finding Tweets around the selected feature
 * 2) Displaying the selected feature's attributes.
 * 
 * @author Bryan Lin
 */
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
	btnDetails.attr('class', 'btnClass');
	btnDetails.html('Show Details');
	btnDetails.button();	//jQuery button style widget
	btnDetails.click(data, this.showFeatureDetails);
	
	btnTweets.attr('id', 'btnTweet'+data.fid);
	btnTweets.attr('type', 'button');
	btnTweets.html('Find Tweets');
	btnTweets.attr('class', 'btnClass');
	btnTweets.button();		//jQuery button style widget
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
	
	var cbBufferUnits = $(document.createElement('select'));
	cbBufferUnits.attr('id', 'cbBufferUnits');
	cbBufferUnits.append("<option value='mi'>Miles</option><option value='km'>Kilometers</option>");
	
	var btnBufferDiv = $(document.createElement('div'));
	btnBufferDiv.attr('id', 'btnBufferDiv');
	
	var btnBuffer = $(document.createElement('button'));
	btnBuffer.attr('id', 'btnBuffer'+data.fid);
	btnBuffer.html('Buffer');
	btnBuffer.button();
	btnBuffer.click(data, this.runTwitterAnalysis);
	btnBufferDiv.append(btnBuffer);
	
	bufferDiv.append(txtBufferDist, cbBufferUnits, btnBufferDiv);
	return bufferDiv;
};

/**
 * Creates a TwitterAnalysis object to find tweets and trends of the selected
 * feature.
 * @param args The feature and radius for the query
 */
linbr.view.FeaturesList.prototype.runTwitterAnalysis = function(args) {
	try {
		var data = args.data;
		var radius = parseFloat($("#txtBufferDist"+data.fid).val());
		var units = $("#cbBufferUnits option:selected").val();
		var twitterArgs = {};
		twitterArgs['query'] = data.feature.name;
		twitterArgs['lat'] = data.feature.extent[0];
		twitterArgs['long'] = data.feature.extent[2];
		twitterArgs['radius'] = radius;
		twitterArgs['units'] = units;
		
		var twitterAnalysis = new linbr.twitter.TwitterAnalysis();
		twitterAnalysis.findTweets(twitterArgs, function(twitterResponse) {
			var datasetCreator = linbr.geoiq.DatasetCreator.getInstance();
			var featureCreator = linbr.geoiq.FeatureCreator.getInstance();
			var datasetName = sprintf("Twitter Data: %s - %s%s buffer", data.feature.name, radius, units);
			var datasetParam = { "datasetName" : datasetName, "twitterResponse" : twitterResponse, "featureData" : data.feature };
			
			//create an empty dataset for the queried tweets
			datasetCreator.createDataset(datasetParam, function(response) {
				console.info("Successfully created dataset: " + response.title + " with id: " + response.id);		
				featureCreator.addFeature(twitterResponse, response.id);
				
				//display the tweets in the results details grid
				var detailsGrid = new linbr.view.DetailsGrid();
				detailsGrid.populateTweets(twitterResponse);
				$("#progressBar").remove();
				$("#btnBuffer"+data.fid).button("option", "disabled", false);
			});
		});
		
		//create a loading screen while creating the twitter dataset
		var progressBar = $(document.createElement('div'));
		progressBar.attr('id', "progressBar");
		progressBar.attr('align', "center");
		progressBar.progressbar({value : 100});

		$(".buffer"+data.fid).append(progressBar);
		$("#btnBuffer"+data.fid).button("option", "disabled", true);
	}
	catch (exception){
		alert(exception);
	}
};
