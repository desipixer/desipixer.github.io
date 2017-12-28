app.controller('dpWpCtrl', ['$scope', 'service.sites', 'service.util', 'settings', '$http', '$interval', 'service.post', 'service.url', 'service.auth', '$q',
	function ($scope, siteServ, utilServ, settings, $http, $interval, postService, urlService, authService, $q) {
		$scope.title = "Wordpress Page";
		$scope.sites = siteServ.sites;
		$scope.startIndex = settings.startIndex;
		$scope.totalItems = 0;
		$scope.allEntries = [];
		var wpSettings = {
			errCount: 50
		}
		var wordpressKeys = authService.wpKeys();
		$scope.postSiteList = wordpressKeys;
		console.log(wordpressKeys);
		var targetBlog = wordpressKeys[wordpressKeys.length - 1];
		var wpBlogId = targetBlog.id;
		var bearerToken = targetBlog.k;


		$scope.selectedSiteChanged = function(){
			
			var siteUrl = $scope.selectedSite;
			let temparr = _.where(wordpressKeys, { url : siteUrl});
			if(temparr.length > 0){
				console.log("POST BLOG CHANGED TO ", temparr[0].url)
				bearerToken = temparr[0].k;
				wpBlogId = temparr[0].id;
			}
		}


		/********************
		* refer $scope.postContent() function 
		******************** */

		/**
		 * Post content inside textarea to Wordpress.
		 * Single post creation.
		 */


		/**
		 * Function for file upload
		 * @param {*} event 
		 */
		function onChange(event){
			var reader = new FileReader();
			reader.onload = onReaderLoad;
			if(event.target.files.length < 0){
				console.log("ERROR >> file not selected");
				$('#errContainer').text("ERROR >> file not selected").css('color','red');
			}
			reader.readAsText(event.target.files[0]);
		}

		function onReaderLoad(event){
			try {
				var obj = JSON.parse(event.target.result);
				if(obj){
					if(typeof obj == 'object'){
						dumpImages(obj);
					}
				} else {	
					console.log("INVALID object");
				}
			} catch(e){
				console.log("ERROR >> ", e);
			}
		}

		$scope.postJson = function(){
			var el = document.getElementById('uploadFile');
			document.getElementById('uploadFile').addEventListener('change', onChange);
			var event = new CustomEvent('change', onChange);
			el.dispatchEvent(event);
		}

		var settings = {
			count: 0,
			start: 0,
			end: 0,
			errCount: 0,
			imageCount : 20
		};


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

		$scope.postContent = function(){
			//get file from data folder.
			$http({
				method : 'GET',
				url : $scope.fileName
			})
			.success(function(data){
				console.log("TOTAL COUNT", data.length);
				dumpImages(data);
			})
			.error(function(err){
				console.log("ERROR >> ", err);
			})
		}

		function dumpImages(arr){
			if(arr){
				var count = settings.count || 0;
				var start = settings.start || 0;
				var end = settings.end || 0;
				var errCount = settings.errCount || 0;
				var imageCount = settings.imageCount || 10;
				end = arr.length;
				postDumpImages(arr, start, end, count, errCount, imageCount);
			} else {
				console.log("ERROR >> Invalid array");
			}
		}

		function postDumpImages(arr, start, end, count, errCount, imageCount){
			console.log("start:end:count:errCount", start, end, count, errCount);
			$scope.responseObj = JSON.stringify({
				"start" : start,
				"end" : end,
				"count" : count,
				"errCount" : errCount
			});
			if (start > end) {
				return;
			}
			var tempArr = [];
			try {
				tempArr = arr.slice(start, start + imageCount)
			}
			catch(e){
				console.log("ERROR >> array exception : ", e)
			}
			var title = getCleanTitleName(arr[start]) + " dump "+ count;
			var content = generateDumpHtml(tempArr);

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
				console.log("data : ", data);
				console.log("COUNT : " + ++count);
				$scope.wpPostResponse = data;
				

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

		function randomIntFromInterval(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
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
		 * Generates random color from the list whenever the page is refreshed.
		 * TODO: Add more colors to the list.
		 */
		$scope.ran_col = function () { //function name
			var color = '#'; // hexadecimal starting symbol
			var letters = ['000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0']; //Set your colors here
			color += letters[Math.floor(Math.random() * letters.length)];
			document.getElementById('page-title').style.background = color; // Setting the random color on your div element.
		}

	}]);

