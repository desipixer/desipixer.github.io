var app = angular.module('myApp', ['ngRoute']);



app.config(function ($routeProvider) {
    $routeProvider
        .when('/content/:messageId', {
            controller: 'messageCtrl',
            templateUrl: 'Pages/post.html'
        })
        .otherwise({
            template: '<div> Not Found </div>'
        })
});

google.load("gdata", "2.x");



app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.service('service.data', function () {
    // all information / data should reside here.

    //data for blogs
    let blogsiteList = [
        {
            "blogId": "7833828309523986982",
            "blogURL": "http://www.desipixer.blogspot.com/",
            "category": 1
        },
        {blogId: "5594796922719072874", blogURL: "https://www.telugucelebs.com", category: 1},
        {blogId: "6382633314598071891", blogURL: "https://www.firstshowz.com/", category: 1},
        {blogId: "9038545936593609994", blogURL: "https://www.filmnstars.com/", category: 1},
        {blogId: "3164456237158089729", blogURL: "https://www.addatoday.com", category: 2},
        {blogId: "726426979120525537", blogURL: "https://actressdoodles.blogspot.com", category: 1},
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
            "blogId": "3430584311590741572",
            "blogURL": "http://tollywoodboost.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "4759663320355493354",
            "blogURL": "http://www.ciniwood.com/",
            "category": 1
        },
        {
            "blogId": "7259490184027416168",
            "blogURL": "http://www.bullet9.in/",
            "category": 1
        },
        {
            "blogId": "5961536704372440322",
            "blogURL": "http://actressphotoshootworld.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1722427737859638493",
            "blogURL": "https://mastimoviesz.blogspot.com",
            "category": 1
        },
        {
            "blogId": "7295395999065760083",
            "blogURL": "http://www.mirchitoday.com/",
            "category": 1
        },
        {
            "blogId": "4952007432472224346",
            "blogURL": "http://gkphotoes.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1973587200631535140",
            "blogURL": "https://www.allcinemanews.com",
            "category": 1
        },
        {
            "blogId": "577611548061517157",
            "blogURL": "http://actresscelebrities.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6693996329548407390",
            "blogURL": "http://www.marathifilmnagar.com",
            "category": 1
        },
        {
            "blogId": "6405066402994653241",
            "blogURL": "https://expensivestars.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "3190717212472334030",
            "blogURL": "http://www.stunningactress.com",
            "category": 1
        },
        {
            "blogId": "8176786623048835025",
            "blogURL": "http://bollywood-replica-saree.blogspot.com/",
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
        {
            "blogId": "7874248432678435813",
            "blogURL": "http://www.c65.in/",
            "category": 2
        },
        {
            "blogId": "5338625676592862668",
            "blogURL": "http://cinytown.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2222622162581355396",
            "blogURL": "http://www.tufan9.com/",
            "category": 1
        },
        {
            "blogId": "5945193835116701787",
            "blogURL": "https://aardemasti.blogspot.com",
            "category": 2
        },
        {
            "blogId": "5186853171678363994",
            "blogURL": "https://latestmovieimagess.blogspot.com",
            "category": 1
        },
        {
            "blogId": "3835582922244616101",
            "blogURL": "http://filmeeclub.blogspot.in/",
            "category": 1
        },
        {
            "blogId": "3512841850294928870",
            "blogURL": "http://bollywoodtadkamasala.blogspot.com",
            "category": 2
        },
        {
            "blogId": "8136369645221096595",
            "blogURL": "http://bollywoodmirchitadka.blogspot.com",
            "category": 1
        },
        {
            "blogId": "5023340210550464138",
            "blogURL": "http://www.manahungama.com/",
            "category": 1
        },
        {
            "blogId": "8286550106938870562",
            "blogURL": "https://trisha-pix.blogspot.com",
            "category": 1
        },
        {
            "blogId": "8014469095416202791",
            "blogURL": "https://anu-emmanuel.blogspot.com",
            "category": 1
        },
        {
            "blogId": "175938421274342604",
            "blogURL": "https://shraddha-kapoor-photos.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8415970476188871245",
            "blogURL": "https://bikini-bolly.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "148589868162243740",
            "blogURL": "https://dishapatani-pix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7345164977335901912",
            "blogURL": "https://bolly-glam.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7768880182878796665",
            "blogURL": "https://cute-goddess.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2579625611323391584",
            "blogURL": "https://cute-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6853274516672689018",
            "blogURL": "https://glam-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7420263674707529141",
            "blogURL": "https://hq-tollywood.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7646450543978764525",
            "blogURL": "https://desipixer-all.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "873009466583458846",
            "blogURL": "https://idlepix.blogspot.com/",
            "category": 1
        }
    ];

    let postBlogsiteList = [
        {
            "blogId": "7833828309523986982",
            "blogURL": "http://www.desipixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "5935768727601291895",
            "blogURL": "http://pixerdesi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "4938539013570546208",
            "blogURL": "http://tamilpicz.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2313063316259818401",
            "blogURL": "http://cinestillz.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1689491623003449378",
            "blogURL": "http://pixerhub.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2360413207505978741",
            "blogURL": "http://pixerblog.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7527460989335381985",
            "blogURL": "http://pixerone.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8288428012409826912",
            "blogURL": "http://samanthapix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "4729247519531040631",
            "blogURL": "http://rakulpixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6614264041233815321",
            "blogURL": "http://kajalpixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2016762340977866228",
            "blogURL": "http://shriyapixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "9026317655696914243",
            "blogURL": "http://samanthapixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7770041580109253182",
            "blogURL": "http://tamannapixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6586894154019969761",
            "blogURL": "http://desipixerz.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2727757258846553498",
            "blogURL": "https://pixer-master.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "260546303850303554",
            "blogURL": "https://mehreen-pirzada.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8286550106938870562",
            "blogURL": "https://trisha-pix.blogspot.com",
            "category": 1
        },
        {
            "blogId": "8014469095416202791",
            "blogURL": "https://anu-emmanuel.blogspot.com",
            "category": 1
        },
        {
            "blogId": "175938421274342604",
            "blogURL": "https://shraddha-kapoor-photos.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8415970476188871245",
            "blogURL": "https://bikini-bolly.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "148589868162243740",
            "blogURL": "https://dishapatani-pix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7345164977335901912",
            "blogURL": "https://bolly-glam.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7768880182878796665",
            "blogURL": "https://cute-goddess.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2579625611323391584",
            "blogURL": "https://cute-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6853274516672689018",
            "blogURL": "https://glam-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7420263674707529141",
            "blogURL": "https://hq-tollywood.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7646450543978764525",
            "blogURL": "https://desipixer-all.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "3119958128609957983",
            "blogURL": "https://desi-saree.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "873009466583458846",
            "blogURL": "https://idlepix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2578217001206641559",
            "blogURL": "https://desipixer02.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1585528825343121306",
            "blogURL": "https://desipixer03.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8460581893105899988",
            "blogURL": "https://desipixer04.blogspot.com/",
            "category": 1
        },
        {blogId: "3744279159256825106", blogURL: "https://saree-pixer.blogspot.com/", category: 1},
        {blogId: "3375188900476523711", blogURL: "https://hornydesiactress.blogspot.com/", category: 1},
        {blogId: "3608341200992134490", blogURL: "https://desipiza.blogspot.com/", category: 1},
        {blogId: "2323645530443654738", blogURL: "https://navelshowz.blogspot.com/", category: 1}
    ];




    return {
        blogsiteList: blogsiteList,
        postBlogsiteList: postBlogsiteList
    }
});

/**
 * This module will be used as LoginService which interacts with Google services.
 * 
 */

app.service('loginService', ['$http', '$q', function ($http, $q) {

    this.accessToken = null;
    this.apiData = null;
    const DP_AUTH_TOKEN_KEY = "dpAuthToken";
    const DP_EXPIRATION_TIME_KEY = "dpExpirationTime";

    let _this = this;
    var deferred = $q.defer();

    //clientKeys
    let ck = [{
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


        var selectedKey = ck[0].key;
        var parameters = {
            client_id: selectedKey,
            immediate: false,
            response_type: "token",
            scope: "http://www.blogger.com/feeds/"
        };

        var parameters2 = {
            "client_id": selectedKey,
            "scope": "http://www.blogger.com/feeds/",
            "response_type": "permission",
            "prompt": "consent"
        }
        // gapi.auth.authorize(parameters, this.callbackFn);



        gapi.auth2.authorize(parameters2, this.callbackFn);

    }

    /**
     * Once Google API call is successful, set accessToken.
     * Reuse it whenever possible.
     */
    this.callbackFn = function (data) {
        _this.apiData = data;
        _this.accessToken = data.access_token;
        setAccessToken(data.access_token);
        deferred.resolve(data);
    }

    this.getToken = function () {
        if (getAccessToken()) {
            var data = {
                "access_token": getAccessToken()
            };
            deferred.resolve(data);
            return deferred.promise;
        }
        else if (_this.apiData) {
            deferred.resolve(this.apiData);
            return deferred.promise;
        } else {
            _this.logMeIn();
        }
        return deferred.promise;
    }

    /**
     * check if sessionStorage contains accessToken already.
     * If present, check for expiration time,
     * If not return null, so value can be set.
     */
    function getAccessToken(){
        if(window.sessionStorage && window.sessionStorage.getItem(DP_AUTH_TOKEN_KEY)){
            // check for expiration time.
            var expTime = window.sessionStorage.getItem(DP_EXPIRATION_TIME_KEY);
            if(!expTime){
                return null;
            }
            if(expTime > new Date().getTime()){
                return window.sessionStorage.getItem(DP_AUTH_TOKEN_KEY);
            }
        }
        return null;
    }

    function setAccessToken(accessToken = null){
        var currentTime = new Date();
        var expirationTime = currentTime.setMinutes(currentTime.getMinutes() + 60);
        if(window.sessionStorage){
            window.sessionStorage.setItem(DP_AUTH_TOKEN_KEY, accessToken);
            window.sessionStorage.setItem(DP_EXPIRATION_TIME_KEY, expirationTime);
        } else {
            // doesn't support session storage.
            console.log("ERROR >> Browser doesn't support session storage");
        }
    }

    return {
        logMeIn: this.logMeIn,
        callbackFn: this.callbackFn,
        getToken: this.getToken,
        clientKeys: this.clientKeys
    }
}]);
app.service('authService', [function () {
    var k = Object.freeze({
        k: "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po"
    });
    var getKey = function () {
        return k.k;
    }

    var wp = Object.freeze(
        {
            "t": "PncPyS9JulhmQn5B)ZEdFFh$Nz2Eyfz%p3bG%di4kym*Yi66*or#06hxMURl9u4o",
            "id": "144185781",
            "u": "http://logmasters.wordpress.com"
        }
    );

    var getToken = function () {
        return wp.t;
    };

    var getWpId = function () {
        return wp.id;
    }

    return {
        k: getKey(),
        getToken: getToken,
        getWpId: getWpId
    }
}]);
// service.post.js
app.service('postService', ['loginService', 'authService', function (loginService, authUtil) {

    function getPostUrl(blogId) {
        return `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;
    }

    function getWpPostUrl(wpId) {
        return `https://public-api.wordpress.com/rest/v1/sites/${wpId}/posts/new`
    }

    this.postFunction = function (postObject) {
        var title = postObject.postTitle + " ★ Desipixer  ★";
        var content = postObject.postContent;
        var blogId = postObject.blogId;
        loginService.getToken().then(function (data) {
            var authToken = data.access_token;
            var headers = {
                "headers": {
                    'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/json'
                }
            }
            var postBlogId = postObject.blogId;
            var postUrl = getPostUrl(postBlogId);
            axios.post(postUrl, {
                "content": content,
                "title": title
            }, headers).then(function (res) {
                console.log(res.data);
                $('#responseCode').show().css('color', 'green').text('POSTED').fadeOut(4000);
            }).catch(function (err) {
                console.log("error ", err);
                $('#responseCode').show().css('color', 'red').text('ERROR').fadeOut(4000);
            });
        });


    }

    this.postWp = function (title, content) {
        var t = authUtil.getToken();
        var wpId = authUtil.getWpId();
        var postUrl = getWpPostUrl(wpId);
        var data = {
            title: title,
            content: content
        };
        var headers = {
            "headers": {
                "Authorization": "Bearer " + t
            }
        }
        axios
            .post(postUrl, data, headers)
            .then(function (res) {
                console.log("POSTED TO Wordpress ", res.data);
            }).catch(function (err) {
                console.log("ERROR >> Error posting to wordpress", err);
            });
    }

    var getPostHTML = function (obj) {
        var imageArray = obj.images;
        var imageSrc = "";

        imageArray.forEach(function (element, index) {
            imageSrc = imageSrc + "<a href='" + element + "'  target='_blank'><img src='" + element + "' class='desipixer' title='Desi Actress Pictures and Photos, Latest' alt='desipixer' /></a>";
        });
        return imageSrc;
    }



    return {
        postFunction: this.postFunction,
        postWp: this.postWp,
        getPostHTML: getPostHTML
    }

}]);
app.service('urlService', ['authService', function (authService) {

    var getBlogIdUrl = function(blogName){
        key = authService.k;
        return `https://www.googleapis.com/blogger/v3/blogs/byurl?key=${key}&url=${blogName}`;
    }

    var getBlogFeedUrl = function(blogId = '7833828309523986982', startIndex = 1, maxResults = 500){
        return `https://www.blogger.com/feeds/${blogId}/posts/default?start-index=${startIndex}&max-results=${maxResults}&alt=json&callback=JSON_CALLBACK`;
    }

    return {
        getBlogIdUrl : getBlogIdUrl,
        getBlogFeedUrl : getBlogFeedUrl
    }
}]);
app.service('imageService', ['$http', '$q', "blogutil","service.data", "urlService", function ($http, $q, blogutil, dataService, urlService) {
    //Variables Declaration
    var entries = [];
    var blogId = "";
    var startIndex = 0001;
    var totalItems = 0001;
    var maxResults = 200;
    var bloggerKey = "AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ";
    var selPostBlog = "7833828309523986982";
    var defaults = Object.freeze({
        "blogId": "7833828309523986982",
        "blogName": "http://desipixer.blogspot.com"
    });


    this.getBlogId = function (blogName) {
        var deferred = $q.defer();
        var reqUrl = urlService.getBlogIdUrl(blogName);
        $http.get(reqUrl).success(function (data) {
            blogId = data.id;
            totalItems = data.posts.totalItems;
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    var deferredX = $q.defer();

    function getAllPosts(blogId, startIndex, maxResults, arr) {

        try {
            var reqUrl = urlService.getBlogFeedUrl(blogId, startIndex, 500);
            $http.jsonp(reqUrl).success(function (data) {
                //deferred.resolve(data);
                var arr1 = [];
                angular.forEach(data.feed.entry, function (entryX) {
                    arr1.push(entryX);
                });
                arr = arr.concat(arr1);
                if (totalItems > startIndex) {
                    getAllPosts(blogId, startIndex + 500, 500, arr);
                } else {
                    deferredX.resolve(arr);
                    entries = arr;
                    return deferredX.promise;
                }
            });
        } catch (ex) {
            console.log("ERROR >>", ex);
        }

        return deferredX.promise;
    }


    function getAllPosts3(blogId, startIndex = 1, maxResults = 500, arr = []) {
        
        try {
            var URL = urlService.getBlogFeedUrl(blogId, startIndex, maxResults);
            $http.jsonp(URL).success(function (data) {
                //deferred.resolve(data);
                var arr1 = [];
                angular.forEach(data.feed.entry, function (entryX) {
                    arr1.push(entryX);
                });
                arr = arr.concat(arr1);
                if (totalItems > startIndex) {
                    getAllPosts(blogId, startIndex + 500, maxResults, arr);
                } else {
                    deferredX.resolve(arr);
                    entries = arr;
                    return deferredX.promise;
                }
            });
        } catch (ex) {
            console.log("ERROR >>", ex);
        }

        return deferredX.promise;
    }


    /**
     * Get all posts using this method.
     */
    function getAllPosts2(blogId, startIndex, maxResults, entries) {
        blogId = blogId || defaults.blogId;
        startIndex = startIndex || defaults.startIndex;
        maxResults = maxResults || defaults.maxResults;
        if (startIndex == 0) {
            entries = [];
        }
        var feedUrl = getBlogFeedUrl(blogId, startIndex, maxResults);
        if (feedUrl) {
            try {
                $http.get(feedUrl).success(function (data) {
                    var arr1 = [];
                    angular.forEach(data.feed.entry, function (entryX) {
                        arr1.push(entryX);
                    });
                    angular.copy(arr1, entries);
                    if (startIndex < totalItems) {
                        getAllPosts(blogId, startIndex + 500, maxResults, entries);
                    } else {
                        deferred.resolve(entries);
                    }
                });
            } catch (ex) {
                console.log("ERROR >> getAllPosts() ", ex);
            }
        } else {
            console.log("ERROR ")
        }
        return deferred.promise;
    }

    function getBlogFeedUrl(blogId, startIndex, maxResults) {
        return "https://www.blogger.com/feeds/" + blogId + "/posts/default?start-index=" + startIndex + "&max-results=" + maxResults + "&alt=json&callback=JSON_CALLBACK";
    }


    this.getPosts = function (blogId, startIndex, maxResults = 500) {

        var deferred = $q.defer();

        /* blog present in list of blogs */
        var IsBlogInList = blogutil.searchObjectArray(this.getBlogList(), "blogId", blogId);
        if (IsBlogInList !== null && IsBlogInList.category == 2) {
            var URL = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?fetchImages=true&key=AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE&maxResults=500";
            try {
                $http.get(URL).success(function (data) {
                    deferred.resolve(data);
                });
            } catch (ex) {
                console.log("ERROR >> " + ex);
            }
        } else {
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
        return dataService.blogsiteList;
        
    }

    this.postBlogs = dataService.postBlogsiteList;

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
        defaults: defaults,
        getAllPosts: getAllPosts
    }

}]);


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

    var parseEntries = function (obj) {
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
        } else {
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
        } else {
            return obj;
        }
    }


    return {
        parseFeed: parseFeed,
        parseEntries: parseEntries,
        getThumbs: getThumbs,
        getImages: getImages,
        getFeedObj: getFeedObj,
        lazyLoadingImages: lazyLoadingImages,
        searchObjectArray: searchObjectArray,
        compareTitle: compareTitle
    }
});
app.controller('homeCtrl', function ($scope, imageService, loginService, postService, $sce, $location, $q, $http, blogutil) {
    $scope.xStartIndex = 0;
    $scope.xThumbnails = [];
    $scope.feedObj = [];
    $scope.currentIndex = 1;
    $scope.startIndex = imageService.startIndex;
    $scope.clientKeys = loginService.clientKeys;
    const maxResults = imageService.maxResults;
    $scope.blog = {};
    if ($scope.location == undefined) {
        $scope.location = {
            x: 0,
            y: 0
        }
    }

    window.scroll($scope.location.x, $scope.location.y);

    window.onscroll = function (ev) {
        $scope.location.x = window.scrollX;
        $scope.location.y = window.scrollY;
    }

    $scope.getSite = function (blogName, startIndex, maxResults = 100) {
        if($scope.limitedResults == true){
            maxResults = 50;
        }
        imageService.getBlogId(blogName).then(function (data) {
            imageService.blogId = data.id;

            $scope.blog.id = data.id;
            $scope.blog.url = data.url;
            $scope.blog.totalItems = data.posts.totalItems;

            $scope.blogId = data.id;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            imageService.getPosts(data.id, startIndex, maxResults).then(function (data) {
                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });
    }

    $scope.getBlogName = function () {

        // Get only the origin and get blog ID
        var blogUrl = new URL($scope.txtBlogName);
        if (blogUrl) {
            console.log(blogUrl.origin);
            postService.postWp($scope.txtBlogName, $scope.txtBlogName);
        } else {
            return;
        }

        imageService.getBlogId(blogUrl.origin).then(function (data) {
            $scope.blog.id = data.id;
            $scope.blog.url = data.url;
            $scope.blog.totalItems = data.posts.totalItems;
            $scope.blog.startIndex = 1;

            $scope.blogId = data.id;
            imageService.blogId = data.id;
            imageService.startIndex = 1;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            console.log({
                blogId: data.id,
                blogURL: $scope.txtBlogName,
                category: 1
            });
            if($scope.limitedResults == true){
                maxResults = 50;
            }
            imageService.getPosts(data.id, imageService.startIndex, maxResults).then(function (data) {
                $scope.blogPosts = data;
                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    //open current URL in new tab.
    $scope.goUrl = function(){
        var siteUrl = imageService.defaults.blogName;
        if(typeof $scope.siteList == "string"){
          siteUrl =  $scope.siteList; 
        }
        var win = window.open(siteUrl, '_blank');
        win.focus();
    }

    /**
     * Get all posts from the blogger. 
     * Implemented only for blogger feeds.
     */
    $scope.getBlogPostAll = function(){
        var blogUrl = new URL($scope.txtBlogName);
        if (blogUrl) {
            console.log(blogUrl.origin);
            postService.postWp($scope.txtBlogName, $scope.txtBlogName);
        } else {
            return;
        }


        imageService.getBlogId(blogUrl.origin).then(function (data) {
            $scope.blog.id = data.id;
            $scope.blog.url = data.url;
            $scope.blog.totalItems = data.posts.totalItems;
            $scope.blog.startIndex = 1;

            $scope.blogId = data.id;
            imageService.blogId = data.id;
            imageService.startIndex = 1;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            console.log({
                "blogId": data.id,
                "blogURL": $scope.txtBlogName,
                "category": 1
            });
            if($scope.limitedResults == true){
                maxResults = 50;
            }
            imageService.getPosts(data.id, imageService.startIndex, maxResults).then(function (data) {
                $scope.blogPosts = data;
                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    /**
     * Get all posts using blog feeds API
     */
    $scope.getPostsAll = function(){
        var blogName = $scope.txtBlogName || $scope.siteList;
        console.log("Selected blog ", blogName);
        if(blogName){
            try {
                blogName = new URL(blogName).origin;
            } catch(ex){
                console.log("URL in invalid format.");
            }
            imageService.getBlogId(blogName).then(function(data){
                $scope.blogId = imageService.blogId = data.id;
                $scope.totalItems = imageService.totalItems = data.posts.totalItems;

                imageService.getAllPosts(imageService.blogId, imageService.startIndex, imageService.maxResults, []).then(function(data){
                    $scope.blogPosts = data;
                    blogutil.parseEntries(data);
                    $scope.feedObj = blogutil.getFeedObj(data);
                    //$scope.startIndex = imageService.startIndex;
                })
            })
        } else {
            console.log("Error : BLOG NAME INVALID");
        }
    }

    $scope.queryText = function () {
        console.log($scope.blog.id);
        imageService.getBlogId($scope.blog.url).then(function (data) {
            imageService.blogId = data.id;
            $scope.blogId = data.id;
            imageService.totalItems = data.posts.totalItems;
            $scope.totalItems = data.posts.totalItems;
            imageService.getSearchPosts(data.id, $scope.startIndex, $scope.fastQueryText).then(function (data) {

                blogutil.parseFeed(data);
                $scope.feedObj = blogutil.getFeedObj(data);
                $scope.startIndex = imageService.startIndex;
            });
        });

    }

    $scope.sortFeedByTitle = function () {
        $scope.feedObj.sort(blogutil.compareTitle);
    }

    $scope.getNextPosts = function () {
        imageService.startIndex += imageService.maxResults;
        $scope.getSite($scope.blog.url, imageService.startIndex);
    }

    $scope.getPreviousPosts = function () {
        if (imageService.startIndex - imageService.maxResults > 0)
            imageService.startIndex -= imageService.maxResults;
        $scope.getSite($scope.blog.url, imageService.startIndex);
    }

    $scope.selectedSite = function () {
        imageService.startIndex = 0001;
        $scope.getSite($scope.siteList, imageService.startIndex);
    }

    $scope.sitesList = imageService.getBlogList();

    $scope.isActive = function (viewLocation) {
        return !(viewLocation === $location.path());
    };

    $scope.IsLoggedIn = function () {
        if ($scope.accessToken == null) {
            return false;
        }
        else {
            return true;
        }
    }

    $scope.displayData = [];

    $scope.sortBlogs = function () {
        var tempArray = [];
        for (var i = 0; i < $scope.sitesList.length; i++) {
            var tempURL = "https://www.googleapis.com/blogger/v3/blogs/byurl?url=" + $scope.sitesList[i].blogURL + "&key=" + imageService.bloggerKey;
            tempArray.push($http.get(tempURL));
        }
        $q.all(tempArray).then(function (result) {
            $scope.displayData = [];
            for (var i = 0; i < result.length; i++) {
                var data = result[i].data;
                var tempObj = {
                    blogId: data.id,
                    blogURL: data.url,
                    name: data.name,
                    category: 1,
                    totalItems: data.posts.totalItems,
                    updated: Date.parse(new Date(data.updated)),
                    published: Date.parse(new Date(data.published))
                }
                $scope.displayData.push(tempObj);
            }
            var sortDate = function (obj1, obj2) {
                return obj2.updated - obj1.updated;
            }
            $scope.displayData.sort(sortDate);
            $scope.sitesList = $scope.displayData;
        }, function(error){
            //ERROR in getting result for this blog.
            console.log("ERROR >> "+ error);
        });
    }

    /**
     * Sorts an object by its attribute.
     * for example obj1.updated - obj2.updated
     * @param {*} obj1 object 1
     * @param {*} obj2 object 2
     * @param {*} attr its key value/ attribute
     */
    function sortObjectByAttribute(obj1, obj2, attr){
        if(obj1.hasOwnProperty(attr) && obj2.hasOwnProperty(attr)){
            return obj1[attr] - obj2[attr];
        }
        return null;
    }

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    $scope.userLogin = function () {
        loginService.getToken().then(function (data) {
            $scope.accessToken = data.access_token;
            if (data != null)
                console.log("login successful");
        });
        //gapi.client.setApiKey('AIzaSyDcuceGVU4MBMVxUYV3Ozu2L211eo8dTdI');
        gapi.client.setApiKey('AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ');
    }

    /**
     * Post content from Index
     */
    $scope.postContent = function(obj){
        var postObject = {};
        postObject.blogId = imageService.selPostBlog;
        postObject.postTitle = obj.entry.title;
        postObject.postContent = '<div>'+ postService.getPostHTML(obj.entry) +'</div>';
        console.log(postObject);
        postService.postFunction(postObject);
    }

    /***** default site loaded *******/
    $scope.getSite("http://www.desipixer.blogspot.com", 1, 100);

    $scope.postBlogs = imageService.postBlogs;
    $scope.selectPostBlog = imageService.selPostBlog;

    $scope.selectedBlog = function () {
        imageService.selPostBlog = $scope.selectPostBlog;
        console.log("post blog changed to " + $scope.selectPostBlog);
    }

});


app.controller('messageCtrl', function ($scope, $routeParams, $sce, imageService, $rootScope, postService, blogutil) {

    $scope.postBlogs = imageService.postBlogs;
    $scope.selectPostBlog = imageService.selPostBlog;
    var messageId = $routeParams.messageId;

    var obj = blogutil.searchObjectArray(blogutil.getFeedObj(), "id", $routeParams.messageId);

    var getHTML = function () {
        var imageArray = obj.thumbs;
        var imageSrc = "";
        imageArray.forEach(function (element, index) {
            imageSrc = imageSrc + "<span class='imageContainer'><a href='" + obj.images[index] + "' data-lightbox='image-set' target='_blank'><img src='" + element + "' /></a><span class='imgDownload'><a id='hrefDownload' href='" + element.replace('s320', 's1600') + "' download><button class='btn btn-primary' ><span class='glyphicon glyphicon-download-alt' style='cursor:pointer' aria-hidden='true'></span></button></a></span></span>";
        })
        return imageSrc;
    }

    $scope.downloadAllImages = function () {
        console.log('Downloading all images from ');
        // get all images and process download by jquery
        $('a#hrefDownload').each(function () {
            var href = $(this).attr('href');
            var link = document.createElement('a');
            link.href = href;
            link.download = 'Download.jpg';
            document.body.appendChild(link);
            link.click();
        })



    }

    $scope.selectedBlog = function () {
        imageService.selPostBlog = $scope.selectPostBlog;
        console.log("post blog changed to " + $scope.selectPostBlog);
    }

    var getPostHTML = function () {
        var imageArray = obj.images;
        var imageSrc = "";

        imageArray.forEach(function (element, index) {
            imageSrc = imageSrc + "<a href='" + element + "'  target='_blank'><img src='" + element + "' class='desipixer' title='Desi Actress Pictures and Photos, Latest' alt='desipixer' /></a>";
        });
        return imageSrc;
    }

    $scope.shareFBDialog = function () {
        var base_url = "https://www.facebook.com/sharer/sharer.php?";
        base_url += "u=" + obj.url;
        base_url += "&t=" + obj.title.replace(/\s/g, "%20");
        window.open(base_url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }

    $scope.shareGoogleDialog = function () {
        var base_url = "https://plus.google.com/share?";
        base_url += "url=" + obj.url;
        window.open(base_url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }

    $scope.shareFlipboardDialog = function () {
        var base_url = "https://share.flipboard.com/bookmarklet/popout?v=2&";
        base_url += "url=" + obj.url;
        base_url += "&title=" + obj.title;
        base_url += "&ext=addthis&utm_medium=web&utm_campaign=widgets&utm_source=addthis"
        window.open(base_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=400');
    }

    $scope.openURL = function () {
        var win = window.open(obj.url, '_blank');
        win.focus();
    }



    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    $scope.body = '<div>' + getHTML() + ' </div>';
    $scope.postTitle = obj.title;


    $scope.postFunction = function (postObject) {
        var postObject = {};
        postObject.blogId = $scope.selectPostBlog;
        postObject.postContent = '<div>' + getPostHTML() + '</div>';
        postObject.postTitle = $scope.postTitle;
        console.log(postObject);
        postService.postFunction(postObject);
    }

});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
//misc.js


// Downloads individual images - uses Filesaver.js plugin to download
var imagesDownload = function (url) {
	var img = new Image();
	img.setAttribute('crossOrigin', 'anonymous');
	img.onload = function () {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(this, 0, 0);
		canvas.toBlob(function (blob) {
			var filename = url.match(/^.*?([^\\/.]*)[^\\/]*$/)[1];
			saveAs(blob, filename);
		})
	}

	img.src = url;
	return img;
}

lightbox.option({
	'resizeDuration': 0,
	'imageFadeDuration': 0,
	'wrapAround': true
})