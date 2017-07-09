var urlService = (function(){

    var k = Object.freeze({
        k : "", // key
        cs : "" //client secret
    });

    var getKey = function(){
        return k.k;
    }

    return {
        getKey : getKey
    }
})();

module.exports = urlService;

