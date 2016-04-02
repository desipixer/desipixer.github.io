app.service('dp.service.auth', ['$q', function($q) {
	
	var username = "";
	var password = "";

	var apiKey = "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po";
	var clientSecret = "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com";

	var deferred = $q.defer();

	var getAPIKey = function(){
		return apiKey;
	}

	var getClientSecret = function(){
		return clientSecret;
	}

	var wordpress = {
		clientSecret : "xLnTWD9uy4ifdSubwWGrwV3bS0uqcxANCk5n4SIGacAYLXYuXqA3KHLD3VCn2Asr",
		token : "",
		clientId : "45936",
		getToken : function(){
			return "84916482ebe3";
		},
		getClientSecret : function(){
			return this.clientSecret;
		},
		getClientId : function(){
			return this.clientId;
		},
		settings : {
		  "client_id": "45936",
		  "client_secret": "xLnTWD9uy4ifdSubwWGrwV3bS0uqcxANCk5n4SIGacAYLXYuXqA3KHLD3VCn2Asr",
		  "url": {
		    "redirect": "http://desipixer.github.com/ui/#/home"
		  }
		}
	}





	var blogger = {
		getKey : function(){
			return apiKey;
		},
		getClientSecret : function(){
			return clientSecret;
		},
		logMeIn : function(){
			var key = this.getKey();
			var parameters = {
				client_id : this.getClientSecret(),
				immediate : false, 
				response_type : "token",
				scope : "http://www.blogger.com/feeds/"
			};
			gapi.auth.authorize(parameters,this.callbackFn);
		},
		callbackFn : function(data){
			this.accessToken = data.access_token;
			deferred.resolve(data);
		},
		getToken : function(){
			this.logMeIn();
			return deferred.promise;
		},
		getAuthToken : function(data){
			if(data != null){
				return "Bearer ".concat(data.access_token);
			} else {
				return null;
			}
		},
		accessToken : null
	}	

	return {
		getAPIKey : getAPIKey,
		getClientSecret : getClientSecret,
		wordpress : wordpress,
		blogger : blogger
	}
}]);