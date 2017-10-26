app.service('service.auth', function () {

    /**
     * return k value for the site.
     */
    var AuthUtil = (function () {
        var k = Object.freeze({
            "k": "AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE"
        });
        var getKey = function () {
            return k.k;
        };

        return {
            getKey: getKey
        }
    })();

    var WpAuth = (function(){
        
        var getWpAuth = {
            "k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
            "id": "137728983",
            "url": "http://pixer12wp.wordpress.com"
        }

        return {
            getWpAuth : getWpAuth
        }
    })();
    
    return {
        getKey: AuthUtil.getKey,
        getWpAuth : WpAuth.getWpAuth
    }
})