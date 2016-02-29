var Image = function(title,url,src){
	this.title = title;
	this.url = url;
	this.src = src;
}

Image.prototype.getThumb = function(){
	return this.src.replace('s1600','s320');
}



app.service('imageService',function(URLService, AuthService, pinService, UtilManager, PostService){
	
	var imgArray = [];

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

	var createImageArray = function(obj){
		var imgObj = [];
		var imgArray = getImgFromHTML(obj.content.$t);
		var title = obj.title.$t;
		var url = obj.link[obj.link.length - 1].href;
		imgArray.forEach(function(value){
			var imgInstance = new Image(title,url,value);
			imgObj.push(imgInstance);
		});
		return imgObj;
	}

	var filterArray = function(arr,attr,filterText){
		var tempArr = [];
		if(arr.length == 0) return [];
		arr.forEach(function(value){
			if(value.hasOwnProperty(attr)){
				if(value[attr].toLowerCase().indexOf(filterText.toLowerCase()) !== -1){
					tempArr.push(value);
				}
			}
		})
		return tempArr;
	}



	return {
		imgArray : imgArray,
		createImageArray : createImageArray,
		filterArray : filterArray
	}
})


