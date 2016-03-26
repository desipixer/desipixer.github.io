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

	return {
		parseImageFromHTML : parseImageFromHTML
	}
});