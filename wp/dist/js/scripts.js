var app = angular.module('myApp', []);
app.service('service.auth', function () {

    /**
     * return k value for the site.
     */
    var AuthUtil = (function () {
        var k = Object.freeze({
            "k": "AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE"
        });
        var getKey = function () {
            return k.k;
        };

        return {
            getKey: getKey
        }
    })();

    var WpAuth = (function(){
        
        var getWpAuth = {
            "k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
            "id": "137728983",
            "url": "http://pixer12wp.wordpress.com"
        }

        return {
            getWpAuth : getWpAuth
        }
    })();
    
    return {
        getKey: AuthUtil.getKey,
        getWpAuth : WpAuth.getWpAuth
    }
})
app.service('service.util', ['$http', 'service.auth', '$q', function ($http, authService, $q) {

    var settings = {
        defaultBlog : "https://desipixer.blogspot.com"
    }

    var k = authService.getKey();
    var iArr = [];
    var count = 0;
    var deferred = $q.defer();
    this.imageCount = 0;

    var getApiUrl = function (id, nToken, maxResults) {
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
    var getBlogIdFromUrl = function(blogName){
        if(!blogName){
            blogName = settings.defaultBlog;
        }
        blogName = new URL(blogName).origin;
        var apiUrl = "https://www.googleapis.com/blogger/v3/blogs/byurl?key="+ k + "&url="+ blogName;
        return apiUrl;
    }


    var callBlogIdFromUrl = function(blogName){
        var d = $q.defer();
        if(!blogName){
            blogName = settings.defaultBlog;
        }
        var reqUrl = getBlogIdFromUrl(blogName);
        $http.get(reqUrl).then(function(obj) {
            d.resolve(obj);
        });
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

    function WpPost(title, images){
        this.title = title;
        this.images = images;
    }

    WpPost.prototype.getImagesHtml = function(){
        if(this.images){
            var str = "<div>";
            var title = this.title;
            if(this.images.length > 0){
                this.images.forEach(function(val, index){
                    str += `<div class='picContainer'> <img src='${val}' alt='${title}' title='${title}' /></div>`
                });
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
        console.log(apiUrl);
        if (apiUrl) {
            $http.get(apiUrl).then(
                //SUCCESS FUNCTION
                function (obj) {
                    console.log(obj.data);
                    var data = obj.data;
                    if (data) {
                        var items = data.items;
                        data.items.forEach(function (item, index) {
                            var title = cleanFileName(item.title);
                            var imgArr = filterImages(item.content);
                            if (imgArr.length > 0)
                                var wpPost = new WpPost(title, imgArr);
                                if(wpPost){
                                    iArr = iArr.concat(new WpPost(title,imgArr));
                                }
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
                },  //ERROR FUNCTION
                function (err) {
                    console.log("getBlogJSON() >> ERROR : " + err);
                });
        } else {
            console.log("getBlogJSON() >> apiUrl is null " + apiUrl);
        }
        return deferred.promise;
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

    return {
        getBlogJSON: getBlogJSON,
        downloadFileAsJson: downloadFileAsJson,
        callBlogIdFromUrl : callBlogIdFromUrl,
        imageCount : this.imageCount
    }

}]);
/**
 * Parse all the contents and build the JSON
 */
app.controller('myCtrl', ['$scope', '$http', 'service.util', '$q', 'service.auth', function ($scope, $http, serviceUtil, $q, authService) {
    $scope.siteId = "873009466583458846";
    $scope.siteName = "https://idlepix.blogspot.com";
    $scope.getSite = function () {
        if ($scope.siteId) {
            var siteId = $scope.siteId;
            $scope.status = "Processing...";
            $scope.statusColor = "blue";
            var promise = serviceUtil.getBlogJSON(siteId, null, 500);
            promise.then(function (data) {
                console.log(data);

                $scope.status = "Completed";
                $scope.statusColor = "green";
                $scope.postToWp(data);
            }, function (err) {
                $scope.status = "Error";
                $scope.statusColor = "red";
                console.log("ERROR >> " + error)
            });
        }
    };

    $scope.postToWp = function (data) {
        if (data) {
            var startIndex = 0;
            var endIndex = data.length;
            var count = 0;
            var errCount = 0;
            postImages(data, startIndex, endIndex, count, errCount);
        } else {
            console.log("ERROR >> data is null or empty");
        }
        //console.log(data);

    }

    var wpBlogId = authService.getWpAuth.id;
    var bearerToken = authService.getWpAuth.k;
    /**
		 * Iterates through the array and post it
		 * @param {*} arr 
		 * @param {*} start 
		 * @param {*} end 
		 * @param {*} count 
		 */
    function postImages(arr, start, end, count, errCount) {
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
        if (arr[start]) {
            var title = arr[start].title;
            title = title + " - photos actress pictures bollywood tollywood desipixer";
            //console.log("title : ", title);
            var content = arr[start].getImagesHtml();
            //var content = "<div><img src='" + arr[start] + "' title='" + title + "' alt='" + title + "' /></div>";

            //console.log("content : ", content);
            /** POST FUNCTION EXECUTES HERE */
            $http({
                method: 'POST',
                url: "https://public-api.wordpress.com/rest/v1/sites/" + wpBlogId + "/posts/new",
                data: {
                    title: title,
                    content: content
                },
                headers: {
                    "Authorization": "Bearer " + bearerToken
                }
            }).success(function (data) {
                //console.log("data : ", data);
                console.log("COUNT : " + ++count);
                //$scope.wpPostResponse = data;
                $scope.responseUrl = data.URL || "";

                postImages(arr, ++start, end, count, errCount);

            }).error(function (err) {
                if (errCount > 20) {
                    return;
                }
                console.log("ERROR >> " + err);
                console.log("COUNT : " + ++count);
                postImages(arr, ++start, end, count, ++errCount);
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
                    }
                }
            })
        } else {
            console.log("Error >> site name not defined");
        }
    }



}]);