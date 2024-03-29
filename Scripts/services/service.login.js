
/**
 * This module will be used as LoginService which interacts with Google services.
 * 
 */

app.service('loginService', ['$http', '$q', function ($http, $q) {

    this.accessToken = null;
    this.apiData = null;
    const DP_AUTH_TOKEN_KEY = "dpAuthToken";
    const DP_EXPIRATION_TIME_KEY = "dpExpirationTime";

    let _this = this;
    var deferred = $q.defer();

    //clientKeys
    let ck = [{
        "name": "key1",
        "key": "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com"
    }, {
        "name": "key2",
        "key": "215192364453-j0vhrg3fl205k4gdqk30eic72rg12out.apps.googleusercontent.com"
    }, {
        "name": "key3",
        "key": "215192364453-3qtb7m8oocgu684qsfipkpdac6ntsjto.apps.googleusercontent.com"
    }];

    this.logMeIn = function () {


        var selectedKey = ck[0].key;
        var parameters = {
            client_id: selectedKey,
            immediate: false,
            response_type: "token",
            scope: "http://www.blogger.com/feeds/"
        };

        var parameters2 = {
            "client_id": selectedKey,
            "scope": "http://www.blogger.com/feeds/",
            "response_type": "permission",
            "prompt": "consent"
        }
        // gapi.auth.authorize(parameters, this.callbackFn);



        gapi.auth2.authorize(parameters2, this.callbackFn);

    }

    /**
     * Once Google API call is successful, set accessToken.
     * Reuse it whenever possible.
     */
    this.callbackFn = function (data) {
        _this.apiData = data;
        _this.accessToken = data.access_token;
        setAccessToken(data.access_token);
        deferred.resolve(data);
    }

    this.getToken = function () {
        if (getAccessToken()) {
            var data = {
                "access_token": getAccessToken()
            };
            deferred.resolve(data);
            return deferred.promise;
        }
        else if (_this.apiData) {
            deferred.resolve(this.apiData);
            return deferred.promise;
        } else {
            _this.logMeIn();
        }
        return deferred.promise;
    }

    /**
     * check if sessionStorage contains accessToken already.
     * If present, check for expiration time,
     * If not return null, so value can be set.
     */
    function getAccessToken(){
        if(window.sessionStorage && window.sessionStorage.getItem(DP_AUTH_TOKEN_KEY)){
            // check for expiration time.
            var expTime = window.sessionStorage.getItem(DP_EXPIRATION_TIME_KEY);
            if(!expTime){
                return null;
            }
            if(expTime > new Date().getTime()){
                return window.sessionStorage.getItem(DP_AUTH_TOKEN_KEY);
            }
        }
        return null;
    }

    function setAccessToken(accessToken = null){
        var currentTime = new Date();
        var expirationTime = currentTime.setMinutes(currentTime.getMinutes() + 60);
        if(window.sessionStorage){
            window.sessionStorage.setItem(DP_AUTH_TOKEN_KEY, accessToken);
            window.sessionStorage.setItem(DP_EXPIRATION_TIME_KEY, expirationTime);
        } else {
            // doesn't support session storage.
            console.log("ERROR >> Browser doesn't support session storage");
        }
    }

    return {
        logMeIn: this.logMeIn,
        callbackFn: this.callbackFn,
        getToken: this.getToken,
        clientKeys: this.clientKeys
    }
}]);