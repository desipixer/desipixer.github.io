app.service('authService', [function () {
    var k = Object.freeze({
        k: "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po"
    });
    var getKey = function () {
        return k.k;
    }

    var wp = Object.freeze(
        {
            "t": "PncPyS9JulhmQn5B)ZEdFFh$Nz2Eyfz%p3bG%di4kym*Yi66*or#06hxMURl9u4o",
            "id": "144185781",
            "u": "http://logmasters.wordpress.com"
        }
    );

    var getToken = function () {
        return wp.t;
    };

    var getWpId = function () {
        return wp.id;
    }

    return {
        k: getKey(),
        getToken: getToken,
        getWpId: getWpId
    }
}]);