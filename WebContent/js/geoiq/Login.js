/**
 * Login credentials for GeoCommons.
 * @author linbr
 */
var linbr = linbr || {};
linbr.geoiq = linbr.geoiq || {};
linbr.geoiq.Login = linbr.geoiq.Login || {};

var GEOIQ_USER_URL = "http://geocommons.com/users/%s.json";
var DEFAULT_USER_ID = "37172";

/**
 * Singleton object for Logins. There can only be one login per session.
 */
linbr.geoiq.Login = (function() {

	var instance = null;
	function Instance() {

		/**
		 * Sets the request header when authenticating the REST call to the
		 * user retrieve GeoCommons service.
		 * @param username
		 * @param pwd
		 */
		this.setRequestHeader = function(username, pwd) {
			var self = this;
			var requestHeader = new linbr.util.RequestHeader(username, pwd);
			this.authentication = requestHeader.makeBaseAuth();
			
			$.ajax({
			    url: sprintf(GEOIQ_USER_URL, DEFAULT_USER_ID),
			    type: 'GET',
			    contentType : "application/json",
			    beforeSend : function(request) {
			    	request.setRequestHeader('Authorization', self.authentication);
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
		this.onSuccess = function(response) {
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
		this.onError = function(error) {
			alert('Login Error: ' + error.status + " " + error.statusText);
		};

		
	};
	
	return new function() {
		this.getInstance = function(){
			if(instance === null) {
				instance = new Instance();
			}
			return instance;
		};
	};
	
	
})();

/**
 * Logs into the GeoCommons server with a valid
 * GeoCommons account. Global scope function.
 */
linbr.geoiq.Login.loginGeoIQ = function () {
	var username = $("#username").val();
	var pwd = $("#password").val();

	linbr.geoiq.Login.getInstance().setRequestHeader(username, pwd);
};


