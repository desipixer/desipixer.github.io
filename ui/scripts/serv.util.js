app.service('dp.service.util' , function(){
	
	/* takes html content as input and returns array */
	var parseImageFromHTML = function(htmlContent){
	    var imgArray = [];
	    var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
	    if(imgTags != undefined && imgTags.length > 0){
	        for(img of imgTags){
	            var imgURL = img.match(/(https?:\/\/.*\.(?:png|jpg))/ig);
	            if(imgURL != undefined && imgURL.length > 0){
	                if(imgURL[0].indexOf("bp.blogspot.com") !== -1){
	                    var imgSplit = imgURL[0].split('/');
	                    var imgRes = imgSplit.splice(imgSplit.length - 2,1);
	                    largeIMG = imgURL[0].replace(imgRes,"s1600");
	                    imgArray.push(largeIMG);
	                }
	            }
	        }
	    }
	    return imgArray;
	}

	var parseFeedObj = function(obj){
		obj["media$thumbnail"].url = obj["media$thumbnail"].url.replace('s72-c','s320');
		obj.imgArray = parseImageFromHTML(obj.content.$t);
		obj.thumb = (obj.imgArray.length > 0) ? obj.imgArray[0].replace('s1600','s320') : null;
		obj.url = ( obj.link.length > 0 ) ? obj.link[obj.link.length - 1].href : '#';
		var id = obj.id.$t.match(/\d+/g);
		obj.id = id[1].concat(id[2]);
		return obj;
	}

	var parseBlogFeed = function(feedObj){
		var obj = feedObj;
		if(typeof feedObj == "string"){
			obj = JSON.parse(feedObj);
		}
		obj.entryArr = _.filter(obj.feed.entry, function(obj){
			if(obj.hasOwnProperty("media$thumbnail")){
				obj.thumb = obj["media$thumbnail"].url.replace('s72','s320');
			}
			obj.url = ( obj.link.length > 0 ) ? obj.link[obj.link.length - 1].href : '#';
			var id = obj.id.$t.match(/\d+/g);
			obj.id = id[1].concat(id[2]);
			obj.imgArray = parseImageFromHTML(obj.content.$t);
			return true;
		});
		return obj;
	}

	return {
		parseImageFromHTML : parseImageFromHTML,
		parseFeedObj : parseFeedObj,
		parseBlogFeed : parseBlogFeed
	}
});