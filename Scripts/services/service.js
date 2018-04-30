app.service('imageService', ['$http', '$q', "blogutil","service.data", "urlService", function ($http, $q, blogutil, dataService, urlService) {
    //Variables Declaration
    var entries = [];
    var blogId = "";
    var startIndex = 0001;
    var totalItems = 0001;
    var maxResults = 200;
    var bloggerKey = "AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ";
    var selPostBlog = "7833828309523986982";
    var defaults = Object.freeze({
        "blogId": "7833828309523986982",
        "blogName": "http://desipixer.blogspot.com"
    });


    this.getBlogId = function (blogName) {
        var deferred = $q.defer();
        var reqUrl = urlService.getBlogIdUrl(blogName);
        $http.get(reqUrl).success(function (data) {
            blogId = data.id;
            totalItems = data.posts.totalItems;
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    var deferredX = $q.defer();

    function getAllPosts(blogId, startIndex, maxResults, arr) {

        try {
            var reqUrl = urlService.getBlogFeedUrl(blogId, startIndex, 500);
            $http.jsonp(reqUrl).success(function (data) {
                //deferred.resolve(data);
                var arr1 = [];
                angular.forEach(data.feed.entry, function (entryX) {
                    arr1.push(entryX);
                });
                arr = arr.concat(arr1);
                if (totalItems > startIndex) {
                    getAllPosts(blogId, startIndex + 500, 500, arr);
                } else {
                    deferredX.resolve(arr);
                    entries = arr;
                    return deferredX.promise;
                }
            });
        } catch (ex) {
            console.log("ERROR >>", ex);
        }

        return deferredX.promise;
    }


    function getAllPosts3(blogId, startIndex = 1, maxResults = 500, arr = []) {
        
        try {
            var URL = urlService.getBlogFeedUrl(blogId, startIndex, maxResults);
            $http.jsonp(URL).success(function (data) {
                //deferred.resolve(data);
                var arr1 = [];
                angular.forEach(data.feed.entry, function (entryX) {
                    arr1.push(entryX);
                });
                arr = arr.concat(arr1);
                if (totalItems > startIndex) {
                    getAllPosts(blogId, startIndex + 500, maxResults, arr);
                } else {
                    deferredX.resolve(arr);
                    entries = arr;
                    return deferredX.promise;
                }
            });
        } catch (ex) {
            console.log("ERROR >>", ex);
        }

        return deferredX.promise;
    }


    /**
     * Get all posts using this method.
     */
    function getAllPosts2(blogId, startIndex, maxResults, entries) {
        blogId = blogId || defaults.blogId;
        startIndex = startIndex || defaults.startIndex;
        maxResults = maxResults || defaults.maxResults;
        if (startIndex == 0) {
            entries = [];
        }
        var feedUrl = getBlogFeedUrl(blogId, startIndex, maxResults);
        if (feedUrl) {
            try {
                $http.get(feedUrl).success(function (data) {
                    var arr1 = [];
                    angular.forEach(data.feed.entry, function (entryX) {
                        arr1.push(entryX);
                    });
                    angular.copy(arr1, entries);
                    if (startIndex < totalItems) {
                        getAllPosts(blogId, startIndex + 500, maxResults, entries);
                    } else {
                        deferred.resolve(entries);
                    }
                });
            } catch (ex) {
                console.log("ERROR >> getAllPosts() ", ex);
            }
        } else {
            console.log("ERROR ")
        }
        return deferred.promise;
    }

    function getBlogFeedUrl(blogId, startIndex, maxResults) {
        return "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results=" + maxResults + "&alt=json&callback=JSON_CALLBACK";
    }


    this.getPosts = function (blogId, startIndex, maxResults = 500) {

        var deferred = $q.defer();

        /* blog present in list of blogs */
        var IsBlogInList = blogutil.searchObjectArray(this.getBlogList(), "blogId", blogId);
        if (IsBlogInList !== null && IsBlogInList.category == 2) {
            var URL = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?fetchImages=true&key=AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE&maxResults=500";
            try {
                $http.get(URL).success(function (data) {
                    deferred.resolve(data);
                });
            } catch (ex) {
                console.log("ERROR >> " + ex);
            }
        } else {
            var URL = "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results=" + maxResults + "&alt=json&callback=JSON_CALLBACK";
            $http.jsonp(URL).success(function (data) {
                deferred.resolve(data);
                var arr1 = [];
                angular.forEach(data.feed.entry, function (entryX) {
                    arr1.push(entryX);
                });
                angular.copy(arr1, entries);
            });
        }

        return deferred.promise;
    }

    this.getSearchPosts = function (blogId, startIndex, searchText) {
        var deferred = $q.defer();
        //searchText = searchText.replace(new RegExp(" ", "g"), "%20");
        var URL = "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results=" + maxResults + "&alt=json&q=" + searchText + "&callback=JSON_CALLBACK";
        $http.jsonp(URL).success(function (data) {
            deferred.resolve(data);
            var arr1 = [];
            angular.forEach(data.feed.entry, function (entryX) {
                arr1.push(entryX);
            });
            angular.copy(arr1, entries);
        });
        /* }*/
        return deferred.promise;
    }

    this.getThumbnails = function (blogData) {

        blogutil.parseFeed(blogData);
        var feedObj = blogutil.getFeedObj();


        var thumbnailArray = [];
        var blogPosts = blogData.feed.entry;
        $(blogPosts).each(function (index, value) {
            var tempJSON = {};
            var entry = this;
            var postTitle = this.title.$t;
            var postContent = this.content.$t;
            var filteredHTML = postContent.match(/<img\s+src\s*=\s*(["'][^"']+["']|[^>]+)>/ig);
            var strPattern = new RegExp('<img.*?src="(.*?\/([^/"]*))".*?>', 'g');
            var patt = new RegExp(/src\s*=\s*"(.+?)"/);
            var tURL = strPattern.exec(postContent);
            var thumbURL = patt.exec(postContent);
            if (thumbURL != null) {
                thumbURL = patt.exec(postContent)[1];
                var imgThumbURL = thumbURL.replace(thumbURL.split('/')[thumbURL.split('/').length - 2], 's320');
                tempJSON.title = postTitle;
                tempJSON.imgThumb = imgThumbURL;
                tempJSON.index = index;
                tempJSON.id = entry.id.$t.match(/\d+/g)[1] + "-" + entry.id.$t.match(/\d+/g)[2];
                thumbnailArray.push(tempJSON);
            }
        });
        return thumbnailArray;

    }



    this.getBlogList = function () {
        return dataService.blogsiteList;
        
    }

    this.postBlogs = dataService.postBlogsiteList;

    return {
        getBlogId: this.getBlogId,
        getPosts: this.getPosts,
        getThumbnails: this.getThumbnails,
        getBlogList: this.getBlogList,
        entries: entries,
        blogId: blogId,
        startIndex: startIndex,
        bloggerKey: bloggerKey,
        getSearchPosts: this.getSearchPosts,
        postBlogs: this.postBlogs,
        selPostBlog: selPostBlog,
        maxResults: maxResults,
        defaults: defaults,
        getAllPosts: getAllPosts
    }

}]);


app.service('blogutil', function () {

    /* variables that stores the images */
    var imgContainer = [];
    var thumbContainer = [];
    var feedObj = [];


    /* removes stop words from the title */
    var removeStopWords = function (string) {
        var stopWords = ["Telugu", "Tamil", "Actress", "Acress", "CelebsNext", "Photoshoot", "Cinema", "Photos", "Photo", "Pictures", "Picture", "Tollywood", "Kollywood", "Movies", "Movie", "Latest", "Saree", "Gallery", "Dress", "Event", "Audio", "Stills", "Still", " hot ", "Navel", "Cleavage", "Boobs", "Exposing", "Desi ", "Heroine", "Heroin", "Images", "Wallpapers", "Wallpaper", "Cute", "Spicy", "New ", "Function", "Success Meet", "Teaser Launch", "Launch ", " Hot", "Press Meet", " Launch", "Sexy "];
        var rExp;
        for (word of stopWords) {
            rExp = new RegExp(word, "gi");
            string = string.replace(rExp, " ").trim();
        }
        string = removeNoise(string);
        string = string.replace(/\s/g, " ").trim();
        return string;
    }

    function removeNoise(string) {
        var noiseWords = ["%2B", "%25"];
        var rExp;
        for (word of noiseWords) {
            rExp = new RegExp(word, "gi");
            string = string.replace(rExp, " ").trim();
            string = string.replace(/\W+/g, " ").trim();
            string = string.replace(" jpg", "").trim();
            string = string.replace(/\s/g, " ").trim();
        }
        return string;
    }

    var compareTitle = function (a, b) {
        if (a.cleanTitle < b.cleanTitle)
            return -1;
        if (a.cleanTitle > b.cleanTitle)
            return 1;
        return 0;
    }


    /* parse the feed and get the images in the object */
    var parseFeed = function (obj) {
        resetParams();
        if (typeof obj == "object") {
            /* iterate through each entries */
            if (obj.hasOwnProperty("feed")) {
                obj.feed.entry.forEach(function (element, index) {
                    if (element.content.$t !== undefined) {
                        var htmlContent = element.content.$t;

                        feedObj.push(parseEntry(element));
                        //imgContainer = imgContainer.concat(parseImageFromHTML(htmlContent));
                        //thumbContainer = JSON.parse(JSON.stringify(imgContainer).replace(/s1600/g,"s320"));
                    }
                });
            }
            if (obj.hasOwnProperty("items")) {
                obj.items.forEach(function (element, index) {
                    if (element.content != undefined) {
                        var htmlContent = element.content;
                        feedObj.push(parseAPIEntry(element));
                    }
                })
            }


        }

    }

    var parseEntries = function (obj) {
        feedObj = [];
        obj.forEach(function (element, index) {
            if (element.content.$t !== undefined) {
                var htmlContent = element.content.$t;
                feedObj.push(parseEntry(element));
            }
        });
    }

    /* returns filtered result of an entry */
    var parseEntry = function (entry) {
        var obj = {};
        obj.title = entry.title.$t;
        obj.images = parseImageFromHTML(entry.content.$t);
        obj.thumbs = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g, "s320")); //can be memory intensive
        obj.id = entry.id.$t.match(/\d+/g)[1] + "-" + entry.id.$t.match(/\d+/g)[2];
        obj.published = (new Date(entry.published.$t)).getTime();
        obj.updated = (new Date(entry.updated.$t)).getTime();
        if (entry.hasOwnProperty("link")) {
            obj.url = (entry.link[entry.link.length - 1].href);
        }
        obj.cleanTitle = removeStopWords(entry.title.$t);
        if (entry.hasOwnProperty("category"))
            obj.category = (entry.category[0].hasOwnProperty("term")) ? entry.category[0].term : "";
        return obj;
    }

    /* returns filtered result of an entry */
    var parseAPIEntry = function (entry) {
        var obj = {};
        obj.title = entry.title;
        obj.images = parseImageFromHTML(entry.content);
        obj.thumbs = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g, "s320")); //can be memory intensive
        obj.id = entry.id;
        obj.published = (new Date(entry.published)).getTime();
        obj.updated = (new Date(entry.updated)).getTime();
        obj.url = entry.url;
        obj.labels = entry.labels;
        obj.cleanTitle = removeStopWords(entry.title);
        return obj;
    }

    /* takes html content as input and returns array */
    var parseImageFromHTML = function (htmlContent) {
        var imgArray = [];
        var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
        if (imgTags != undefined && imgTags.length > 0) {
            for (img of imgTags) {
                var imgURL = img.match(/(https?:\/\/.*\.(?:png|jpg))/ig);
                if (imgURL != undefined && imgURL.length > 0) {

                    /* get large images if it is a blogger site images */
                    if (imgURL[0].indexOf("bp.blogspot.com") !== -1 && imgURL[0].indexOf("telugu.zustcinema_film_news_updates.png") == -1) {
                        var imgSplit = imgURL[0].split('/');
                        var imgRes = imgSplit.splice(imgSplit.length - 2, 1);
                        largeIMG = imgURL[0].replace(imgRes, "s1600");
                        imgArray.push(largeIMG);
                    }
                }
            }
        }
        return imgArray;
    }

    /* returns the list of images from feed */
    var getImages = function (obj) {
        for (feed of feedObj) {
            imgContainer = imgContainer.concat(feed.images);
        }
        return imgContainer;
    }

    /* returns the list of thumbs from feed */
    var getThumbs = function (obj) {
        for (feed of feedObj) {
            imgContainer = imgContainer.concat(feed.thumbs);
        }
        return thumbContainer;
    }

    /* returns the list of filtered feeds */
    var getFeedObj = function () {
        return feedObj;
    }

    var resetParams = function () {
        imgContainer = [];
        thumbContainer = [];
        feedObj = [];
    }

    /* used to load the images partially */
    var lazyLoadingImages = function (length, num) {
        if (length == undefined) {
            length = 0;
        }
        if (num == undefined) {
            num = 50;
        }
        if (length > imgContainer.length || length < 0) {
            return imgContainer;
        } else {
            return imgContainer.slice(length, length + num);
        }
    }


    var searchObjectArray = function (arr, key, value) {
        var obj = [];
        for (element of arr) {
            if (element.hasOwnProperty(key)) {
                if (value == element[key]) {
                    obj.push(element);
                }
            }
        }

        if (obj.length == 1) {
            return obj[0];
        }
        if (obj.length == 0) {
            return null;
        } else {
            return obj;
        }
    }


    return {
        parseFeed: parseFeed,
        parseEntries: parseEntries,
        getThumbs: getThumbs,
        getImages: getImages,
        getFeedObj: getFeedObj,
        lazyLoadingImages: lazyLoadingImages,
        searchObjectArray: searchObjectArray,
        compareTitle: compareTitle
    }
});