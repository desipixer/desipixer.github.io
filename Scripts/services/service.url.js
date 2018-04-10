app.service('urlService', ['authService', function (authService) {

    var getBlogIdUrl = function(blogName){
        key = authService.k;
        return `https://www.googleapis.com/blogger/v3/blogs/byurl?key=${key}&url=${blogName}`;
    }

    var getBlogFeedUrl = function(blogId = '7833828309523986982', startIndex = 1, maxResults = 500){
        return `https://www.blogger.com/feeds/${blogId}/posts/default?start-index=${startIndex}&max-results=${maxResults}&alt=json&callback=JSON_CALLBACK`;
    }

    return {
        getBlogIdUrl : getBlogIdUrl,
        getBlogFeedUrl : getBlogFeedUrl
    }
}]);