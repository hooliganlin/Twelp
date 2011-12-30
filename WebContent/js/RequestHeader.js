/**
 *  Utility class to create the authentication request header
 *  
 *  @author Bryan Lin
 */
var linbr = linbr || {};
linbr.util = linbr.util || {};
linbr.util.RequestHeader = linbr.util.RequestHeader || {};

/**
 * Utility class to create the authentication request header
 * @param username
 * @param password
 * @returns {linbr.util.RequestHeader}
 */
linbr.util.RequestHeader = function(username, password) {
	this.username = username;
	this.password = password;
};


/**
 * http://coderseye.com/2007/how-to-do-http-basic-auth-in-ajax.html
 * @returns {String}
 */
linbr.util.RequestHeader.prototype.makeBaseAuth = function () {
	 var tok = this.username + ':' + this.password;
	 var hash = Base64.encode(tok);
	 return "Basic " + hash;
};