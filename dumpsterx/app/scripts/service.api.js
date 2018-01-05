app.service('service.api', ['service.wp', function(wpService){

    // new api for wordpress related API calls.


    function getPosts(url){
        try {
            var myUrl = new URL(url);
            var hostName = hostUrl.hostname;
            return `https://public-api.wordpress.com/rest/v1.1/sites/${hostName}/posts?number=100`;
        } catch(ex){
            console.log("ERROR >> getposts() >> ", ex);
        }
    }

    /**
     * Generate list of links to be fetched.
     * @param {*} hostName 
     * @param {*} foundNumber 
     */
    function generateWpLinks(hostName, foundNumber){
        var urlArray = [];
        for(var i=0; i< foundNumber; i++){
            var wpUrl = `https://public-api.wordpress.com/rest/v1.1/sites/${hostName}/posts?number=100&offset=${i}`;
            urlArray.push(wpUrl);
        }
        return urlArray;
    }

    return {
        getPosts : getPosts,
        generateWpLinks : generateWpLinks
    }
}]);