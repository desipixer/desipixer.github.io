/**
 * Takes care of all wordpress services.
 */
app.service('service.wp', ['service.util', function(utilService){


    function getPostWpUrl(wpBlogId = ''){
        return `https://public-api.wordpress.com/rest/v1/sites/${wpBlogId}/posts/new`;
    }

    /**
     * Generates HTML for Wordpress POST.
     * It cleans url for title and generates HTML with div tab.
     * @param {*} arr 
     */
    function generatePostHtml(arr) {
        if (arr) {
            var str = "";
            arr.forEach(function (value, index) {
                var imgTitle = utilService.getCleanTitleName(value);
                var src = value;
                str += `<div id='postContainer'><h2> ${imgTitle} </h2> <div id='picContainer'><img src='${src}' title='${imgTitle}' alt='photo desipixer' /></div></div>`;
            });
            return str;
        }
        return "";
    }

    return {
        getPostWpUrl : getPostWpUrl,
        generatePostHtml : generatePostHtml
    }

}]);