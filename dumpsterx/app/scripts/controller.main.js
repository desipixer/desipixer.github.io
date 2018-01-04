/**
 * Parse all the contents and build the JSON
 */
app.controller('myCtrl', ['$scope', '$http', 'service.util', '$q', 'service.auth', 'service.wp', function ($scope, $http, serviceUtil, $q, authService, wpService) {

    $scope.startIndex = 0;
    $scope.endIndex = 0;
    
    $scope.batchSize = 5;

    var settings = {
        count: 0,
        start: $scope.startIndex,
        end: $scope.endIndex,
        errCount: 0,
        imageCount: 1
    };

    $scope.showOutput = true;
    

    $scope.postJson = function () {
        var el = document.getElementById('uploadFile');
        document.getElementById('uploadFile').addEventListener('change', onChange);
        var event = new CustomEvent('change', onChange);
        el.dispatchEvent(event);
    }


    /**
		 * Function for file upload
		 * @param {*} event 
		 */
    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        if (event.target.files.length < 0) {
            console.log("ERROR >> file not selected");
            $('#errContainer').text("ERROR >> file not selected").css('color', 'red');
        }
        reader.readAsText(event.target.files[0]);
    }



    function dumpImages(arr) {
        if (arr) {
            var count = settings.count || 0;
            var start = $scope.startIndex || 0;
            var end = $scope.endIndex || 0;
            var errCount = settings.errCount || 0;
            var imageCount = parseInt($scope.batchSize) || 1;
            end = arr.length;
            postDumpImages(arr, start, end, count, errCount, imageCount);
        } else {
            console.log("ERROR >> Invalid array");
        }
    }


    var generateDumpHtml = function(arr){
        if(arr){
            var str = "";
            arr.forEach(function(value, index){
                var imgTitle = getCleanTitleName(value);
                var src = value;
                str += `<div id='postContainer'><h2> ${imgTitle} </h2> <div id='picContainer'><img src='${src}' title='${imgTitle}' alt='photo desipixer' /></div></div>`;
            });
            return str;
        }
    }


    function postDumpImages(arr, start, end, count, errCount, imageCount) {
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
        var tempArr = [];
        try {
            tempArr = arr.slice(start, start + imageCount)
        }
        catch (e) {
            console.log("ERROR >> array exception : ", e)
        }
        var title = getCleanTitleName(arr[start]) + " dump " + count;
        var content = generateDumpHtml(tempArr);


        $http({
            method: 'POST',
            url: wpService.getPostWpUrl(wpBlogId),
            data: {
                title: title,
                content: content
            },
            headers: {
                "Authorization": "Bearer " + bearerToken
            }
        }).success(function (data) {
            console.log("data : ", data);
            console.log("COUNT : " + ++count);
            $scope.wpPostResponse = data;
            $scope.responseUrl = data.URL || "";

            postDumpImages(arr, start + imageCount, end, count, errCount, imageCount);

        }).error(function (err) {
            if (errCount > 20) {
                return;
            }
            console.log("ERROR >> " + err);
            console.log("COUNT : " + ++count);
            postDumpImages(arr, start + imageCount, end, count, ++errCount, imageCount);
        })
    }

    function onReaderLoad(event) {
        try {
            var obj = JSON.parse(event.target.result);
            if (obj) {
                if (typeof obj == 'object') {
                    $scope.endIndex = obj.length;
                    dumpImages(obj);
                }
            } else {
                console.log("INVALID object");
            }
        } catch (e) {
            console.log("ERROR >> ", e);
        }
    }

    $scope.getSite = function () {
        if ($scope.siteId) {
            $('#fetchStatus').show();
            var siteId = $scope.siteId;
            $scope.status = "Processing...";
            $scope.statusColor = "blue";
            serviceUtil.getBlogFeedJSON(siteId, 1, 500, $scope.totalItems, []).then(function (data) {
                $scope.status = "COMPLETED";
                $scope.statusColor = "green";
                $('#fetchStatus').fadeOut(3000);
                $scope.postToWp(data);
            });
        }
    };

    $scope.configSettings = [
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
    $scope.onConfigChanged = function () {
        var thisConfig = $scope.selectedConfig;
        var fileSelect = "config/" + thisConfig;
        fetch(fileSelect).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log("config ", data);
            $scope.postSiteList = data;
            $scope.$applyAsync();
        });
    }

    /**
		 * Cleans title Name and returns the title.
		 */
		function getCleanTitleName(link) {
			try {
				var pathname = (new URL(link)).pathname;
				var filename = pathname.split("/").pop();
				filename = cleanFileName(filename);
				filename = removeStopWords(filename);
				return filename;
			} catch(ex){
				console.log("Error >> getCleanTitleName : ", ex);
				return (new Date().getTime())+" err";
			}
        }
        
        function cleanFileName(str) {
			try {
				str = decodeURIComponent(str);
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
			} catch(ex) {
				console.log("Error >> cleanFileName : ", ex);
				return (new Date().getTime())+" err";
			}
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

    $scope.selectedSiteChanged = function () {

        var siteUrl = $scope.selectedSite;
        let temparr = $scope.postSiteList.filter(function (obj) {
            return obj.url == siteUrl;
        });
        if (temparr.length > 0) {
            bearerToken = temparr[0].k;
            wpBlogId = temparr[0].id;
        }

        //fetch post count of the selected site.
        if (siteUrl) {
            var hostName;
            try {
                hostName = new URL(siteUrl).hostname;
            }
            catch (ex) {
                console.log("ERROR >> ", ex);
                return;
            }

            var wpPostCountUrl = `https://public-api.wordpress.com/rest/v1.1/sites/${hostName}/posts?fields=found`;
            fetch(wpPostCountUrl).then(function (response) {
                return response.json()
            }).then(function (data) {
                if (data) {
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
    fetch('config/settings2.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        $scope.postSiteList = data;
        $scope.selectedSiteChanged();
        $scope.$applyAsync();
        //console.log(data);
    })


}]);