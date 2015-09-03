app.controller('homeCtrl', function ($scope, imageService, loginService, postService, $sce, $location,$q,$http) {
    $scope.xStartIndex = 0;
    $scope.xThumbnails = [];

    imageService.getBlogId("http://www.desipixer.in").then(function (data) {
        $scope.blogId = data.id;
        imageService.blogId = data.id;
        imageService.totalItems = data.posts.totalItems;
        $scope.totalItems = data.posts.totalItems;
        imageService.getPosts(data.id,imageService.startIndex).then(function (data) {
            $scope.blogPosts = data;
            $scope.imageThumb = imageService.getThumbnails(data);
            $scope.startIndex = imageService.startIndex;
        });
    });

    $scope.getSite = function (blogName,startIndex) {
        imageService.getBlogId(blogName).then(function (data) {
            imageService.blogId = data.id;
            $scope.blogId = data.id;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            imageService.getPosts(data.id, startIndex).then(function (data) {
                $scope.imageThumb = imageService.getThumbnails(data);
                $scope.startIndex = imageService.startIndex;
            });
        });
    }

    $scope.getBlogName = function()
    {
        imageService.getBlogId($scope.txtBlogName).then(function (data) {
        $scope.blogId = data.id;
        imageService.blogId = data.id;
        imageService.totalItems = data.posts.totalItems;
        $scope.totalItems = data.posts.totalItems;
        imageService.getPosts(data.id,imageService.startIndex).then(function (data) {
            $scope.blogPosts = data;
            $scope.imageThumb = imageService.getThumbnails(data);
            $scope.startIndex = imageService.startIndex;
        });
    });
        
    }

    $scope.queryText = function(searchQuery)
    {
        imageService.getBlogId(blogName).then(function (data) {
            imageService.blogId = data.id;
            $scope.blogId = data.id;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            imageService.getSearchPosts(data.id, startIndex,searchQuery).then(function (data) {
                $scope.imageThumb = imageService.getThumbnails(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    $scope.getNextPosts = function () {
        //console.log($scope.siteList);
        imageService.startIndex += 500;
        $scope.getSite($scope.siteList, imageService.startIndex );
    }

    $scope.getPreviousPosts = function () {
        //console.log($scope.siteList);
        if (imageService.startIndex - 500 > 0)
        {
            imageService.startIndex -= 500;
        }
        $scope.getSite($scope.siteList, imageService.startIndex);
    }

    $scope.selectedSite = function () {
        
        //console.log($scope.siteList);
        imageService.startIndex = 0001;
        $scope.getSite($scope.siteList, imageService.startIndex);
    }

    $scope.sitesList = imageService.getBlogList();

    $scope.isActive = function (viewLocation) {
        return !(viewLocation === $location.path());
    };

    $scope.IsLoggedIn = function ()
    {
        if ($scope.accessToken == null) {
            return false;
        }
        else {
            return true;
        }
    }

    $scope.displayData = [];

    $scope.sortBlogs = function(){
        var tempArray = [];
        for(var i=0; i < $scope.sitesList.length; i++){
            var tempURL = "https://www.googleapis.com/blogger/v3/blogs/byurl?url="+$scope.sitesList[i].blogURL +"&key="+imageService.bloggerKey;
            tempArray.push($http.get(tempURL));
        }
        $q.all(tempArray).then(function(result){
            for(var i=0; i< result.length ; i++){
                var data = result[i].data;
                var tempObj = {
                    blogId : data.id,
                    blogURL : data.url,
                    name : data.name,
                    category: 1,
                    totalItems : data.posts.totalItems,
                    updated : Date.parse(new Date(data.updated))
                }
                $scope.displayData.push(tempObj);
            }

            var sortDate = function(obj1, obj2){
                return obj2.updated - obj1.updated;
            }

            $scope.displayData.sort(sortDate);

            $scope.sitesList = $scope.displayData;   
        });
    }
    

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    $scope.userLogin = function () {
        loginService.getToken().then(function (data) {
            $scope.accessToken = data.access_token;
        });
        gapi.client.setApiKey('AIzaSyDcuceGVU4MBMVxUYV3Ozu2L211eo8dTdI');

    }



});


app.controller('messageCtrl', function ($scope, $routeParams, $sce, imageService, $rootScope, postService) {
    $scope.messageId = $routeParams.messageId;
    var html = imageService.entries[$routeParams.messageId].content.$t;
    var linkLength = imageService.entries[$routeParams.messageId].link.length;

    var link = linkLength > 1 ? imageService.entries[$routeParams.messageId].link[linkLength - 1].href : "";
    //debugger;
    var resizedHtml = html.replace(new RegExp("s1600", "g"), "s320");
    //debugger;
    var getHTML = function () {
        var imageArray = $($.parseHTML(resizedHtml)).find('img');
        var imageSrc = "";
        $(imageArray).each(function () {
            var href = this.src.replace(new RegExp("s320", "g"), "s1600");
            imageSrc = imageSrc + "<a href='" + href + "'  target='_blank'><img src='" + this.src + "' /></a>";
        });
        return imageSrc;
    }

    var getPostHTML = function () {
        var imageArray = $($.parseHTML(resizedHtml)).find('img');
        var imageSrc = "";
        $(imageArray).each(function () {
            var href = this.src;
            if (href.indexOf("blogspot") > -1) {
                var imgThumbURL = href.replace(href.split('/')[href.split('/').length - 2], 's1600');
                href = imgThumbURL;
            }
            imageSrc = imageSrc + '<a href="' + href + '" onclick="window.open(&#39;http://www.desipixer.in&#39;)" target="_blank"><img src="' + href + '" /></a>';
        });
        return imageSrc;
    }
    //var pubDate = new Date(imageService.entries[$routeParams.messageId].published.$t);
    //console.log(imageService.entries[$routeParams.messageId]);
    //$scope.publishedDate = new Date(pubDate);

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
    $scope.body = '<div>' + getHTML() + ' </div>';
    $scope.postTitle = imageService.entries[$routeParams.messageId].title.$t;


    $scope.postFunction = function (postObject) {
        var postObject = {};
        postObject.blogId = "7833828309523986982";
        postObject.postContent = '<div>' + getPostHTML() + '</div>';
        postObject.postTitle = $scope.postTitle;
        console.log(postObject);
        postService.postFunction(postObject);
    }

});