app.service('imageService', ['$http', '$q', function ($http, $q, blogutil) {
    //Variables Declaration
    var entries = [];
    var blogId = "";
    var startIndex = 0001;
    var totalItems = 0001;
    var bloggerKey = "AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ";

    this.getBlogId = function (blogName) {
        var deferred = $q.defer();
        var URL = "https://www.googleapis.com/blogger/v3/blogs/byurl?key=AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po&url=" + blogName;
        $http.get(URL).success(function (data) {
            blogId = data.id;
            totalItems = data.posts.totalItems;
            deferred.resolve(data);
        });
        console.log(deferred.promise);
        return deferred.promise;
    }
    this.getPosts = function (blogId,startIndex)
    {
       
        var deferred = $q.defer();
        
            var URL = "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results=500&alt=json&callback=JSON_CALLBACK";
            $http.jsonp(URL).success(function (data) {
                deferred.resolve(data);
                var arr1 = [];
                angular.forEach(data.feed.entry, function (entryX) {
                    arr1.push(entryX);
                });
                angular.copy(arr1, entries);
        });
      
        return deferred.promise;
    }

    this.getSearchPosts= function(blogId,startIndex,searchText)
    {
        var deferred = $q.defer();
        searchText = searchText.replace(new RegExp(" ", "g"), "%20");
         var URL = "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results=500&alt=json&q="+searchText+"callback=JSON_CALLBACK";
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

    this.getThumbnails = function(blogData) {

        blogutil.parseFeed(blogData);
        var feedObj = blogutil.getFeedObj();

        
        var thumbnailArray = [];
        var blogPosts = blogData.feed.entry;
        $(blogPosts).each(function (index, value) {
            var tempJSON = {};

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
                thumbnailArray.push(tempJSON);
            }
        });
        return thumbnailArray;

    }



    this.getBlogList = function() {
        var siteList = [ { blogId: 7833828309523986982,
                        blogURL: 'http://www.desipixer.in/',
                        category: 1
                    },
                     {
                        blogId: 3570505240870034981,
                        blogURL: 'http://illeana-hotphotos.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 4257078420076874919,
                        blogURL: 'http://ssmusictheblog.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 3788148058786940579,
                        blogURL: 'http://photofunmasti.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 3568736907693451574,
                        blogURL: 'http://filmytrend.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 2951969169923408846,
                        blogURL: 'http://fultohot.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 7294698807437562935,
                        blogURL: 'http://tollywoodtolly.blogspot.com/',
                        category: 1
                    },  {
                        blogId: 78242048938000965,
                        blogURL: 'http://www.tollyscreen.com/',
                        category: 1
                    }, {
                        blogId: 7521091312921738775,
                        blogURL: 'http://cinehike.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 4340330498874514770,
                        blogURL: 'http://www.removideos.com/',
                        category: 1
                    }, {
                        blogId: 1259465806147598254,
                        blogURL: 'http://way2newsblog.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 719302156971941098,
                        blogURL: 'http://hq-bollywood.blogspot.com/',
                        category: 1
                    },{
                        blogId: 4919960343339905419,
                        blogURL: 'http://www.indianbeast.com/',
                        category: 1
                    }, {
                        blogId: 3293309843232706023,
                        blogURL: 'http://www.searchtamilmovies.com/',
                        category: 1
                    },  {
                        blogId: 8351995278725523676,
                        blogURL: 'http://cinema.nilavaithedi.biz/',
                        category: 1
                    }, {
                        blogId: 8630800337511284753,
                        blogURL: 'http://cinemaicon.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 4985646326158465936,
                        blogURL: 'http://www.tollywoodblog.in/',
                        category: 1
                    }, {
                        blogId: 7682538289737929837,
                        blogURL: 'http://www.voovov.com/',
                        category: 1
                    }, {
                        blogId: 8369777321912001295,
                        blogURL: 'http://onlypopularvideos.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 7251757096163318078,
                        blogURL: 'http://bollywood5k.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 7468784626602203128,
                        blogURL: 'http://telugu.zustcinema.com/',
                        category: 1
                    },{
                        blogId: 5648086490419664967,
                        blogURL: 'http://actresscelebritygallery.blogspot.com/',
                        category: 1
                    },{
                        blogId: 3147458353617272183,
                        blogURL: 'http://brittanywilbur.blogspot.com/',
                        category: 1
                    },{
                        blogId: 9011145545740768794,
                        blogURL: 'http://telugumoviesongsfreedownloads.blogspot.com/',
                        category: 1
                    }
                    ];
        return siteList;
    }


    return {
        getBlogId: this.getBlogId,
        getPosts: this.getPosts,
        getThumbnails: this.getThumbnails,
        getBlogList: this.getBlogList,
        entries: entries,
        blogId: blogId,
        startIndex : startIndex,
        bloggerKey : bloggerKey
    }

}]);

app.service('loginService', ['$http', '$q', function ($http, $q) {
    var deferred = $q.defer();

    this.logMeIn = function ()
    {
        var parameters = {
            client_id: "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com",
            immediate: false,
            response_type: "token",
            scope: "http://www.blogger.com/feeds/"
        };
        gapi.auth.authorize(parameters, this.callbackFn);
    }
    this.callbackFn = function(data)
    {
        deferred.resolve(data);
    }

    this.getToken = function ()
    {
        this.logMeIn();
        return deferred.promise;
    }
    return {
        logMeIn: this.logMeIn,
        callbackFn: this.callbackFn,
        getToken : this.getToken
    }

}]);

app.service('postService', ['$http', '$q','loginService', function ($http, $q,loginService) {

    this.postFunction = function (postObject) {
        var title = postObject.postTitle + " ★ Desipixer  ★";
        var content = postObject.postContent;
        var blogId = postObject.blogId;
        loginService.getToken().then(function (data) {
            var accessToken = data.access_token;
            var myJSObject = { "content": content, "title": title };
            var POSTURL = "https://www.googleapis.com/blogger/v3/blogs/7833828309523986982/posts";
            $.ajax({
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
                    },
                    error: function (errcode) {
                       console.log("Failed");
                    }
                });

            });
        

    }
    return {
        postFunction: this.postFunction
    }

}]);


app.service('blogutil',function(){

   /* variables that stores the images */
    var imgContainer = [];
    var thumbContainer = [];
    var feedObj = [];

    /* parse the feed and get the images in the object */
    var parseFeed = function(obj){
        resetParams();
        if(typeof obj =="object"){
            /* iterate through each entries */

            obj.feed.entry.forEach(function(element,index){
                if(element.content.$t !== undefined){
                    var htmlContent = element.content.$t;

                    feedObj.push(parseEntry(element));
                    imgContainer = imgContainer.concat(parseImageFromHTML(htmlContent));
                    thumbContainer = JSON.parse(JSON.stringify(imgContainer).replace(/s1600/g,"s320"));
                }
            });

        }   

    }

    /* returns filtered result of an entry */
    var parseEntry = function(entry){
        var obj = {};
        obj.title = entry.title.$t;
        obj.images = parseImageFromHTML(entry.content.$t);
        obj.thumbs = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g,"s320"));
        obj.id = entry.id.$t.match(/\d+/g)[1] + "-"+ entry.id.$t.match(/\d+/g)[2];
        obj.published = (new Date(entry.published.$t)).getTime();
        obj.updated = (new Date(entry.updated.$t)).getTime();
        if(entry.hasOwnProperty("category"))
            obj.category = (entry.category[0].hasOwnProperty("term")) ? entry.category[0].term : "";
        return obj;
    }

    

    /* takes html content as input and returns array */
    var parseImageFromHTML = function(htmlContent){
        var imgArray = [];
        var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
        if(imgTags != undefined && imgTags.length > 0){
            for(img of imgTags){
                var imgURL = img.match(/(https?:\/\/.*\.(?:png|jpg))/);
                if(imgURL != undefined && imgURL.length > 0){

                    /* get large images if it is a blogger site images */
                    if(imgURL[0].indexOf("bp.blogspot.com") !== -1){
                        var imgSplit = imgURL[0].split('/');
                        var imgRes = imgSplit.splice(imgSplit.length - 2,1);
                        largeIMG = imgURL[0].replace(imgRes,"s1600");
                        imgArray.push(largeIMG);
                    }
                }
            }
        }
        return imgArray;
    }

    /* returns the list of images from feed */
    var getImages = function(obj){
        return imgContainer;
    }
    
    /* returns the list of thumbs from feed */
    var getThumbs = function(obj){
        return thumbContainer;
    }

    /* returns the list of filtered feeds */
    var getFeedObj = function(){
        return feedObj;
    }

    var resetParams = function(){
        imgContainer = [];
        thumbContainer = [];
        feedObj = [];
    }

    /* used to load the images partially */
    var lazyLoadingImages = function(length,num){
        if(length == undefined){
            length = 0;
        }
        if(num == undefined){
            num = 50;
        }
        if(length > imgContainer.length || length < 0){
            return imgContainer;
        }
        else{
            return imgContainer.slice(length, length + num);
        }
    }


    var searchObjectArray = function(arr,key,value){
        var obj = [];
        for(element of arr){
            if(element.hasOwnProperty(key)){
                if(value == element[key]){
                    obj.push(element);
                }
            }
        }
        
        if(obj.length == 1){
            return obj[0];
        }
        if(obj.length == 0){
            return null;
        }
        else
        {
            return obj;
        }
    }

    return {
        parseFeed : parseFeed,
        getThumbs : getThumbs,
        getImages : getImages,
        getFeedObj : getFeedObj,
        lazyLoadingImages : lazyLoadingImages,
        searchObjectArray : searchObjectArray
    }
});