app.service('settings', function(){
	return {
		startIndex : 1,
		maxResults : 500
	}
})


app.service('dpService', function(){

})



app.service('URLManager', function(AuthService,UtilManager, settings){
	
	var getFeedURLByID = function(blogID){
		var feedURL = "https://www.blogger.com/feeds/";
		feedURL = feedURL.concat(blogID);
		feedURL = feedURL.concat("/posts/default");
		var qsObj = {};
		qsObj["start-index"] = settings.startIndex;
		qsObj["max-results"] = settings.maxResults;
		qsObj["alt"] = "json";
		qsObj["callback"] = "JSON_CALLBACK";
		var queryString = UtilManager.objToQueryString(qsObj);
		return feedURL.concat(queryString);
	}

	var getBlogIDByURL = function(blogURL){
		var feedURL = "https://www.googleapis.com/blogger/v3/blogs/byurl";
		var qsObj = {};
		qsObj.key = AuthService.getKey();
		qsObj.url = blogURL;
		var queryString = UtilManager.objToQueryString(qsObj);
		return feedURL.concat(queryString);
	}

	var getSearchQueryURL = function(blogID, searchText){
		var feedURL = "https://www.blogger.com/feeds/";
		feedURL = feedURL.concat(blogID);
		feedURL = feedURL.concat("/posts/default");
		var qsObj = {};
		qsObj["start-index"] = 1;
		qsObj["max-results"] = 500;
		qsObj["alt"] = "json";
		qsObj["q"] = searchText;
		qsObj["callback"] = "JSON_CALLBACK";
		var queryString = UtilManager.objToQueryString(qsObj);
		return feedURL.concat(queryString);
	}

	return {
		getBlogIDByURL : getBlogIDByURL,
		getFeedURLByID : getFeedURLByID,
		getSearchQueryURL : getSearchQueryURL
	}

});


app.service('AuthService', function(){
	var key = "";
	var client_key = "";
	var getKey = function(){
		return key;
	}

	return {
		getKey : getKey
	}
});

app.service('UtilManager', function(){

	var objToQueryString = function(obj){
        var str = "?";
        for(key of Object.keys(obj)){
            str += key+ "="+ obj[key]+ "&";
        }
        return str.substring(0,str.length - 1);
    }

	return {
		objToQueryString : objToQueryString
	}
})
