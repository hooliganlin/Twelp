var linbr = linbr || {};
linbr.view = linbr.view || {};
linbr.view.DetailsGrid = linbr.view.DetailsGrid || {};


linbr.view.DetailsGrid = function(feature) {
	
};

/**
 * 
 * @param feature linbr.model.Feature
 */
linbr.view.DetailsGrid.prototype.populateGrid = function(feature) {

	var analysisDiv = $("#analysisDiv");
	analysisDiv.html('<table cellpadding="0" cellspacing="0" border="1" class="display" id="detailsTable"></table>');

	var columnArr = [ { "sTitle": "Field Name" },
	                { "sTitle": "Value" },
	              ];
	
	$("#detailsTable").dataTable({
		"aaData" : feature.fields,
		"aoColumns" : columnArr,
		"bFilter" : false,
		"bInfo" : false,
		"bPaginate" : false,
		"bLengthChange " : false
	});
	
	/*for(key in feature) {
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
	}*/
	
};