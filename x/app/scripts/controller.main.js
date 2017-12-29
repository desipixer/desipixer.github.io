/**
 * Parse all the contents and build the JSON
 */
app.controller('myCtrl', ['$scope', '$http', 'service.util', '$q', 'service.auth', 'service.wp', function ($scope, $http, serviceUtil, $q, wpService) {
    $scope.siteId = "873009466583458846";
    $scope.siteName = "https://hq-tollywood.blogspot.com";
    $scope.showOutput = true;
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
        "settings8.json"
    ];

    var postArr = [];

    $scope.postMethod = true;

    $scope.postToWp = function (data) {

        var option = $scope.postMethod == true ? 1 : 2;

        if (option == 1) {
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
        } else if (option == 2) {
            var el = document.getElementById('uploadFile');
            document.getElementById('uploadFile').addEventListener('change', onChange);
            var event = new CustomEvent('change', onChange);
            el.dispatchEvent(event);
        }
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
     * Hook up form control events.
     * When you upload the file, get the data from there instead of blog.
     * //TODO : Add radiobutton to choose option.
     */
    function onChange(event) {
        try {
            var reader = new FileReader();
            reader.onload = onReaderLoad;
            if (event.target.files.length < 0) {
                console.log("ERROR >> file not selected");
                $('#errContainer').text("ERROR >> file not selected").css('color', 'red');
            }
            reader.readAsText(event.target.files[0]);
        }
        catch (ex) {
            console.log("ERROR >> onChange : ", ex);
        }

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
            console.log("ERROR >> onReaderLoad : ", e);
        }
    }


    $scope.postJson = function () {
        var el = document.getElementById('uploadFile');
        document.getElementById('uploadFile').addEventListener('change', onChange);
        var event = new CustomEvent('change', onChange);
        el.dispatchEvent(event);
    }

    /**
     * Gets wpKeys from config files and populates array
     */
    fetch('config/settings8.json').then(function (response) {
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