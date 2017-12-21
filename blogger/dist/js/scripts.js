var app = angular.module('myApp', []);
app.service('service.auth', function () {

    /**
     * return k value for the site.
     */
    var AuthUtil = (function () {
        var k = Object.freeze({
            "k": "AIzaSyAOODMyvwKYBxGRTn2mIWNMJAFlUmFOEi8"
        });
        var getKey = function () {
            return k.k;
        };

        return {
            getKey: getKey
        }
    })();

    
    
    return {
        getKey: AuthUtil.getKey
    }
})
app.service('service.util', ['$http', 'service.auth', '$q', function ($http, authService, $q) {

    var actressList = [];
    var isDescriptionEnabled = true;
    var isHiddenContentEnabled = true;
    var postDescription = 'Desipixer is a Tamil, Telugu, Hindi film website givings news, reviews, photos, interviews, trailers and videos. It includes pictures from Bollywood, Tollywood, Kollywood and Hollywood';
    this.postContent = null;
    var myPostContent = this.postContent;
    //Use fetch API to update actress list
    try {
        fetch('./files/actress.json').then(function (response) {
            return response.json()
        }).then(function (data) {
            actressList = data;
        });
    } catch (ex) {
        console.log("ERROR ", ex);
    }

    var settings = {
        defaultBlog: "https://desipixer.blogspot.com"
    }

    var k = authService.getKey();
    var iArr = [];
    var count = 0;
    var deferred = $q.defer();
    this.imageCount = 0;

    var getApiUrl = function (id, nToken, maxResults = 250) {
        var apiUrl = "https://www.googleapis.com/blogger/v3/blogs/" + id + "/posts?fetchImages=true&key=" + k;
        if (!id) {
            console.log("getApiUrl() >> siteId is null")
            return null;
        }
        if (nToken) {
            apiUrl += "&pageToken=" + nToken;
        }
        if (maxResults) {
            apiUrl += "&maxResults=" + maxResults;
        }
        return apiUrl;
    }

    /**
     * Generates google API call:
     * When blog Url is passed, it returns blog Id
     * @param {*} blogName 
     */
    var getBlogIdFromUrl = function (blogName) {
        if (!blogName) {
            blogName = settings.defaultBlog;
        }
        blogName = new URL(blogName).origin;
        var apiUrl = "https://www.googleapis.com/blogger/v3/blogs/byurl?key=" + k + "&url=" + blogName;
        return apiUrl;
    }


    var callBlogIdFromUrl = function (blogName) {
        var d = $q.defer();
        if (!blogName) {
            blogName = settings.defaultBlog;
        }
        var reqUrl = getBlogIdFromUrl(blogName);
        axios.get(reqUrl).then(function (obj) {
            console.log(obj);
            d.resolve(obj);
        }).catch(function (err) {
            console.log("ERROR ", err)
        })
        // $http.get(reqUrl).then(function (obj) {
        //     d.resolve(obj);
        // });
        return d.promise;
    }

    var filterImages = function (htmlContent) {
        var imgArr = [];
        var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
        if (imgTags != undefined && imgTags.length > 0) {
            for (var i = 0; i < imgTags.length; i++) {
                var imgURL = imgTags[i].match(/(https?:\/\/.*\.(?:png|jpg))/);
                if (imgURL != undefined && imgURL.length > 0) {
                    var picURL = imgURL[0];
                    if (picURL.indexOf('bp.blogspot.com')) {
                        var splitter = picURL.split("/")[7];
                        picURL = picURL.replace(splitter, "s1600");
                        imgArr.push(picURL);
                    }
                }
            }
        }
        return imgArr;
    }



    function WpPost(title, images) {
        this.title = title;
        this.images = images;
        this.cleanTitle = removeStopWords(title);
    }

    WpPost.prototype.getImagesHtml = function () {
        if (this.images) {
            var str = "<div id='postContainer'>";
            var title = this.title;
            if (this.images.length > 0) {
                this.images.forEach(function (val, index) {
                    str += `<div class='picContainer'> <img src='${val}' alt='${title}' title='${title}' /></div>`
                });
                if (isDescriptionEnabled == true) {
                    str += `<div id='description'> ${title} - desipixer </div> <div id='descriptionText'> ${postDescription} </div>`;
                }
                if (isHiddenContentEnabled == true) {
                    var hContent = JSON.stringify(this.images.map(function (v) {
                        try {
                            var x = new URL(v);
                            return x.href.replace(x.protocol, "")
                        } catch (ex) {
                            return '';
                        }
                    }));

                    str += `<div id='hContent' style='display:none'> ${hContent} </div>`;
                }
                str += "</div>";
                return str;
            }
        }
        return null;
    }

    /**
     * Get WpPost object array from this function.
     * @param {*} id 
     * @param {*} nextPageToken 
     * @param {*} maxResults 
     */
    function getBlogJSON(id, nextPageToken, maxResults) {
        var apiUrl = getApiUrl(id, nextPageToken, maxResults);
        //console.log(apiUrl);
        if (apiUrl) {
            axios.get(apiUrl).then(
                //SUCCESS FUNCTION
                function (obj) {
                    // console.log(obj.data);
                    var data = obj.data;
                    if (data) {
                        var items = data.items;
                        //var processedArray = processBlogEntires(items);
                        //debugger;
                        data.items.forEach(function (item, index) {
                            var title = cleanFileName(item.title);
                            var imgArr = filterImages(item.content);
                            if (imgArr.length > 0)
                                imgArr.forEach(function (v, i) {
                                    if (v) {
                                        var wpPost = new WpPost(title, [v]);
                                        if (wpPost) {
                                            iArr = iArr.concat(wpPost);
                                        }
                                    }
                                })
                        });
                        this.imageCount = iArr.length;
                        console.log("total Images : ", iArr.length);
                        if (data.hasOwnProperty('nextPageToken')) {
                            console.log("Object nextPageToken : " + data.nextPageToken);
                            console.log("next page exists ? : true");
                            getBlogJSON(id, data.nextPageToken, maxResults)
                        } else {
                            console.log("next page exists ? : false");
                            deferred.resolve(iArr);
                            return;
                        }
                    } else {
                        console.log("getBlogJSON() >> data is null");
                    }
                }).catch(function (err) {
                    console.log("getBlogJSON() >> ERROR : " + err);
                });
        } else {
            console.log("getBlogJSON() >> apiUrl is null " + apiUrl);
        }
        return deferred.promise;
    }
    var settings = {
        id: '8286550106938870562',
        startIndex: 1,
        maxResults: 500,
        totalItems: 500
    }

    function FeedPost(title, images) {
        this.title = title;
        this.images = images
        this.cleanTitle = removeStopWords(this.title);
    }

    FeedPost.prototype.getImagesHtml = function () {
        if (this.images) {
            var str = "<div id='postContainer'>";
            var title = this.title;
            if (this.images.length > 0) {
                this.images.forEach(function (val, index) {
                    str += `<div class='picContainer'> <img src='${val}' alt='${title}' title='${title}' /></div>`
                });
                if (isDescriptionEnabled == true) {
                    str += `<div id='description'> ${title} - desipixer </div> <div id='descriptionText'> ${postDescription} </div>`;
                }
                if (isHiddenContentEnabled == true) {
                    var hContent = JSON.stringify(this.images.map(function (v) {
                        try {
                            var x = new URL(v);
                            return x.href.replace(x.protocol, "")
                        } catch (ex) {
                            return '';
                        }
                    }));

                    str += `<div id='hContent' style='display:none'> ${hContent} </div>`;
                }
                str += "</div>";
                return str;
            }
        }
        return null;
    }

    /**
     * Recursively gets all feeds from blogger
     * @param {*} id 
     * @param {*} startIndex 
     * @param {*} maxResults 
     * @param {*} totalItems 
     * @param {*} arr 
     */
    function getBlogFeedJSON(id = settings.id, startIndex = 1, maxResults = 500, totalItems = 500, arr = [], def = $q.defer()) {
        if (startIndex > totalItems) {
            return arr;
        }
        var apiUrl = getBloggerApiUrl(id, startIndex, maxResults);

        // using superagent for calling JSON instead of jquery ajax.
        superagent.get(apiUrl).end((err, res) => {
            // check statuscode.
            if (err) {
                console.log("ERROR in superagent call >> ", err);
            } else if (res.status == 200) {
                var obj = res.body;
                if (obj) {
                    try {
                        var entries = obj.feed.entry;
                        if (entries && entries.length > 0) {
                            entries.forEach(function (val, index) {
                                var imgArr = filterImages(val.content.$t);
                                var title = cleanFileName(val.title.$t);
                                if (imgArr && imgArr.length > 0) {
                                    imgArr.forEach(function (v, i) {
                                        if (v) {
                                            var post = new FeedPost(title, [v]);
                                            if (post) {
                                                arr = arr.concat(post);
                                            }
                                        }
                                    });
                                }
                            });
                        } else {
                            console.log("NO ENTRIES FOUND");
                        }
                        startIndex = startIndex + maxResults;
                        if (startIndex < totalItems) {
                            getBlogFeedJSON(id, startIndex, maxResults, totalItems, arr, def);
                        } else {
                            def.resolve(arr);
                        }
                    } catch (ex) {
                        console.log("ERROR >> ", ex);
                        return arr;
                    }
                }
            }
        });
        return def.promise;
    }

    /**
     * Returns blogger feed URL.
     * @param {*} id 
     * @param {*} startIndex 
     * @param {*} maxResults 
     */
    function getBloggerApiUrl(id = '8286550106938870562', startIndex = 1, maxResults = 500) {
        return `https://www.blogger.com/feeds/${id}/posts/default?start-index=${startIndex}&max-results=${maxResults}&alt=json`
    }

    /**
     * Download JSON object as file.
     * @param {*} objJSON 
     * @param {*} fileName 
     */
    function downloadFileAsJson(objJSON, fileName) {
        if (!objJSON) {
            return null;
        }
        if (!fileName) {
            fileName = "default-json.json"
        }
        var saveData = (function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function (data, fileName) {
                var json = JSON.stringify(data),
                    blob = new Blob([json], { type: "octet/stream" }),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());

        var data = objJSON,
            fileName = fileName;

        saveData(data, fileName);
    }


    /**
		 * Cleans title Name and returns the title.
		 */
    function getCleanTitleName(link) {
        var pathname = (new URL(link)).pathname;
        var filename = pathname.split("/").pop();
        filename = cleanFileName(filename);
        filename = removeStopWords(filename);
        return filename;
    }

    function cleanFileName(str) {
        //str = decodeURIComponent(str);
        var suffix = "";
        var suffixMatch = str.match(/(\.jpg)|(\.png)/g);
        if (suffixMatch !== undefined && suffixMatch !== null) {
            suffix = suffixMatch[0];
        }
        str = str.replace(/(\.jpg)|(\.png)/g, " ");
        str = str.replace(/\W/g, " ");
        str = str.replace(/\_/g, " ");
        str = str.replace(/\s+/g, " ").trim();
        return str;
    }

    function removeStopWords(string) {
        var stopWords = ["Telugu", "Tamil", "Actress", "Acress", "CelebsNext", "Photoshoot", "Cinema", "Photos", "Photo", "Pictures", "Picture", "Tollywood", "Kollywood", "Movies", "Movie", "Latest", "Saree", "Gallery", "Dress", "Event", "Audio", "Stills", "Still", " hot ", "Navel", "Cleavage", "Boobs", "Exposing", "Desi ", "Heroin", "Images", "Wallpapers", "Wallpaper", "Cute", "Spicy", "New ", "Function", "Success Meet", "Teaser Launch", "Launch ", " Hot", "Press Meet", " Launch"];
        var rExp;
        stopWords.forEach(function (val, index) {
            rExp = new RegExp(val, "gi");
            string = string.replace(rExp, " ").trim();
        });
        string = string.replace(/\s+/g, " ").trim();
        return string;
    }

    function getCategories() {
        return actressList;
    }

    function getMatchingCategories(title) {
        var cat = _.filter(actressList, function (val) {
            if (title.indexOf(val) != -1) {
                return val;
            }
        });
        return cat;
    }

    var getMatchingCategories = function (title, data) {
        data = data || actressList;
        var cat = _.filter(data, function (val) {

            if (title.toLowerCase().indexOf(val.toLowerCase()) != -1) {
                return val;
            }
        });
        if (cat) {
            if (cat.length > 0) {
                cat = [cat[cat.length - 1]];
            }
        }
        return cat;
    }

    var compareTitle = function (a, b) {
        if (a.cleanTitle < b.cleanTitle)
            return -1;
        if (a.cleanTitle > b.cleanTitle)
            return 1;
        return 0;
    }

    function titleSort(arr) {
        return arr.sort(compareTitle)
    }

    function hidePage() {
        var title = document.title;
        var dummyPageTitle = "Worksheet 02";
        var dummyPageContent = "";
        document.title = dummyPageTitle;
        $('#hidePage').toggleClass('fadeMe');
    }

    /**
     * Process array of blog objects and return the final array
     * @param {*} entry 
     */
    function processBlogEntires(entry) {
        if (!entry || !(entry instanceof Array) || entry.length == 0) {
            return [];
        }
        var processedArray = entry.map((obj) => {
            var title = cleanFileName(obj.title);
            var imgArr = filterImages(obj.content);
            if (imgArr.length > 0) {
                return new WpPost(title, imgArr);
            }
            return [];
        });
        return processedArray;
    }

    return {
        getBlogJSON: getBlogJSON,
        downloadFileAsJson: downloadFileAsJson,
        callBlogIdFromUrl: callBlogIdFromUrl,
        getCategories: getCategories,
        imageCount: this.imageCount,
        getMatchingCategories: getMatchingCategories,
        postContent: myPostContent,
        titleSort: titleSort,
        hidePage: hidePage,
        processBlogEntires: processBlogEntires,
        getBlogFeedJSON: getBlogFeedJSON
    }

}]);
/**
 * Parse all the contents and build the JSON
 */
app.controller('myCtrl', ['$scope', '$http', 'service.util', '$q', 'service.auth', function ($scope, $http, serviceUtil, $q) {
    $scope.siteId = "873009466583458846";
    $scope.siteName = "https://idlepix.blogspot.com";
    $scope.showOutput = true;
    $scope.getSite = function () {
        if($scope.siteId){
            $('#fetchStatus').show();
            var siteId = $scope.siteId;
            $scope.status = "Processing...";
            $scope.statusColor = "blue";
            serviceUtil.getBlogFeedJSON(siteId, 1, 500, $scope.totalItems, []).then(function(data){
                $scope.status = "COMPLETED";
                $scope.statusColor = "green";
                $('#fetchStatus').fadeOut(3000);
                $scope.postToWp(data);
            });
        }
    };

    $scope.configSettings = [
        "settings5.json",
        "settings4.json",
        "settings3.json",
        "settings.json",
        "settings2.json"
    ];

    var postArr = [];

    $scope.postToWp = function (data) {
        if (data) {
            var startIndex = $scope.startIndex || 0;
            var endIndex = $scope.endIndex || data.length;
            var count = 0;
            var errCount = 0;
            console.log(`startIndex:${startIndex}, endIndex:${endIndex} `);
            if ($scope.sortByName == true) {
                postArr = serviceUtil.titleSort(data);
            } else {
                postArr = data;
            }

            postImages(startIndex, endIndex, count, errCount);
        } else {
            console.log("ERROR >> data is null or empty");
        }
        //console.log(data);

    }

    var wpBlogId = 139747387;
    var bearerToken = "h0qE3ZX1z7CZRusMAB$^@HD*ZjicLeN!Yu$OqKVzzn%fswejn66U*r9kUH&fpk5q";

    //If user switches the config file, populate siteList with respective config
    $scope.onConfigChanged = function(){
        var thisConfig = $scope.selectedConfig;
        var fileSelect = "config/"+ thisConfig;
        fetch(fileSelect).then(function(response){
            return response.json()
        }).then(function(data){
            console.log("config ", data);
            $scope.postSiteList = data;
            $scope.$applyAsync();
        });
    }

    $scope.selectedSiteChanged = function () {
    
        var siteUrl = $scope.selectedSite;
        let temparr = $scope.postSiteList.filter(function(obj){
            return obj.url == siteUrl;
        });
        if (temparr.length > 0) {
            bearerToken = temparr[0].k;
            wpBlogId = temparr[0].id;
        }

        //fetch post count of the selected site.
        if(siteUrl){
            var hostName;
            try {
                hostName = new URL(siteUrl).hostname;
            }
            catch(ex){
                console.log("ERROR >> ", ex);
                return;
            }

            var wpPostCountUrl = `https://public-api.wordpress.com/rest/v1.1/sites/${hostName}/posts?fields=found`;
            fetch(wpPostCountUrl).then(function(response){
                return response.json()
            }).then(function(data){
                if(data){
                    $scope.postsCount = data.found || 0;
                    $scope.$applyAsync();   
                }
            })
        }
        
    }


    /**
		 * Iterates through the array and post it
		 * @param {*} arr 
		 * @param {*} start 
		 * @param {*} end 
		 * @param {*} count 
		 */
    function postImages(start, end, count, errCount) {
        console.log("start:end:count:errCount", start, end, count, errCount);
        $scope.responseObj = JSON.stringify({
            "start": start,
            "end": end,
            "count": count,
            "errCount": errCount
        });
        if (start > end) {
            return;
        }
        if (postArr[start]) {
            var title = postArr[start].title + " - desipixer";
            var content = postArr[start].getImagesHtml();
            var categories = serviceUtil.getMatchingCategories(title);

            /** POST FUNCTION EXECUTES HERE */
            $http({
                method: 'POST',
                url: "https://public-api.wordpress.com/rest/v1/sites/" + wpBlogId + "/posts/new",
                data: {
                    title: title,
                    content: content,
                    categories: categories,
                    tags: categories
                },
                headers: {
                    "Authorization": "Bearer " + bearerToken
                }
            }).success(function (data) {
                console.log("COUNT : " + ++count);
                $scope.responseUrl = data.URL || "";
                $scope.postContent = vkbeautify.json(JSON.stringify(data), 4);
                //Post next from the array
                postImages(++start, end, count, errCount);

            }).error(function (err) {
                if (errCount > 20) {
                    return;
                }
                console.log("ERROR >> " + err);
                console.log("COUNT : " + ++count);
                postImages(++start, end, count, ++errCount);
            })
        }
    }


    $scope.getSiteName = function () {
        if ($scope.siteName) {
            var siteName = $scope.siteName;
            var promise = serviceUtil.callBlogIdFromUrl(siteName);
            promise.then(function (obj) {
                if (obj.data) {
                    if (obj.data.id) {
                        $scope.siteId = obj.data.id;
                        try {
                            $scope.totalItems = obj.data.posts.totalItems
                        } catch (ex) {
                            console.log("ERROR >>", ex);
                        }
                    }
                }
            })
        } else {
            console.log("Error >> site name not defined");
        }
    }

    $scope.pageHide = function () {
        serviceUtil.hidePage();
    }
    


    /**
     * Gets wpKeys from config files and populates array
     */
    fetch('config/settings5.json').then(function(response){
        return response.json();
    }).then(function(data){
        if(typeof data == "string"){
            data = JSON.parse(data);
        }
        $scope.postSiteList = data;
        $scope.selectedSiteChanged();
        $scope.$applyAsync();        
        //console.log(data);
    })


}]);