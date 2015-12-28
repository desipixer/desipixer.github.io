var AuthManager = (function(){
	var key = "AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ";
	var clientKey = "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com";

	var getKey = function(){
		return key;
	}

	var getClientKey = function(){
		return clientKey;
	}

	return {
		getKey : getKey,
		getClientKey : getClientKey
	}
})();


var UtilManager = (function(){

	/* converts params object to querystring */
	var objToQueryString = function(obj){
        var str = "?";
        for(key of Object.keys(obj)){
            str += key+ "="+ obj[key]+ "&";
        }
        return str.substring(0,str.length - 1);
    } 

    /* converts htmlContent to blog image array */
    var filterBlogImages = function(htmlContent){
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

    /* function to generate blogFeedURL based on blogID */
    var generateBlogFeedURL = function(blogID,params){
        if(blogID !== undefined){
            var strURL = "https://www.blogger.com/feeds/";
            strURL = strURL.concat(blogID);
            strURL = strURL.concat("/posts/default");
            var queryString = objToQueryString(params);
            strURL = strURL.concat(queryString);
            //console.log(strURL);
            return strURL;
        }
        else {
            return null;
        }
    }

    var generateAPIURL = function(blogName){
    	var baseURL = "https://www.googleapis.com/blogger/v3/blogs/byurl";
    	var params  = {
    		"key" : AuthManager.getKey(),
    		"url" : blogName
    	}
    	var queryString = objToQueryString(params);
    	return baseURL.concat(queryString);
    }

    /* removes stop words from the title */
    var removeStopWords = function(string){
    	var stopWords = ["Telugu","Tamil","Actress","Acress","CelebsNext","Photoshoot","Cinema","Photos","Photo","Pictures","Picture","Tollywood","Kollywood","Movies","Movie","Latest","Saree","Gallery","Dress","Event","Audio","Stills","Still"," hot ","Navel","Cleavage","Boobs","Exposing","Desi ","Heroin", "Images","Wallpapers","Wallpaper","Cute","Spicy","New ","Function","Success Meet","Teaser Launch","Launch "," Hot","Press Meet"," Launch","Sexy "];
    	var rExp;
    	for(word of stopWords){
    		rExp = new RegExp(word,"gi");
    		string = string.replace(rExp," ").trim();
    	}
    	string = removeNoise(string);
    	string = string.replace(/\s/g," ").trim();
    	return string;
    }

    function removeNoise(string){
    	var noiseWords = ["%2B","%25"];
    	var rExp;
    	for(word of noiseWords){
    		rExp = new RegExp(word,"gi");
    		string = string.replace(rExp," ").trim();
    		string = string.replace(/\W+/g," ").trim();
    		string = string.replace(" jpg","").trim();
    		string = string.replace(/\s/g," ").trim();
    	}
    	return string;
    }

    /* converts list of array elements to html elements */
    var getPostHTML = function(imageArray) {
            var imageSrc = "";
            imageArray.forEach(function(element,index){
                imageSrc = imageSrc + "<a href='" + element + "'  target='_blank'><img src='" + element + "' /></a>";
            });
            return imageSrc;
    }


    var searchObjectArray = function(arr,key,value){
        var obj = [];
        for(element of arr){
            if(element.hasOwnProperty(key)){
                if(value == element[key]){
                    obj.push(element);
                }
            }
        }
        if(obj.length == 0){
            return null;
        } else if (obj.length == 1){
            return obj[0];
        } else {
            return obj;
        }
    }

	return {
		generateBlogFeedURL : generateBlogFeedURL,
		generateAPIURL : generateAPIURL,
		removeStopWords : removeStopWords,
		getPostHTML : getPostHTML,
		objToQueryString : objToQueryString,
		filterBlogImages : filterBlogImages,
        searchObjectArray : searchObjectArray
	}
})();



/* blog manager function */

var BlogManager = (function(){
    var siteList = [
        {blogId: "7833828309523986982", blogURL: "http://www.desipixer.in/", category: 1},
        {blogId: "3079987222818050451", blogURL: "http://movies.cinema65.com/", category: 1},
        {blogId: "4846859112009281783", blogURL: "http://rockingfunimages.blogspot.com/", category: 1},
        {blogId: "719302156971941098", blogURL: "http://hq-bollywood.blogspot.com/", category: 1},
        {blogId: "1579799827781024268", blogURL: "http://www.telugupeopleadda.com/", category: 1},
        {blogId: "5935905342569794143", blogURL: "http://sabhothimages.blogspot.com/", category: 1},
        {blogId: "801637413886327659", blogURL: "http://honeymedia.blogspot.com/", category: 1},
        {blogId: "809630945277969589", blogURL: "http://masalaphotoshoot.blogspot.com/", category: 1},
        {blogId: "3253248415049615881", blogURL: "http://imagesofbeautyness.blogspot.com/", category: 1},
        {blogId: "2143860244095823240", blogURL: "http://southwoodgallery.blogspot.com/", category: 1},
        {blogId: "4684429767246952780", blogURL: "http://cinemapixss.blogspot.com/", category: 1},
        {blogId: "530660620295703790", blogURL: "http://wallpaperhd6.blogspot.in/", category: 1},
        {blogId: "5369598462899686878", blogURL: "http://hotever4u.blogspot.com/", category: 1},
        {blogId: "2553089477348570965", blogURL: "http://indianstunningactress.blogspot.com/", category: 1},
        {blogId: "1216148922285536921", blogURL: "http://bollywoodglitz24.blogspot.com/", category: 1},
        {blogId: "1566500733828359729", blogURL: "http://indianactressclub.blogspot.com/", category: 1},
        {blogId: "8904303770733117180", blogURL: "http://desigirlzall.blogspot.com/", category: 1},
        {blogId: "6468018902177861697", blogURL: "http://totaltollywoodmovies.blogspot.com/", category: 2},
         {blogId: "7225871578344472338", blogURL: "http://www.urtamilcinema.com/", category: 2},
         {blogId: "3293309843232706023", blogURL: "http://www.searchtamilmovies.com/", category: 1}
    ];

    var getBlogList = function(){
        return siteList;
    }

    return {
        getBlogList : getBlogList
    }
})();


var ProjectSettings = {
    maxResults : 500
}