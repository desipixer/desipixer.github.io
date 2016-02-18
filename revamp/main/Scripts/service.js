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
	var containsAllKeys = true;
	if(typeof obj == "object"){
		var keys = getPostKeys();
		keys.forEach(function(value){
			if(!obj.hasOwnProperty(value)){
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
	var imgArr = [];
	var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
	if(imgTags != undefined && imgTags.length > 0 ){
		for(var i=0 ; i < imgTags.length ; i++){
			var imgURL = imgTags[i].match(/(https?:\/\/.*\.(?:png|jpg))/ig);
			if(imgURL != undefined && imgURL.length > 0){
				var picURL = imgURL[0];
				if(picURL.indexOf('blogspot.com')){
				    var splitter = picURL.split("/")[7];
				    picURL = picURL.replace(splitter,"s1600");
				    imgArr.push(picURL);
				}
			}
		}
	}
	return imgArr;
}

/* Post Object */
var Post = function(obj){
	this.id = obj.id.$t;
	this.published = obj.published.$t;
	this.updated = obj.updated.$t;
	this.title = obj.title.$t;
	this.content = obj.content.$t;
	this.imgArray = getImgFromHTML(this.content);
}

Post.prototype.getImages = function(){
	if(!this.content){
		this.imgArray = getImgFromHTML(this.content);
		return this.imgArray;
	}
}

Post.prototype.getThumbnail = function(){
	
	if(!this.imgArray.length > 0){
		return [];
	}
	return this.imgArray[0].replace(/s1600/g,'s320');
}





app.service('PostService', function(){
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
		feedURL = feedURL.concat("/posts/default");
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


/*  contains Authentication information
    must be pushed to server side
*/
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

