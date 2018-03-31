/**
 * Parse all the contents and build the JSON
 */
app.controller('myCtrl', ['$scope', '$http', 'service.util', '$q', 'service.auth', 'service.wp', function ($scope, $http, serviceUtil, $q, authService, wpService) {

    $scope.startIndex = 0;
    $scope.endIndex = 0;

    $scope.batchSize = 5;

    var settings = {
        count: 0,
        start: parseInt($scope.startIndex),
        end: parseInt($scope.endIndex),
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
            try {
                var count = settings.count || 0;
                var start = parseInt($scope.startIndex) || 0;
                var end = parseInt($scope.endIndex) || 0;
                var errCount = settings.errCount || 0;
                var imageCount = parseInt($scope.batchSize) || 1;
                end = arr.length;
                postDumpImages(arr, start, end, count, errCount, imageCount);
            } catch(ex){
                console.log("ERROR >> ex ", ex);
            }
        } else {
            console.log("ERROR >> Invalid array");
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
        var title = serviceUtil.getCleanTitleName(arr[start]) + " dump " + count;
        var content = wpService.generatePostHtml(tempArr);

        //if randomize option is selected, then select on all array items.
        if ($scope.randomPoster == true) {
            try {
                // if randomize option is selected.
                var arrLength = $scope.postSiteList.length;
                var index = Math.floor(Math.random() * arrLength)
                var bearerToken = $scope.postSiteList[index].k;
                var wpBlogId = $scope.postSiteList[index].id;
                siteUrl = $scope.postSiteList.filter(function (obj) {
                    return obj.id == wpBlogId;
                })[0].url;
                //console.log("RANDOMIZED : ", wpBlogId, bearerToken, siteUrl);
            } catch (ex) {
                console.log("EXCEPTION : ", ex)
            }
        } else {
            //get selected site's blog key and id.
            var selectedSite = $scope.selectedSite;
            console.log(selectedSite);
            let temparr = $scope.postSiteList.filter(function (obj) {
                return obj.url == selectedSite;
            });

            if (temparr.length > 0) {
                bearerToken = temparr[0].k;
                wpBlogId = temparr[0].id;
            }
        }

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
        "settings7.json",
        "settings6.json",
        "settings5.json",
        "settings4.json",
        "settings3.json",
        "settings.json",
        "settings2.json"
    ];

    var postArr = [];


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
    fetch('config/settings7.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        $scope.postSiteList = data;
        $scope.selectedSiteChanged();
        $scope.$applyAsync();
        //console.log(data);
    });
}]);