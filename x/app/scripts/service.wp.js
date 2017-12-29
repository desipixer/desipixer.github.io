app.service('service.wp', function(){


    /**
     * Important links:
     * https://public-api.wordpress.com/rest/v1.1/sites/{{wpName}}/posts?fields=post_count
     * number : 100 (max), 
     * offset : 
     */
    

     /**
      * Use this function for posting to wordpress
      * Since we now able to support multiple posting, this should be indepedent.
      */
    function postToWp(wpBlogId, bearerToken, data, successCb, errFn){
        $http({
            method : 'POST', 
            url : "https://public-api.wordpress.com/rest/v1/sites/" + wpBlogId + "/posts/new",
            data : {
                title : data.title, 
                content : data.content, 
                categories : data.categories,
                tags : data.tags
            },
            headers : {
                "Authorization": "Bearer " + bearerToken
            }
        }).success(function(data){
            successCb(data);
        }).error(function(err){
            console.log("Error in postToWp >> ", err);
            errFn(err);
        });
    }   

    /**
     * Returns the post count for each wordpress blog.
     * @param {*} wpBlogName 
     */
    function getWpPostCount(wpBlogName, callbackFn, errFn){
        $http({
            method: 'GET',
            url : `https://public-api.wordpress.com/rest/v1.1/sites/${hostName}/posts?fields=found`
        }).success(function(data){
            callbackFn(data);
        }).error(function(data){
            console.log("Error in getWpPostCount >> ", err);
            errFn(err);
        });
    }

    

    return {
        postToWp : postToWp,
        getWpPostCount : getWpPostCount
    }
});