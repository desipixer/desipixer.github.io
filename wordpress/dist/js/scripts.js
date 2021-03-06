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

        var deprecatedAuthKeys = [
            {
                "k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
                "id": "137728983",
                "url": "http://pixer12wp.wordpress.com"
            },
            {
                "k": "FnXT0hE(UHL^3QRr0YZjnJMQ(efcBNPp3Ibx8xcnZwCUzUYm8h3q(z71UreEyBWz",
                "id": "137785059",
                "url": "http://p12x.wordpress.com"
            },
            {
                "k": "HjaXFCYITC!!770sJyFH5W6cXM8A0$zfV&018k57@SsGsQCUXNWL@rnoB#uxUo$V",
                "id": "137858077",
                "url": "http://p12y.wordpress.com"
            },
            {
                "k": "yTZEmEEGLxA6Rw$3vbZ)sI5zr1SmRLV2#*KIafBLuDbdGY!4yeQcGt0$rFPUdS!G",
                "id": "137858138",
                "url": "http://p12zblog.wordpress.com"
            },
            {
                "k": "!wkjCPw0w$Jawnf^XnXaYNWd&)cO^iA9mmIV&YZN2ctUUGvXLU)SaCQW47QEkw4@",
                "id": "137895800",
                "url": "http://p12go.wordpress.com"
            },
            {
                "k": "9N^dD319d1VdBn1GUE3!wDWeyMr8HwoDLdIz^qs8SFH31uyn3dqsFZceosnGuZ)T",
                "id": "137895882",
                "url": "http://p12in.wordpress.com"
            },
            {
                "k": "VkXQ%I2h2RxDkIcva5zE@tO@khPwW7pg%rza9(KPza8DhbX@%s^sPBG#bbh6hF)R",
                "id": "137947561",
                "url": "http://p12o.wordpress.com"
            },
            {
                "k": "KQsy8ZwOzcAUSP8(^!#cTC7vk&rttRbGRl6kL0Oh1H0!WJWTT42(MbFQOJ!^7sYo",
                "id": "137947612",
                "url": "http://p12q.wordpress.com"
            },
            {
                "k": "g4%cJAyHuaq@b^Nq6nA#d40C53Hl@TT^*56BG2O1TE3cUY&jM#l05SGQeLse6uP)",
                "id": "137947675",
                "url": "http://p12dp.wordpress.com"
            },
            {
                "k": "ypL&QSH55A62uZZ6@7nKW*wu749u%mLtGuPzkh0OQ*AHhPz5wWa002AY8Rwx%DqR",
                "id": "138037193",
                "url": "http://p12bo.wordpress.com"
            },
            {
                "k": "*0DS4X*ClJRBixEB!u6DK1P$SzcLqgVmUiUWg9dw0R8isA(oZyZyMo0a4zeVuO!r",
                "id": "138037214",
                "url": "http://p12to.wordpress.com"
            },
            {
                "k": "npokL2klx5DicZyV(Du!kbiWv4^ThbCHt*sC19BQzZPSARRpXx9I1r7)S9DpFRiI",
                "id": "138037237",
                "url": "http://p12ko.wordpress.com"
            },
            {
                "k": "QJnMng^wq*efCjT^Fii$nueZ63a0rerX6cdOCdX(GS5u^D(I5o1XMh%OwfO&HP^7",
                "id": "138056996",
                "url": "http://p12kw.wordpress.com"
            },
            {
                "k": "LUmz^F8FQ5t$)QakmeatMsjQmSS@&Lbak^CdpDtrgt027@GISvb00lka%ra%L$)T",
                "id": "138179701",
                "url": "http://p99x.wordpress.com"
            },
            {
                "k": "HUVLCuoAfl6EOoroyB3Vp$d7lml3*lO(dC*o*gpHuJ4eLYbq$WfxFEdk797PwIdq",
                "id": "138179732",
                "url": "http://p99y.wordpress.com"
            },
            {
                "k": "o0gahP1RMB#@aN^1RZYus$e@YBLg#z8RLi33)hBAdZ7C54HfEKBZSYkry6GyV7Fw",
                "id": "138179750",
                "url": "http://p99z.wordpress.com"
            },
            {
                "k": "8e635omQ5%#vn8yKpql#X!V(ge3pJDIT(IfTkJj@Z)@PXYq2ZY*qMvykMvdmPQHe",
                "id": "138217262",
                "url": "http://p99a.wordpress.com"
            },
            {
                "k": "NDZQWcrySkvMjeUfY@o^0$1eP7L#OT)cSl^MqX6JcyePg539XZ!r0xilay2iE8fD",
                "id": "138217282",
                "url": "http://p99c.wordpress.com"
            },
            {
                "k": "&CSG6B0fvP9t8RX0OzBAW$zG3VxH#74k!vxx%y@5u^4o3eL8Zsz$fmM8kjJIGKuM",
                "id": "138217317",
                "url": "http://p99d.wordpress.com"
            },
            {
                "k": "lo2U^V#ZuZJxsU#9p#v)g7gYthyK)p5Iws%V93t%*cC2pjR$4Y7D#qw#04K#4L3t",
                "id": "138275468",
                "url": "http://p99ko.wordpress.com"
            },
            {
                "k": "CNIzVII6L)LgZP88dWVs6b0qYJ4jYp^!pF5vk$$4t#aYm7YF2u1P9oD%fU4$OM()",
                "id": "138275488",
                "url": "http://p99bo.wordpress.com"
            },
            {
                "k": "egkg)2HqaTmJ!Hib&@mLFpJ69JpJ&QYLStNm$I(AsWM(RDR$5(97ndIW&&4arxEB",
                "id": "138275508",
                "url": "http://p99to.wordpress.com"
            }
        ];

        
        var getWpAuth = {
            "k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
            "id": "137728983",
            "url": "http://pixer12wp.wordpress.com"
        }

        //Supporting multiple sites.
        var wpAuthArray = [
            {
                "k": "EH@zj#c)$p#jDs#xw6*(khS$EbBBr#wSt8gO%g0yq$kriNmr1ywj8TlaKuuAK2sb",
                "id": "138559080",
                "url": "http://p88a.wordpress.com"
            },
            {
                "k": "CQ)OnjcKwssl$0&HZj5R0sQ5e4Cglow1EOTkv*7ef3OCMG6Ni1)KMc&n(T2wNTvG",
                "id": "138559299",
                "url": "http://p88b.wordpress.com"
            },
            {
                "k": "X)fT*Ty^$Zbi2^B4yieXnqftH*sYMKU4w1rRE^UaaKX8H(!*D4A!3eGA2^x9U%D&",
                "id": "138559269",
                "url": "http://p88wm1.wordpress.com"
            },
            {
                "k": "0M9A6bopxSBPXqa5pbaJFF8sCHq3M5F&XKRrywu(mn2g*jhAlPKa7tW$vvZ0UhpV",
                "id": "138559604",
                "url": "http://p88c.wordpress.com"
            },
            {
                "k": "dJZ0BN@NC8HuMyw5d!)Fkt8w2mVvJ0Kz6Qk76**OsGSB#)1$vEhAX4@z(EHeCsK0",
                "id": "138559621",
                "url": "http://p88d.wordpress.com"
            }
        ];

        return {
            getWpAuth : getWpAuth,
            wpAuthArray : wpAuthArray
        }
    })();
    
    return {
        getKey: AuthUtil.getKey,
        getWpAuth : WpAuth.getWpAuth,
        wpAuthArray : WpAuth.wpAuthArray
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
        fetch('./files/actress.json').then(function(response){
            return response.json()
        }).then(function(data){
            actressList = data;
        });
    } catch(ex){
        console.log("ERROR ", ex);
    }

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
        this.cleanTitle = removeStopWords(title);
    }

    WpPost.prototype.getImagesHtml = function(){
        if(this.images){
            var str = "<div id='postContainer'>";
            var title = this.title;
            if(this.images.length > 0){
                this.images.forEach(function(val, index){
                    str += `<div class='picContainer'> <img src='${val}' alt='${title}' title='${title}' /></div>`
                });
                if(isDescriptionEnabled == true){
                    str += `<div id='description'> ${title} - desipixer </div> <div id='descriptionText'> ${postDescription} </div>`;
                }
                if(isHiddenContentEnabled == true){
                    var hContent = JSON.stringify(this.images.map(function(v){
                        try {
                            var x = new URL(v);
                            return x.href.replace(x.protocol, "")
                        } catch(ex){
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
        
        function getCategories(){
            return actressList;
        }

        function getMatchingCategories(title){
            var cat = _.filter(actressList, function(val){
                if(title.indexOf(val) != -1){
                    return val;
                }
            });
            return cat;
        }

        var getMatchingCategories = function(title, data){
            data = data || actressList;
            var cat = _.filter(data, function(val){

                if(title.toLowerCase().indexOf(val.toLowerCase()) != -1){
                    return val;
                }
            });
            if(cat){
                if(cat.length > 0){
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

        function titleSort(arr){
            return arr.sort(compareTitle)
        }

        function hidePage(){
            var title = document.title;
            var dummyPageTitle = "Worksheet 02";
            var dummyPageContent = "";
            document.title = dummyPageTitle;
            $('#hidePage').toggleClass('fadeMe');
        }

    return {
        getBlogJSON: getBlogJSON,
        downloadFileAsJson: downloadFileAsJson,
        callBlogIdFromUrl : callBlogIdFromUrl,
        getCategories : getCategories,
        imageCount : this.imageCount,
        getMatchingCategories : getMatchingCategories,
        postContent : myPostContent,
        titleSort : titleSort,
        hidePage : hidePage
    }

}]);
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