/* handles all url parsing and handling */

app.service('dp.service.url', [ 'dp.service.auth', function(authService) {
	
	var getBlogNameById = function(id){
		if(id == undefined)
			return null;
		var qs = {
			fetchImages : true,
			key : authService.getAPIKey()
		}
		return "https://www.googleapis.com/blogger/v3/blogs/".concat(id).concat("/posts").concat(qsToString(qs));
	}

	var getFeedUrlFromBlogId = function(id, startIndex, maxResults){
		if(id == undefined){
			return null;
		}
		var qs = {
			"start-index" : startIndex,
			"max-results" : maxResults,
			"alt" : "json",
			"callback" : "JSON_CALLBACK"
		}
		return "https://www.blogger.com/feeds/".concat(id).concat("/posts/default").concat(qsToString(qs));
	}

	var qsToString = function(obj){
		var str = "?";
        for(key of Object.keys(obj)){
            str += key+ "="+ obj[key]+ "&";
        }
        return str.substring(0,str.length - 1);
	}

	return {
		getBlogNameById : getBlogNameById,
		getFeedUrlFromBlogId : getFeedUrlFromBlogId
	}
}])