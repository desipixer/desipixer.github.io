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
				return (new Date().getTime())+"-untitled-";
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
        getBlogFeedJSON: getBlogFeedJSON,
        getCleanTitleName : getCleanTitleName,
        cleanFileName : cleanFileName
    }

}]);