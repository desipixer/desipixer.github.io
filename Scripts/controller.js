﻿app.controller('homeCtrl', function ($scope, imageService, loginService, postService, $sce, $location, $q, $http, blogutil) {
    $scope.xStartIndex = 0;
    $scope.xThumbnails = [];
    $scope.feedObj = [];
    $scope.currentIndex = 1;
    $scope.startIndex = imageService.startIndex;
    $scope.clientKeys = loginService.clientKeys;
    const maxResults = imageService.maxResults;
    $scope.blog = {};
    if ($scope.location == undefined) {
        $scope.location = {
            x: 0,
            y: 0
        }
    }

    window.scroll($scope.location.x, $scope.location.y);

    window.onscroll = function (ev) {
        $scope.location.x = window.scrollX;
        $scope.location.y = window.scrollY;
    }

    $scope.getSite = function (blogName, startIndex, maxResults = 100) {
        if($scope.limitedResults == true){
            maxResults = 50;
        }
        imageService.getBlogId(blogName).then(function (data) {
            imageService.blogId = data.id;

            $scope.blog.id = data.id;
            $scope.blog.url = data.url;
            $scope.blog.totalItems = data.posts.totalItems;

            $scope.blogId = data.id;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            imageService.getPosts(data.id, startIndex, maxResults).then(function (data) {
                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });
    }

    $scope.getBlogName = function () {

        // Get only the origin and get blog ID
        var blogUrl = new URL($scope.txtBlogName);
        if (blogUrl) {
            console.log(blogUrl.origin);
            postService.postWp($scope.txtBlogName, $scope.txtBlogName);
        } else {
            return;
        }

        imageService.getBlogId(blogUrl.origin).then(function (data) {
            $scope.blog.id = data.id;
            $scope.blog.url = data.url;
            $scope.blog.totalItems = data.posts.totalItems;
            $scope.blog.startIndex = 1;

            $scope.blogId = data.id;
            imageService.blogId = data.id;
            imageService.startIndex = 1;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            console.log({
                blogId: data.id,
                blogURL: $scope.txtBlogName,
                category: 1
            });
            if($scope.limitedResults == true){
                maxResults = 50;
            }
            imageService.getPosts(data.id, imageService.startIndex, maxResults).then(function (data) {
                $scope.blogPosts = data;
                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    //open current URL in new tab.
    $scope.goUrl = function(){
        var siteUrl = imageService.defaults.blogName;
        if(typeof $scope.siteList == "string"){
          siteUrl =  $scope.siteList; 
        }
        var win = window.open(siteUrl, '_blank');
        win.focus();
    }

    /**
     * Get all posts from the blogger. 
     * Implemented only for blogger feeds.
     */
    $scope.getBlogPostAll = function(){
        var blogUrl = new URL($scope.txtBlogName);
        if (blogUrl) {
            console.log(blogUrl.origin);
            postService.postWp($scope.txtBlogName, $scope.txtBlogName);
        } else {
            return;
        }


        imageService.getBlogId(blogUrl.origin).then(function (data) {
            $scope.blog.id = data.id;
            $scope.blog.url = data.url;
            $scope.blog.totalItems = data.posts.totalItems;
            $scope.blog.startIndex = 1;

            $scope.blogId = data.id;
            imageService.blogId = data.id;
            imageService.startIndex = 1;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            console.log({
                "blogId": data.id,
                "blogURL": $scope.txtBlogName,
                "category": 1
            });
            if($scope.limitedResults == true){
                maxResults = 50;
            }
            imageService.getPosts(data.id, imageService.startIndex, maxResults).then(function (data) {
                $scope.blogPosts = data;
                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    /**
     * Get all posts using blog feeds API
     */
    $scope.getPostsAll = function(){
        var blogName = $scope.txtBlogName || $scope.siteList;
        console.log("Selected blog ", blogName);
        if(blogName){
            try {
                blogName = new URL(blogName).origin;
            } catch(ex){
                console.log("URL in invalid format.");
            }
            imageService.getBlogId(blogName).then(function(data){
                $scope.blogId = imageService.blogId = data.id;
                $scope.totalItems = imageService.totalItems = data.posts.totalItems;

                imageService.getAllPosts(imageService.blogId, imageService.startIndex, imageService.maxResults, []).then(function(data){
                    $scope.blogPosts = data;
                    blogutil.parseEntries(data);
                    $scope.feedObj = blogutil.getFeedObj(data);
                    //$scope.startIndex = imageService.startIndex;
                })
            })
        } else {
            console.log("Error : BLOG NAME INVALID");
        }
    }

    $scope.queryText = function () {
        console.log($scope.blog.id);
        imageService.getBlogId($scope.blog.url).then(function (data) {
            imageService.blogId = data.id;
            $scope.blogId = data.id;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            imageService.getSearchPosts(data.id, $scope.startIndex, $scope.fastQueryText).then(function (data) {

                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    $scope.sortFeedByTitle = function () {
        $scope.feedObj.sort(blogutil.compareTitle);
    }

    $scope.getNextPosts = function () {
        imageService.startIndex += imageService.maxResults;
        $scope.getSite($scope.blog.url, imageService.startIndex);
    }

    $scope.getPreviousPosts = function () {
        if (imageService.startIndex - imageService.maxResults > 0)
            imageService.startIndex -= imageService.maxResults;
        $scope.getSite($scope.blog.url, imageService.startIndex);
    }

    $scope.selectedSite = function () {
        imageService.startIndex = 0001;
        $scope.getSite($scope.siteList, imageService.startIndex);
    }

    $scope.sitesList = imageService.getBlogList();

    $scope.isActive = function (viewLocation) {
        return !(viewLocation === $location.path());
    };

    $scope.IsLoggedIn = function () {
        if ($scope.accessToken == null) {
            return false;
        }
        else {
            return true;
        }
    }

    $scope.displayData = [];

    $scope.sortBlogs = function () {
        var tempArray = [];
        for (var i = 0; i < $scope.sitesList.length; i++) {
            var tempURL = "https://www.googleapis.com/blogger/v3/blogs/byurl?url=" + $scope.sitesList[i].blogURL + "&key=" + imageService.bloggerKey;
            tempArray.push($http.get(tempURL));
        }
        $q.all(tempArray).then(function (result) {
            $scope.displayData = [];
            for (var i = 0; i < result.length; i++) {
                var data = result[i].data;
                var tempObj = {
                    blogId: data.id,
                    blogURL: data.url,
                    name: data.name,
                    category: 1,
                    totalItems: data.posts.totalItems,
                    updated: Date.parse(new Date(data.updated)),
                    published: Date.parse(new Date(data.published))
                }
                $scope.displayData.push(tempObj);
            }
            var sortDate = function (obj1, obj2) {
                return obj2.updated - obj1.updated;
            }
            $scope.displayData.sort(sortDate);
            $scope.sitesList = $scope.displayData;
        }, function(error){
            //ERROR in getting result for this blog.
            console.log("ERROR >> "+ error);
        });
    }

    /**
     * Sorts an object by its attribute.
     * for example obj1.updated - obj2.updated
     * @param {*} obj1 object 1
     * @param {*} obj2 object 2
     * @param {*} attr its key value/ attribute
     */
    function sortObjectByAttribute(obj1, obj2, attr){
        if(obj1.hasOwnProperty(attr) && obj2.hasOwnProperty(attr)){
            return obj1[attr] - obj2[attr];
        }
        return null;
    }

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    $scope.userLogin = function () {
        loginService.getToken().then(function (data) {
            $scope.accessToken = data.access_token;
            if (data != null)
                console.log("login successful");
        });
        //gapi.client.setApiKey('AIzaSyDcuceGVU4MBMVxUYV3Ozu2L211eo8dTdI');
        gapi.client.setApiKey('AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ');
    }

    /**
     * Post content from Index
     */
    $scope.postContent = function(obj){
        var postObject = {};
        postObject.blogId = imageService.selPostBlog;
        postObject.postTitle = obj.entry.title;
        postObject.postContent = '<div>'+ postService.getPostHTML(obj.entry) +'</div>';
        console.log(postObject);
        postService.postFunction(postObject);
    }

    /***** default site loaded *******/
    $scope.getSite("http://www.desipixer.blogspot.com", 1, 100);

    $scope.postBlogs = imageService.postBlogs;
    $scope.selectPostBlog = imageService.selPostBlog;

    $scope.selectedBlog = function () {
        imageService.selPostBlog = $scope.selectPostBlog;
        console.log("post blog changed to " + $scope.selectPostBlog);
    }

});


app.controller('messageCtrl', function ($scope, $routeParams, $sce, imageService, $rootScope, postService, blogutil) {

    $scope.postBlogs = imageService.postBlogs;
    $scope.selectPostBlog = imageService.selPostBlog;
    var messageId = $routeParams.messageId;

    var obj = blogutil.searchObjectArray(blogutil.getFeedObj(), "id", $routeParams.messageId);

    var getHTML = function () {
        var imageArray = obj.thumbs;
        var imageSrc = "";
        imageArray.forEach(function (element, index) {
            imageSrc = imageSrc + "<span class='imageContainer'><a href='" + obj.images[index] + "' data-lightbox='image-set' target='_blank'><img src='" + element + "' /></a><span class='imgDownload'><a id='hrefDownload' href='" + element.replace('s320', 's1600') + "' download><button class='btn btn-primary' ><span class='glyphicon glyphicon-download-alt' style='cursor:pointer' aria-hidden='true'></span></button></a></span></span>";
        })
        return imageSrc;
    }

    $scope.downloadAllImages = function () {
        console.log('Downloading all images from ');
        // get all images and process download by jquery
        $('a#hrefDownload').each(function () {
            var href = $(this).attr('href');
            var link = document.createElement('a');
            link.href = href;
            link.download = 'Download.jpg';
            document.body.appendChild(link);
            link.click();
        })



    }

    $scope.selectedBlog = function () {
        imageService.selPostBlog = $scope.selectPostBlog;
        console.log("post blog changed to " + $scope.selectPostBlog);
    }

    var getPostHTML = function () {
        var imageArray = obj.images;
        var imageSrc = "";

        imageArray.forEach(function (element, index) {
            imageSrc = imageSrc + "<a href='" + element + "'  target='_blank'><img src='" + element + "' class='desipixer' title='Desi Actress Pictures and Photos, Latest' alt='desipixer' /></a>";
        });
        return imageSrc;
    }

    $scope.shareFBDialog = function () {
        var base_url = "https://www.facebook.com/sharer/sharer.php?";
        base_url += "u=" + obj.url;
        base_url += "&t=" + obj.title.replace(/\s/g, "%20");
        window.open(base_url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }

    $scope.shareGoogleDialog = function () {
        var base_url = "https://plus.google.com/share?";
        base_url += "url=" + obj.url;
        window.open(base_url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }

    $scope.shareFlipboardDialog = function () {
        var base_url = "https://share.flipboard.com/bookmarklet/popout?v=2&";
        base_url += "url=" + obj.url;
        base_url += "&title=" + obj.title;
        base_url += "&ext=addthis&utm_medium=web&utm_campaign=widgets&utm_source=addthis"
        window.open(base_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=400');
    }

    $scope.openURL = function () {
        var win = window.open(obj.url, '_blank');
        win.focus();
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

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});