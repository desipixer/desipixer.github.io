$scope.postMediaUrl = function () {
    postMedia();
}

function postMedia() {
    var settings = {
        postUrl: "https://public-api.wordpress.com/rest/v1.1/sites/131347544/media/new?http_envelope=1",
        token: bearerToken
    }


    $http({
        method: 'POST',
        url: settings.postUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Bearer " + settings.token
        },
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: {
            "media_urls[]": "http://www.idlebrain.com/movie/photogallery/avanthika-recent2/images/avanthika6.jpg"
        }
    }).success(function (data) {
        console.log(data)
    }).error(function (err) {
        console.log(err);
    });


}

function postMediaBulk(arr, start, end, count, errCount) {
    console.log("start:end:count:errCount", start, end, count, errCount);
    if (start > end) {
        return;
    }
    if (arr[start]) {
        var urlArray = arr[start].split("/");
        var title = "";
        if (urlArray.length > 0) {
            title = urlArray[urlArray.length - 1];
        }
        if (title.indexOf('.jpg') != -1) {
            title = title.replace(/-/g, " ").replace(".jpg", "");
        }
        console.log("title : ", title);
        var content = "<div><img src='" + arr[start] + "' title='" + title + "' alt='" + title + "' /></div>";

        console.log("content : ", content);
        /** POST FUNCTION EXECUTES HERE */


        var settings = {
            postUrl: "https://public-api.wordpress.com/rest/v1.1/sites/131347544/media/new?http_envelope=1",
            token: bearerToken
        }


        $http({
            method: 'POST',
            url: settings.postUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": "Bearer " + settings.token
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                "media_urls[]": "http://www.idlebrain.com/movie/photogallery/avanthika-recent2/images/avanthika6.jpg"
            }
        }).success(function (data) {
            console.log(data)
        }).error(function (err) {
            console.log(err);
        });

    }
}




/**
 * Sample function to post
 */
function samplePost() {


    $http({
        method: 'POST',
        url: settings.postUrl,
        data: {
            title: title,
            content: content
        },
        headers: {
            "Authorization": "Bearer " + settings.token
        }
    }).success(function (data) {
        console.log(data);
    }).error(function (err) {
        console.log(err);
    });
}



/**
 * Read array from file and pass the values to Post function
 */
function getValuesFromFile(fileName, callbackFn) {
    fileName = fileName || 'images.json';
    $http.get(fileName).success(function (dataObj) {
        if (dataObj instanceof Array) {
            if (dataObj.length > 0) {
                console.log("FILE RETRIVED : ", dataObj.length);
                callbackFn(dataObj);
            }
        }
    }).error(function (err) {
        console.log("ERROR >> ", err);
    });
}


/**
 * Post array values to WP site.
 */
function postUrlArrayToWp(arr) {
    arr = arr || [];
    if (arr.length > 0) {
        var wpImgUrl = arr[0];
        $http({
            url: settings.postImgUrl,
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + bearerToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                "media_urls[]": wpImgUrl
            },

        })


    } else {
        console.log("ERROR >> array is empty");
    }
}

function getSettings() {
    // get settings from global.settings
    var settings = settings || {};
    settings.url = "";
    return settings;
}

window.onunload = function () {
    alert('You are trying to leave.');
    return false;
}




/**
 * Builds custom XHR Requests to reduce latency between AJAX POST requests
 */
function customXHR(url) {
    var xhr = new XMLHttpRequest();
    xhr.setRequestHeader('Authorization', header)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.open('POST', url)
    xhr.onreadystatechange = function () {
        if (xhr.status == 200) {
            successFn()
        } else {
            errorFn()
        }
    };
    xhr.send(url)
}

$scope.getWPAuth = function () {
    var authUrl = "https://public-api.wordpress.com/oauth2/authorize?client_id=51005&redirect_uri=https://desipixer.github.io/dp-grunt/dist&response_type=token";
    var postUrl = "https://public-api.wordpress.com/rest/v1/sites/" + wpBlogId + "/posts/new";

    $http({
        method: 'POST',
        url: postUrl,
        data: {
            title: "Hi-Title-New"
        },
        headers: {
            "Authorization": "Bearer mja3FL5dcUVKeVF5!$u3IvE6SPZYuVfef)g9cr2Tm0is2F7FMvlCCs(PfWdI0&eP"
        }
    }).success(function (data) {
        console.log(data);
    }).error(function (err) {
        console.log(err);
    })

}

/**
 * Converts a string to hacker text
 */
function convertStringToHackerText(str) {
    if (str) {
        var charArr = str.split('');
        var hackerTextObj = getHackerTextObject();
        for(var i=0; i< charArr.length; i++){
            //map the characters to hacker text object
        }
    } else {
        return null;
    }
}

function getHackerTextObject(){
    return {
        "a" : ["@", "A"],
        "b" : []
    }
}