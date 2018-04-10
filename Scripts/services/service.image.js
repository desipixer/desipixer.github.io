app.service('serviceimage', ['$http', '$q', 'blogutil', "service.data", "settings", "authService",
    function ($http, $q, blogutil, dataService, settings, authService) {

        var _this = this;
        var bloggerKey = authService.getKey();
        var selPostBlog = settings.defaultBlogId;
        var startIndex = settings.startIndex;
        var maxResults = settings.maxResults;
        var totalItems = settings.totalItems;
        var blogId = null;
        var entries = [];

        this.getBlogId = function(blogName){
            return axios.get(getBlogNameById(blogName));
        }


        function getBlogNameById(blogName){
            return `https://www.googleapis.com/blogger/v3/blogs/byurl?params=${bloggerKey}&url=${blogName}`;
        }


        return {

        }
    }]);