/**
 * Parse all the contents and build the JSON
 */
app.controller('myCtrl', ['$scope', '$http', 'service.util', '$q', 'service.auth', function ($scope, $http, serviceUtil, $q, authService) {
    $scope.siteId = "873009466583458846";
    $scope.siteName = "https://idlepix.blogspot.com";
    $scope.showOutput = true;
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

    var wpBlogId = authService.getWpAuth.id;
    var bearerToken = authService.getWpAuth.k;

    $scope.postSiteList = authService.wpAuthArray;

    $scope.selectedSiteChanged = function () {

        var siteUrl = $scope.selectedSite;
        let temparr = _.where(authService.wpAuthArray, { url: siteUrl });
        if (temparr.length > 0) {
            console.log("POST BLOG CHANGED TO ", temparr[0].url)
            bearerToken = temparr[0].k;
            wpBlogId = temparr[0].id;
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


}]);