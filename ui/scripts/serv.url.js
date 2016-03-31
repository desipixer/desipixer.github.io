/* handles all url parsing and handling */

app.service('dp.service.url', [ 'dp.service.auth', 'settings',  function(authService, settings) {
	
	var getBlogNameById = function(id){
		if(id == undefined)
			return null;
		var qs = {
			fetchImages : true,
			key : authService.getAPIKey()
		}
		return "https://www.googleapis.com/blogger/v3/blogs/".concat(id).concat("/posts").concat(qsToString(qs));
	}

	var getBlogFeedUrl = function(id, startIndex, maxResults, searchText){
		if(id == undefined)
			return null;
		id = (id == null ) ? settings.default.id  : id;
		startIndex = (startIndex == null ) ? settings.default.startIndex  : startIndex;
		maxResults = (maxResults == null ) ? settings.default.maxResults  : maxResults;
		
		var qs = {
			"start-index" : startIndex,
			"max-results" : maxResults,
			"alt" : "json",
			"q" : searchText,
			"callback" : "JSON_CALLBACK"
		}
		if(searchText == null)
			delete qs.q;
		return "https://www.blogger.com/feeds/".concat(id).concat("/posts/default").concat(qsToString(qs));
	}

	var getPostUrl = function(blogId){
		return "https://www.googleapis.com/blogger/v3/blogs/".concat(blogId).concat("/posts");
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
		getBlogFeedUrl : getBlogFeedUrl,
		getPostUrl : getPostUrl
	}
}])