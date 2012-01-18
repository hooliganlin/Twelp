/**
 * 
 * 
 */
var linbr = linbr || {};
linbr.geoiq = linbr.geoiq || {};
linbr.geoiq.Login = linbr.geoiq.Login || {};

var GEOIQ_USER_URL = "http://geocommons.com/users/%s.json";
var DEFAULT_USER_ID = "37172";

/**
 * Default constructor for Login object.
 */
linbr.geoiq.Login = function() {};

/**
 * Logs into the GeoCommons server with a valid
 * GeoCommons account.
 */
linbr.geoiq.Login.loginGeoIQ = function () {
	var username = $("#username").val();
	var pwd = $("#password").val();
	
	this.login = new linbr.geoiq.Login();
	this.login.setRequestHeader(username, pwd);
};

/**
 * Sets the request header when authenticating the REST call to the
 * user retrieve GeoCommons service.
 * @param username
 * @param pwd
 */
linbr.geoiq.Login.prototype.setRequestHeader = function(username, pwd) {
	var requestHeader = new linbr.util.RequestHeader(username, pwd);
	var auth = requestHeader.makeBaseAuth();
	
	$.ajax({
	    url: sprintf(GEOIQ_USER_URL, DEFAULT_USER_ID),
	    type: 'GET',
	    contentType : "application/json",
	    beforeSend : function(request) {
	    	request.setRequestHeader('Authorization', auth);
	    },
	    success: this.onSuccess,
	    error : this.onError
	});
	
};

/**
 * Loads the map onto the DOM if authenticating the login credentials
 * succeeds.
 * @param response
 */
linbr.geoiq.Login.prototype.onSuccess = function(response) {
	if(response) {
		var map = new linbr.view.Map("127297", "maker_map");
		map.loadMap();
		
		$("#login").fadeOut('slow');
	}
	else {
		alert(DEFAULT_USER_ID + " is not a valid user id from authentication header.");
	}
};

/**
 * Error handler when authentication fails with invalid credentials.
 * @param error
 */
linbr.geoiq.Login.prototype.onError = function(error) {
	alert('Login Error: ' + error.status + " " + error.statusText);
};