app.service('imageService', ['$http', '$q', "blogutil", function ($http, $q, blogutil) {
    //Variables Declaration
    var entries = [];
    var blogId = "";
    var startIndex = 0001;
    var totalItems = 0001;
    var maxResults = 400;
    var bloggerKey = "AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ";
    var selPostBlog = "7833828309523986982";
    var defaults = Object.freeze({
        "blogId" : "7833828309523986982",
        "blogName" : "http://desipixer.blogspot.com"
    });


    this.getBlogId = function (blogName) {
        var deferred = $q.defer();
        var URL = "https://www.googleapis.com/blogger/v3/blogs/byurl";
        var params = {
            key: "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po",
            url: blogName
        }
        var queryString = blogutil.objToQueryString(params);
        URL += queryString;

        $http.get(URL).success(function (data) {
            blogId = data.id;
            totalItems = data.posts.totalItems;
            deferred.resolve(data);
        });
        //console.log(deferred.promise);
        return deferred.promise;
    }

    var deferredX = $q.defer();
    function getAllPosts(blogId, startIndex, maxResults, arr){
        
        var startIndex = startIndex || 1;
        var maxResults = maxResults || 500;
        //entries = entries || [];
        try {
            var URL = "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results=" + maxResults + "&alt=json&callback=JSON_CALLBACK";
            $http.jsonp(URL).success(function (data) {
                //deferred.resolve(data);
                var arr1 = [];
                angular.forEach(data.feed.entry, function (entryX) {
                    arr1.push(entryX);
                });
                arr = arr.concat(arr1);
                if(totalItems > startIndex) {
                    getAllPosts(blogId, startIndex + 500, maxResults, arr);
                } else {
                    deferredX.resolve(arr);
                    entries = arr;
                    return deferredX.promise;
                }
            });
        } catch(ex){
            console.log("ERROR >>", ex);
        }
        
        return deferredX.promise;
    }

    /**
     * Get all posts using this method.
     */
    function getAllPosts2(blogId, startIndex, maxResults, entries){
        blogId = blogId || defaults.blogId;
        startIndex = startIndex || defaults.startIndex;
        maxResults = maxResults || defaults.maxResults;
        if(startIndex == 0){
            entries = [];
        }
        var feedUrl = getBlogFeedUrl(blogId, startIndex, maxResults);
        if(feedUrl){
            try {
                $http.get(feedUrl).success(function(data){
                    var arr1 = [];
                    angular.forEach(data.feed.entry, function (entryX) {
                        arr1.push(entryX);
                    });
                    angular.copy(arr1, entries);
                    if(startIndex < totalItems){
                        getAllPosts(blogId, startIndex + 500, maxResults, entries);
                    } else {
                        deferred.resolve(entries);
                    }
                });
            } catch(ex){
                console.log("ERROR >> getAllPosts() ", ex);
            }
        } else {
            console.log("ERROR ")
        }
        return deferred.promise;
    }

    function getBlogFeedUrl(blogId, startIndex, maxResults){
        return "https://www.blogger.com/feeds/"+ blogId +"/posts/default?start-index="+ startIndex + "&max-results=" + maxResults + "&alt=json&callback=JSON_CALLBACK";
    }


    this.getPosts = function (blogId, startIndex) {

        var deferred = $q.defer();

        /* blog present in list of blogs */
        var IsBlogInList = blogutil.searchObjectArray(this.getBlogList(), "blogId", blogId);
        if (IsBlogInList !== null && IsBlogInList.category == 2) {
            var URL = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?fetchImages=true&key=AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE&maxResults=500";
            try {
                $http.get(URL).success(function (data) {
                    deferred.resolve(data);
                });
            }
            catch (ex) {
                console.log("ERROR >> " + ex);
            }
        }
        else {
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
        var siteList = [
            {
                "blogId": "7833828309523986982",
                "blogURL": "http://www.desipixer.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "3079987222818050451",
                "blogURL": "http://movies.cinema65.com/",
                "category": 1
            },
            {
                "blogId": "4846859112009281783",
                "blogURL": "http://rockingfunimages.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "719302156971941098",
                "blogURL": "http://hq-bollywood.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "1579799827781024268",
                "blogURL": "http://www.telugupeopleadda.com/",
                "category": 1
            },
            {
                "blogId": "5935905342569794143",
                "blogURL": "http://sabhothimages.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "801637413886327659",
                "blogURL": "http://honeymedia.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "530660620295703790",
                "blogURL": "http://wallpaperhd6.blogspot.in/",
                "category": 1
            },
            {
                "blogId": "6468018902177861697",
                "blogURL": "http://totaltollywoodmovies.blogspot.com/",
                "category": 2
            },
            {
                "blogId": "7225871578344472338",
                "blogURL": "http://www.urtamilcinema.com/",
                "category": 2
            },
            {
                "blogId": "4846859112009281783",
                "blogURL": "http://www.celebsnext.com/",
                "category": 2
            },
            {
                "blogId": "3568736907693451574",
                "blogURL": "http://filmytrend.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "2951969169923408846",
                "blogURL": "http://fultohot.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "7294698807437562935",
                "blogURL": "http://tollywoodtolly.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "7521091312921738775",
                "blogURL": "http://cinehike.blogspot.com/",
                "category": 1
            },
            {
                "blogId": "4985646326158465936",
                "blogURL": "http://www.tollywoodblog.in/",
                "category": 2
            },
            {
                "blogId": "7468784626602203128",
                "blogURL": "http://telugu.zustcinema.com/",
                "category": 2
            },
            {
                "blogId": "5656041982218593755",
                "blogURL": "http://filmgain.blogspot.com/",
                "category": 1
            },
            { blogId: "7874248432678435813", blogURL: "http://www.c65.in/", category: 2 },
            { blogId: "5338625676592862668", blogURL: "http://cinytown.blogspot.com/", category: 1 },
            { blogId: "3430584311590741572", blogURL: "http://tollywoodboost.blogspot.com/", category: 1 },
            { blogId: "2222622162581355396", blogURL: "http://www.tufan9.com/", category: 1 },
            { blogId: "5945193835116701787", blogURL: "https://aardemasti.blogspot.com", category: 2 },
            { blogId: "5186853171678363994", blogURL: "https://latestmovieimagess.blogspot.com", category: 1 },
            { blogId: "3835582922244616101", blogURL: "http://filmeeclub.blogspot.in/", category: 1 },
            {blogId: "3512841850294928870", blogURL: "http://bollywoodtadkamasala.blogspot.com", category: 2}
        ];
        return siteList;
    }

    this.postBlogs = [
        {
            blogId: "7833828309523986982",
            blogURL: 'http://www.desipixer.blogspot.com/',
            category: 1
        },
        {
            blogId: "5935768727601291895",
            blogURL: 'http://pixerdesi.blogspot.com/',
            category: 1
        },
        {
            blogId: "4938539013570546208",
            blogURL: 'http://tamilpicz.blogspot.com/',
            category: 1
        },
        { blogId: "2313063316259818401", blogURL: "http://cinestillz.blogspot.com/", category: 1 },
        { blogId: "1689491623003449378", blogURL: "http://pixerhub.blogspot.com/", category: 1 },
        { blogId: "2360413207505978741", blogURL: "http://pixerblog.blogspot.com/", category: 1 },
        { blogId: "7527460989335381985", blogURL: "http://pixerone.blogspot.com/", category: 1 },
        {
            blogId: "8288428012409826912",
            blogURL: 'http://samanthapix.blogspot.com/',
            category: 1
        },
        {
            blogId: "4729247519531040631",
            blogURL: 'http://rakulpixer.blogspot.com/',
            category: 1
        },
        {
            blogId: "6614264041233815321",
            blogURL: 'http://kajalpixer.blogspot.com/',
            category: 1
        },
        {
            blogId: "2016762340977866228",
            blogURL: 'http://shriyapixer.blogspot.com/',
            category: 1
        },
        {
            blogId: "9026317655696914243",
            blogURL: 'http://samanthapixer.blogspot.com/',
            category: 1
        },
        {
            blogId: "7770041580109253182",
            blogURL: 'http://tamannapixer.blogspot.com/',
            category: 1
        },
        {
            blogId: "6586894154019969761",
            blogURL: 'http://desipixerz.blogspot.com/',
            category: 1
        },
        {
            blogId: "2727757258846553498",
            blogURL: 'https://pixer-master.blogspot.com/',
            category: 1
        }
    ];

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
        defaults : defaults,
        getAllPosts : getAllPosts
    }

}]);

app.service('loginService', ['$http', '$q', function ($http, $q) {
    var deferred = $q.defer();

    this.clientKeys = [{
        "name": "key1",
        "key": "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com"
    }, {
        "name": "key2",
        "key": "215192364453-j0vhrg3fl205k4gdqk30eic72rg12out.apps.googleusercontent.com"
    }, {
        "name": "key3",
        "key": "215192364453-3qtb7m8oocgu684qsfipkpdac6ntsjto.apps.googleusercontent.com"
    }];



    this.logMeIn = function () {


        var selectedKey = this.clientKeys[0].key;
        var parameters = {
            client_id: selectedKey,
            immediate: false,
            response_type: "token",
            scope: "http://www.blogger.com/feeds/"
        };
        gapi.auth.authorize(parameters, this.callbackFn);
    }
    this.callbackFn = function (data) {
        deferred.resolve(data);
    }

    this.getToken = function () {
        this.logMeIn();
        return deferred.promise;
    }
    return {
        logMeIn: this.logMeIn,
        callbackFn: this.callbackFn,
        getToken: this.getToken,
        clientKeys: this.clientKeys,
    }

}]);

app.service('postService', ['$http', '$q', 'loginService','authUtil', function ($http, $q, loginService, authUtil) {

    this.postFunction = function (postObject) {
        var title = postObject.postTitle + " ★ Desipixer  ★";
        var content = postObject.postContent;
        var blogId = postObject.blogId;
        loginService.getToken().then(function (data) {
            var accessToken = data.access_token;
            var myJSObject = { "content": content, "title": title };
            var POSTURL = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts";
            var ajaxObj = {
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
                },
                type: "POST",
                url: POSTURL,
                contentType: "application/json ; charset=UTF-8",
                data: JSON.stringify(myJSObject),
                dataType: "json",
                success: function (successcode) {
                    console.log("Posted Successfully");
                    $('#responseCode').show().css('color', 'green').text('POSTED').fadeOut(4000);
                    ;
                },
                error: function (errcode) {
                    console.log(errcode);
                    $('#responseCode').show().css('color', 'red').text('ERROR').fadeOut(4000);
                }
            };
            $.ajax(ajaxObj);

        });


    }

    this.postWp = function(title,content){
        var t = authUtil.getToken();
        var wpId = authUtil.getWpId();
        var postUrl = "https://public-api.wordpress.com/rest/v1/sites/" + wpId + "/posts/new";
        var ajaxObj = {
            url : postUrl,
            method : "POST",
            beforeSend : function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer "+ t)
            },
            data : {
                title : title,
                content : content
            },
            success : function(data){
                console.log("POSTED TO Wordpress ", data);
            },
            error : function(err){
                console.log("ERROR >> Error posting to wordpress");
            }
        }

        $.ajax(ajaxObj);
    }



    return {
        postFunction: this.postFunction,
        postWp : this.postWp
    }

}]);


app.service('authUtil', function(){
    var k = Object.freeze({
        k : "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po"
    });
    var getKey = function(){
        return k.k;
    }

    var wp = Object.freeze({
        t : ")gwKcj295LmQGMLpKK34uP$o5p%M7T2g(7wm7l3OxQI6KAW8LSY5D3k2@DpwBRQ)",
        id : "135975188",
        u : "http://pixermaster.wordpress.com"
    });

    var getToken = function(){
        return wp.t;
    };

    var getWpId = function(){
        return wp.id;
    }

    return {
        k : getKey(),
        getToken : getToken,
        getWpId : getWpId
    }
});

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

    var parseEntries = function(obj){
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
        }
        else {
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
        }
        else {
            return obj;
        }
    }

    var objToQueryString = function (obj) {
        var str = "?";
        for (key of Object.keys(obj)) {
            str += key + "=" + obj[key] + "&";
        }
        return str.substring(0, str.length - 1);
    }


    return {
        parseFeed: parseFeed,
        parseEntries : parseEntries,
        getThumbs: getThumbs,
        getImages: getImages,
        getFeedObj: getFeedObj,
        lazyLoadingImages: lazyLoadingImages,
        searchObjectArray: searchObjectArray,
        compareTitle: compareTitle,
        objToQueryString: objToQueryString
    }
});