app.service('dp.service.auth', function() {
	
	var username = "";
	var password = "";

	var apiKey = "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po";
	var clientSecret = "";

	var getAPIKey = function(){
		return apiKey;
	}

	var getClientSecret = function(){
		return clientSecret;
	}	

	return {
		getAPIKey : getAPIKey,
		getClientSecret : getClientSecret
	}
});