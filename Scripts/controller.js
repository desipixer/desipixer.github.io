app.controller('homeCtrl', function ($scope, imageService, loginService, postService, $sce, $location,$q,$http,blogutil) {
    $scope.xStartIndex = 0;
    $scope.xThumbnails = [];
    $scope.feedObj = [];
    $scope.startIndex = imageService.startIndex;
    $scope.clientKeys = loginService.clientKeys;
    $scope.clientKey = $scope.clientKeys[0];

    imageService.getBlogId("http://www.desipixer.in").then(function (data) {
        $scope.blogId = data.id;
        imageService.blogId = data.id;
        imageService.totalItems = data.posts.totalItems;
        $scope.totalItems = data.posts.totalItems;
        imageService.getPosts(data.id,imageService.startIndex).then(function (data) {
            $scope.blogPosts = data;

            blogutil.parseFeed(data);
            $scope.feedObj = blogutil.getFeedObj(data);

            //$scope.imageThumb = imageService.getThumbnails(data);
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

                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);

                //$scope.imageThumb = imageService.getThumbnails(data);
                $scope.startIndex = imageService.startIndex;
            });
        });
    }

    $scope.getBlogName = function()
    {
        imageService.getBlogId($scope.txtBlogName).then(function (data) {
        $scope.blogId = data.id;
        imageService.blogId = data.id;
        imageService.startIndex = 1;
        imageService.totalItems = data.posts.totalItems;
        $scope.totalItems = data.posts.totalItems;
        imageService.getPosts(data.id,imageService.startIndex).then(function (data) {
            $scope.blogPosts = data;

            blogutil.parseFeed(data);
            $scope.feedObj = blogutil.getFeedObj(data);

            //$scope.imageThumb = imageService.getThumbnails(data);
            $scope.startIndex = imageService.startIndex;
        });
    });
        
    }

    $scope.queryText = function()
    {

        imageService.getBlogId($scope.siteList).then(function (data) {
            imageService.blogId = data.id;
            $scope.blogId = data.id;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            imageService.getSearchPosts(data.id, $scope.startIndex,$scope.fastQueryText).then(function (data) {

                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    $scope.getNextPosts = function () {
        //console.log($scope.siteList);
        imageService.startIndex += 200;
        $scope.getSite($scope.siteList, imageService.startIndex);
    }

    $scope.getPreviousPosts = function () {
        //console.log($scope.siteList);
        if (imageService.startIndex - 200 > 0)
        {
            imageService.startIndex -= 200;
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
            $scope.displayData = [];
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
        loginService.selectedKey = $scope.clientKey;

        loginService.getToken().then(function (data) {
            $scope.accessToken = data.access_token;
        });
        gapi.client.setApiKey('AIzaSyDcuceGVU4MBMVxUYV3Ozu2L211eo8dTdI');
    }



});


app.controller('messageCtrl', function ($scope, $routeParams, $sce, imageService, $rootScope, postService,blogutil) {

    $scope.postBlogs = imageService.postBlogs;
    $scope.selectPostBlog = 7833828309523986982;

    var obj = blogutil.searchObjectArray(blogutil.getFeedObj(),"id",$routeParams.messageId);

    var getHTML = function () {
        var imageArray = obj.thumbs;
        var imageSrc = "";
        imageArray.forEach(function(element,index){
            imageSrc = imageSrc + "<a href='" + obj.images[index] + "'  target='_blank'><img src='" + element + "' /></a>";
        });
        return imageSrc;
    }

    var selectedBlog = function(){
        console.log($scope.selectPostBlog); 
    }

    var getPostHTML = function () {
        var imageArray = obj.images;
        var imageSrc = "";

        imageArray.forEach(function(element,index){
            imageSrc = imageSrc + "<a href='" + element + "'  target='_blank'><img src='" + element + "' /></a>";
        });
        return imageSrc;
    }

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    $scope.body = '<div>' + getHTML() + ' </div>';
    $scope.postTitle = obj.title;


    $scope.postFunction = function (postObject) {
        var postObject = {};
        postObject.blogId = $scope.selectPostBlog;
        postObject.postContent = '<div>' + getPostHTML() + '</div>';
        postObject.postTitle = $scope.postTitle;
        console.log(postObject);
        postService.postFunction(postObject);
    }

});