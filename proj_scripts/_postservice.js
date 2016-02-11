var getBlogKeys = function(){
	return ["id","content","published","updated","title"];
}

/* check if a post is valid based on keys 
	@input : post object
	@output : boolean value
*/
var isValidPost = function(obj){
	// check if has all keys
	var blogKeys = getBlogKeys();
	blogKeys.forEach(function(value,index){
		if(!obj.hasOwnProperty(value)){
			return false;
		}
	});
	return true;
}


var Post = function(obj){
	this.id = obj.id.$t.match(/\d+/g)[2];
	this.imgArray = getImgFromHTML(obj.content.$t);
	this.key = obj.id.$t.match(/\d+/g)[1].concat("-").concat(this.id);
	this.published = obj.published.$t;
	this.updated = obj.updated.$t;
	this.title = obj.title.$t;
}

function getImgFromHTML = function(htmlContent){
	//copy paste from other website.
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

app.service('postService', function(){
	var feedObject = null;
	var postObject;

	/* generates postMap */
	var generatePostArray = function(feedObj){
		postObject = null;
		var postObj = null;
		feedObj.feed.entry.forEach(function(value,index){
			if(isValidPost(value)){
				postObj = new Post(value);
				postObject[postObj.key] = postObj;
			}
		});
		return postObject;
	}

	return {
		postObject : postObject,
		generatePostArray : generatePostArray
	}
});


app.service('blogService', ['postService', function(ps){
	//blog service
	var blogServiceObj = null;

	var Blog = function(obj){
		obj. 
	}


}]);


