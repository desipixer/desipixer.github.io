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
	this.key = obj.id.$t.match(/\d+/g)[1].concat("-").concat(obj.id.$t.match(/\d+/g)[2]);
	this.url = obj.link[obj.link.length - 1].href;
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

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }


	return {
		getArrayByIndex : getArrayByIndex,
		objToQueryString : objToQueryString,
		shuffle : shuffle
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

});

app.service('SessionService', function(){
	var postObj = {
		entry : []
	}
	return {
		postObj : postObj
	}
});


app.service('pinService', function(){
	var appID = "4820759117729638536";

	var redirect = window.location.origin + window.location.pathname;

	var Const = {
	    ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
	    POPUP_OPTIONS: 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=700,height=500,left=0,top=0',
	    IG_OAUTH: 'https://instagram.com/oauth/authorize/?client_id=886a47a524e14842bb4dde8b4d2823c9&redirect_uri='+ redirect +'&response_type=token',
	    IG_FEED: 'https://api.instagram.com/v1/users/self/media/recent/?count=12&callback=_instaFeed&access_token=',
	    IG_COOKIE: 'ig_token',
	    PIN_APP: '4820759117729638536',
	    PIN_FIELDS: 'id,name,image[small]',
	    PIN_SCOPE: 'read_public, write_public'
	};



	PDK.init({ appId: Const.PIN_APP , cookie: true });

	var Pinterest = {
	    /*
	     *  Use the SDK to login to Pinterest
	     *  @param {Function} callback - function fired on completion
	     */
	    login: function(callback) {
	        PDK.login({ scope : Const.PIN_SCOPE }, callback);
	    },
	    /*
	     *  Use the SDK to logout of Pinterest
	     */
	    logout: function() {
	        PDK.logout();
	    },
	    /*
	     *  Use DK to determine auth state of user
	     *  @returns {Boolean}
	     */
	    loggedIn: function() {
	        return !!PDK.getSession();
	    },
	    /*
	     *  Use SDK to create a new Pin
	     *  @param {Object}   data     - {board, note, link, image_url}
	     *  @param {Function} callback - function fired on completion
	     */
	    createPin: function(data, callback) {
	        PDK.request('/v1/pins/', 'POST', data, callback);
	    },
	    /*
	     *  Use SDK to request current users boards
	     *  @param {Function} callback - function fired on completion
	     */
	    myBoards: function(callback) {
	        PDK.me('boards', { fields: Const.PIN_FIELDS }, callback);
	    }
	};

	return {
		Pinterest : Pinterest
	}
})




