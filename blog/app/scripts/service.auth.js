app.service('service.auth', function () {

    /**
     * return k value for the site.
     */
    var AuthUtil = (function () {
        var k = Object.freeze({
            "k": "AIzaSyAOODMyvwKYBxGRTn2mIWNMJAFlUmFOEi8"
        });
        var getKey = function () {
            return k.k;
        };

        return {
            getKey: getKey
        }
    })();

    
    
    return {
        getKey: AuthUtil.getKey
    }
})