app.service('dp.service.post' , ['dp.service.auth', 'dp.service.url', 'dp.service.http','$q', 'settings', function(auth, urlService, httpService, $q, settings){
	
	var accessToken = null;

	var generatePostHTML = function(imgArray, title){
		var htmlStr = "";
		if(imgArray.length > 0){
			var imgTitle = title;
			htmlStr = "<div>";
			imgArray.forEach(function(value,index){
				htmlStr = htmlStr.concat("<img src='").concat(value).concat("' title='").concat(imgTitle).concat("' />");
			});
			htmlStr += "</div>";
		}
		return htmlStr;
	}

	var getPostObj = function(htmlStr, title, accessToken){
		var blogId = settings.default.id;
		var url = urlService.getPostUrl(blogId);
		var ajaxData = {
			"content" : htmlStr,
			"title" : title
		};

		var data = "";

		var config = {
			headers : {
				'Authorization' : auth.blogger.getAuthToken(accessToken)
			}
		}

		return httpService.publishPost(url, ajaxData, config);
	}



	var createPostRequest = function(postObj, accessToken){
		var title = postObj.title.$t;
		var imgArray = postObj.imgArray;
		var htmlStr = generatePostHTML(imgArray,title);
		return getPostObj(htmlStr,title, accessToken);
	}

	var login = function(){
		return auth.blogger.getToken();
	}

	var loggedIn = function(){
		return auth.blogger.accessToken;
	}

	return {
		generatePostHTML : generatePostHTML,
		getPostObj : getPostObj,
		createPostRequest : createPostRequest,
		login : login,
		loggedIn : loggedIn,
		accessToken : accessToken
	}
}]);