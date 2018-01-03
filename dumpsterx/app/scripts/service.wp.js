/**
 * Takes care of all wordpress services.
 */
app.service('service.wp', function(){


    function getPostWpUrl(wpBlogId = ''){
        return `https://public-api.wordpress.com/rest/v1/sites/${wpBlogId}/posts/new`;
    }

    return {
        getPostWpUrl : getPostWpUrl
    }

});