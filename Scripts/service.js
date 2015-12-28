app.service('imageService', ['$http', '$q',"blogutil", function ($http, $q, blogutil) {
    //Variables Declaration
    var entries = [];
    var blogId = "";
    var startIndex = 0001;
    var totalItems = 0001;
    var maxResults = 400;
    var bloggerKey = "AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ";
    var selPostBlog = "7833828309523986982";

    var objToQueryString = function(obj){
        var str = "?";
        for(key of Object.keys(obj)){
            str += key+ "="+ obj[key]+ "&";
        }
        return str.substring(0,str.length - 1);
    }

    this.getBlogId = function (blogName) {
        var deferred = $q.defer();
        var URL = "https://www.googleapis.com/blogger/v3/blogs/byurl";
        var params = {
            key : "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po",
            url : blogName
        }
        var queryString = objToQueryString(params);
        URL += queryString;
        
        $http.get(URL).success(function (data) {
            blogId = data.id;
            totalItems = data.posts.totalItems;
            deferred.resolve(data);
        });
        //console.log(deferred.promise);
        return deferred.promise;
    }
    this.getPosts = function (blogId,startIndex)
    {
       
       var deferred = $q.defer();

       /* blog present in list of blogs */
       var IsBlogInList = blogutil.searchObjectArray(this.getBlogList(),"blogId",blogId);
       if(IsBlogInList !== null &&  IsBlogInList.category == 2){
           var URL = "https://www.googleapis.com/blogger/v3/blogs/"+ blogId +"/posts?fetchImages=true&key=AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE&maxResults=500";
           $http.get(URL).success(function(data){
               deferred.resolve(data);
           });
       }
       else
       {
           var URL = "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results="+ maxResults +"&alt=json&callback=JSON_CALLBACK";
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

    this.getSearchPosts= function(blogId,startIndex,searchText)
    {
        var deferred = $q.defer();
        //searchText = searchText.replace(new RegExp(" ", "g"), "%20");
         var URL = "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results="+ maxResults +"&alt=json&q="+searchText+"&callback=JSON_CALLBACK";
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
                tempJSON.id = entry.id.$t.match(/\d+/g)[1] + "-"+ entry.id.$t.match(/\d+/g)[2];
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
                    {blogId: "3079987222818050451", blogURL: "http://movies.cinema65.com/", category: 1},
                    {blogId: "4846859112009281783", blogURL: "http://rockingfunimages.blogspot.com/", category: 1},
                    {blogId: "719302156971941098", blogURL: "http://hq-bollywood.blogspot.com/", category: 1},
                    {blogId: "1579799827781024268", blogURL: "http://www.telugupeopleadda.com/", category: 1},
                    {blogId: "5935905342569794143", blogURL: "http://sabhothimages.blogspot.com/", category: 1},
                    {blogId: "801637413886327659", blogURL: "http://honeymedia.blogspot.com/", category: 1},
                    {blogId: "809630945277969589", blogURL: "http://masalaphotoshoot.blogspot.com/", category: 1},
                     {
                        blogId: 1607837477387514460,
                        blogURL: 'http://teluguclue.blogspot.in/',
                        category: 1
                    }, {
                        blogId: 7225871578344472338,
                        blogURL: 'http://www.urtamilcinema.com/',
                        category: 2
                    },  {
                        blogId: 4846859112009281783,
                        blogURL: 'http://www.celebsnext.com/',
                        category: 2
                    }, {
                        blogId: 3293309843232706023,
                        blogURL: 'http://www.searchtamilmovies.com/',
                        category: 1
                    }, {
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
                        blogId: 8630800337511284753,
                        blogURL: 'http://cinemaicon.blogspot.com/',
                        category: 1
                    }, {
                        blogId: 4985646326158465936,
                        blogURL: 'http://www.tollywoodblog.in/',
                        category: 2
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
                        category: 2
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
                    },{
                        blogId: 5489822191765425450,
                        blogURL: 'http://actress-photo-shoot.blogspot.com/',
                        category: 1
                    },{
                        blogId: 8261689056909797037,
                        blogURL: 'http://lgmoviee.blogspot.com/',
                        category: 1
                    },{
                        blogId: 3905178814471876545,
                        blogURL: 'http://sareebelownavelshow.blogspot.com/',
                        category: 1
                    },{
                        blogId: 1739735805822337775,
                        blogURL: 'http://www.vtelugu.in/',
                        category: 1
                    },{
                        blogId: 5656041982218593755,
                        blogURL: 'http://filmgain.blogspot.com/',
                        category: 1
                    },{
                        blogId: 5067574769190905623,
                        blogURL: 'http://actresshdgallery.blogspot.com/',
                        category: 1
                    },{
                        blogId: 8089698501885637773,
                        blogURL: 'http://www.123photos.in/',
                        category: 1
                    },{
                        blogId: 5187513159820363840,
                        blogURL: 'http://www.spicycinegallery.com/',
                        category: 1
                    },
                    {
                        blogId: "506675312802549728",
                        blogURL: 'http://actressmirchi.blogspot.com/',
                        category: 2
                    },
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
                    {blogId: "8733127730104997251", blogURL: "http://hotandsexysouthheroines.blogspot.com/", category: 1},
                    {blogId: "6539177596614326409", blogURL: "http://bollyystilspics.blogspot.com/", category: 1},
                     {blogId: "375502430236704104", blogURL: "http://catchemind.blogspot.com/", category: 1}
                    
                    ];
        return siteList;
    }

    this.postBlogs = [
    { 
        blogId: "7833828309523986982",
        blogURL: 'http://www.desipixer.in/',
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
    {blogId: "2313063316259818401", blogURL: "http://cinestillz.blogspot.com/", category: 1},
     {blogId: "1689491623003449378", blogURL: "http://pixerhub.blogspot.com/", category: 1},
     {blogId: "2360413207505978741", blogURL: "http://pixerblog.blogspot.com/", category: 1},
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
    }
    ];

    return {
        getBlogId: this.getBlogId,
        getPosts: this.getPosts,
        getThumbnails: this.getThumbnails,
        getBlogList: this.getBlogList,
        entries: entries,
        blogId: blogId,
        startIndex : startIndex,
        bloggerKey : bloggerKey,
        getSearchPosts : this.getSearchPosts,
        postBlogs : this.postBlogs,
        selPostBlog : selPostBlog,
        maxResults : maxResults
    }

}]);

app.service('loginService', ['$http', '$q', function ($http, $q) {
    var deferred = $q.defer();

    this.clientKeys = [{
        "name" : "key1",
        "key" : "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com"
    },{
        "name" : "key2",
        "key" : "215192364453-j0vhrg3fl205k4gdqk30eic72rg12out.apps.googleusercontent.com"
    },{
        "name" : "key3",
        "key" : "215192364453-3qtb7m8oocgu684qsfipkpdac6ntsjto.apps.googleusercontent.com"
    }];

    

    this.logMeIn = function ()
    {


        var selectedKey = this.clientKeys[0].key;
        var parameters = {
            client_id: selectedKey,
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
        getToken : this.getToken,
        clientKeys : this.clientKeys,
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
            var POSTURL = "https://www.googleapis.com/blogger/v3/blogs/"+ blogId +"/posts";
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
    return {
        postFunction: this.postFunction
    }

}]);


app.service('blogutil',function(){

   /* variables that stores the images */
    var imgContainer = [];
    var thumbContainer = [];
    var feedObj = [];


    /* removes stop words from the title */
    var removeStopWords = function(string){
        var stopWords = ["Telugu","Tamil","Actress","Acress","CelebsNext","Photoshoot","Cinema","Photos","Photo","Pictures","Picture","Tollywood","Kollywood","Movies","Movie","Latest","Saree","Gallery","Dress","Event","Audio","Stills","Still"," hot ","Navel","Cleavage","Boobs","Exposing","Desi ","Heroine","Heroin", "Images","Wallpapers","Wallpaper","Cute","Spicy","New ","Function","Success Meet","Teaser Launch","Launch "," Hot","Press Meet"," Launch","Sexy "];
        var rExp;
        for(word of stopWords){
            rExp = new RegExp(word,"gi");
            string = string.replace(rExp," ").trim();
        }
        string = removeNoise(string);
        string = string.replace(/\s/g," ").trim();
        return string;
    }

    function removeNoise(string){
        var noiseWords = ["%2B","%25"];
        var rExp;
        for(word of noiseWords){
            rExp = new RegExp(word,"gi");
            string = string.replace(rExp," ").trim();
            string = string.replace(/\W+/g," ").trim();
            string = string.replace(" jpg","").trim();
            string = string.replace(/\s/g," ").trim();
        }
        return string;
    }

    var compareTitle = function(a,b) {
      if (a.cleanTitle < b.cleanTitle)
        return -1;
      if (a.cleanTitle > b.cleanTitle)
        return 1;
      return 0;
    }


    /* parse the feed and get the images in the object */
    var parseFeed = function(obj){
        resetParams();
        if(typeof obj =="object"){
            /* iterate through each entries */
            if(obj.hasOwnProperty("feed")){
                obj.feed.entry.forEach(function(element,index){
                    if(element.content.$t !== undefined){
                        var htmlContent = element.content.$t;

                        feedObj.push(parseEntry(element));
                        //imgContainer = imgContainer.concat(parseImageFromHTML(htmlContent));
                        //thumbContainer = JSON.parse(JSON.stringify(imgContainer).replace(/s1600/g,"s320"));
                    }
                });
            }
            if(obj.hasOwnProperty("items")){
                obj.items.forEach(function(element,index){
                    if(element.content != undefined){
                        var htmlContent = element.content;
                        feedObj.push(parseAPIEntry(element));
                    }
                })
            }
            

        }   

    }

    /* returns filtered result of an entry */
    var parseEntry = function(entry){
        var obj = {};
        obj.title = entry.title.$t;
        obj.images = parseImageFromHTML(entry.content.$t);
        obj.thumbs = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g,"s320")); //can be memory intensive
        obj.id = entry.id.$t.match(/\d+/g)[1] + "-"+ entry.id.$t.match(/\d+/g)[2];
        obj.published = (new Date(entry.published.$t)).getTime();
        obj.updated = (new Date(entry.updated.$t)).getTime();
        if(entry.hasOwnProperty("link")){
            obj.url = (entry.link[entry.link.length - 1].href);
        }
        obj.cleanTitle = removeStopWords(entry.title.$t);
        if(entry.hasOwnProperty("category"))
            obj.category = (entry.category[0].hasOwnProperty("term")) ? entry.category[0].term : "";
        return obj;
    }

    /* returns filtered result of an entry */
    var parseAPIEntry = function(entry){
        var obj = {};
        obj.title = entry.title;
        obj.images = parseImageFromHTML(entry.content);
        obj.thumbs = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g,"s320")); //can be memory intensive
        obj.id = entry.id;
        obj.published = (new Date(entry.published)).getTime();
        obj.updated = (new Date(entry.updated)).getTime();
        obj.url = entry.url;
        obj.labels = entry.labels;
        obj.cleanTitle = removeStopWords(entry.title);
        return obj;
    }

    /* takes html content as input and returns array */
    var parseImageFromHTML = function(htmlContent){
        var imgArray = [];
        var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
        if(imgTags != undefined && imgTags.length > 0){
            for(img of imgTags){
                var imgURL = img.match(/(https?:\/\/.*\.(?:png|jpg))/ig);
                if(imgURL != undefined && imgURL.length > 0){

                    /* get large images if it is a blogger site images */
                    if(imgURL[0].indexOf("bp.blogspot.com") !== -1 && imgURL[0].indexOf("telugu.zustcinema_film_news_updates.png") == -1){
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
        for(feed of feedObj){
            imgContainer = imgContainer.concat(feed.images);
        }
        return imgContainer;
    }
    
    /* returns the list of thumbs from feed */
    var getThumbs = function(obj){
        for(feed of feedObj){
            imgContainer = imgContainer.concat(feed.thumbs);
        }
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
        searchObjectArray : searchObjectArray,
        compareTitle : compareTitle
    }
});