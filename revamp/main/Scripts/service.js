/* returns array of post keys 
	@input: null
	@output: Array
*/
var getPostKeys = function(){
	return ["id","published","updated","content","title"];
}

/* Validates if Post contains valid keys 
	@input: POST object
	@output: boolean value
*/
var isValidPost = function(obj){
	if(typeof obj == "Object"){
		var keys = getPostKeys();
		Object.keys(obj).forEach(function(value){
			if(!keys.contains(value)){
				return false;
			}
		});
		return true;
	}
	return false;
}

/* Gets all images from HTML Content
	@input: string of html tags
	@ouput : Array of images
 */
var getImgFromHTML = function(htmlContent){
	return [];
}

/* Post Object */
var Post = function(obj){
	this.id = obj.id.$t;
	this.published = obj.published.$t;
	this.updated = obj.updated.$t;
	this.title = obj.title.$t;
	this.content = obj.content.$t;
	this.imgArray = [];
}

Post.prototype.getImages = function(){
	if(!this.content){
		this.imgArray = getImgFromHTML(this.content);
		return this.imgArray;
	}
}

Post.prototype.getThumbnail = function(){
	return this.imgArray[0].replace(/s1600/g,/s320/);
}





app.service('postService', function(){
	// this is some sample service
	var  generatePost = function(obj){
		if(isValidPost(obj)){
			return (new Post(obj));
		}
		return {};
	}

	return {
		generatePost : generatePost
	}
});


app.service('UtilManager', function(){

	
	/* Lazy Loading Array
		@arr : Array
		@startIndex : integer
		@endIndex : integer
		@output : Array
	 */
	var getArrayByIndex = function(arr,startIndex,endIndex){
		/* check for edge cases
			startIndex must be atleast 0
			endIndex must not be more than arr length
		 */
		if(!arr)
			return [];
		if(!(arr instanceof Array)){
			return [];
		}
		startIndex = (startIndex < 0) ? 0 : startIndex;
		endIndex = (endIndex > arr.length) ? arr.length : endIndex;

		return arr.slice(startIndex,endIndex);
	}

	var objToQueryString = function(obj){
        var str = "?";
        for(key of Object.keys(obj)){
            str += key+ "="+ obj[key]+ "&";
        }
        return str.substring(0,str.length - 1);
    }


	return {
		getArrayByIndex : getArrayByIndex,
		objToQueryString : objToQueryString
	}
});

/*
	returns URL for corresponding call 
*/
app.service('URLService', function(AuthService,UtilManager){
	
	var getFeedURLByID = function(blogID){
		var feedURL = "https://www.blogger.com/feeds/";
		feedURL = feedURL.concat(blogID);
		feedURL = feedURL.concat("/default");
		var qsObj = {};
		qsObj["start-index"] = 1;
		qsObj["max-results"] = 500;
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
		feedURL = feedURL.concat("/default");
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
	/* contains all authentication related information */
	var AuthKey = "";

	var getKey = function(){
		return AuthKey;
	}

	return {
		getKey : getKey
	}

})

