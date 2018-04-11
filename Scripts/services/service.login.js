/**
 * This module will be used as LoginService which interacts with Google services.
 * 
 */

app.service('loginService', ['$http', '$q', function ($http, $q) {

    this.accessToken = null;
    this.apiData = null;

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
        window.sessionStorage.setItem('dpAuthToken', data.access_token);
        deferred.resolve(data);
    }

    this.getToken = function () {
        if (window.sessionStorage.getItem('dpAuthToken')) {
            var at = window.sessionStorage.getItem('dpAuthToken');
            var data = {
                "access_token": at
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

    return {
        logMeIn: this.logMeIn,
        callbackFn: this.callbackFn,
        getToken: this.getToken,
        clientKeys: this.clientKeys
    }
}]);