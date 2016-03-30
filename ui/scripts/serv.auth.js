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

	var wordpress = {
		getToken : function(){
			return "84916482ebe3";
		}
	}

	var blogger = {
		getToken : function(){
			return apiKey;
		},
		getClientSecret : function(){
			return clientSecret;
		}
	}	

	return {
		getAPIKey : getAPIKey,
		getClientSecret : getClientSecret,
		wordpress : wordpress,
		blogger : blogger
	}
});