var app = angular.module('dpApp',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function(stateProvider, urlProvider){
	urlProvider.otherwise('/home');

	stateProvider
		.state('home', {
			url : '/home',
			templateUrl : 'pages/wp.html',
			controller : 'dpWpCtrl'
		})
		.state('404', {
			url : '/404',
			templateUrl : 'pages/404.html'
		})
		.state('images', {
			url : '/images/:id',
			templateUrl : 'pages/images.html',
			controller : 'dpImageCtrl'
		})
		.state('wp', {
			url : '/wp',
			templateUrl : 'pages/wp.html',
			controller : 'dpWpCtrl'
		})
		.state('new', {
			url : '/new',
			templateUrl : 'pages/new.html',
			controller : 'dpNewCtrl'
		})
		
}]);
app.service('service.main', function(){
	var names = ["Senthil", "Kumar"];
	return {
		names : names
	}
})
//service.util.js
app.service('settings', function(){
	var publish = {
		sites : [
			{
				"blogId": "7833828309523986982",
				"blogURL": "http://www.desipixer.in/",
				"category": 1
			}
		]
	}
	return {
		maxResults : 500,
		maxApiFeedResults : 500,
		startIndex : 1,
		blogName : "http://www.dp.in",
		blogId : "7833828309523986982",
		publish : publish
	}
});
//globals.js

/**
 * Contains all global variables in this function
 * integrated icaro library which monitors urlArray change.
 */
app.service('globals', function(){
    
    var obj = {};//icaro({});
    obj.count = 0;
    // obj.listen(function(changes){
    //     ++obj.count;
    //     console.log("POSTED,COUNT : ", obj.count);
    // });

    var imgArray = [];
    obj.urlArray = [];

    return {
        imgArray : imgArray,
        urlArray : obj.urlArray,
        postCount : 0
    }

});
//service.util.js
app.service('service.auth', ["$q", function ($q) {

	// contains method for authentication
	var authKey = "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po";
	var clientSecret = "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com";

	var getAuthKey = function () {
		return authKey;
	}

	var deferred = $q.defer();

	var blogger = {
		getKey: function () {
			return authKey;
		},
		getClientSecret: function () {
			return clientSecret;
		},
		logMeIn: function () {
			var key = this.getKey();
			var parameters = {
				client_id: this.getClientSecret(),
				immediate: false,
				response_type: "token",
				scope: "http://www.blogger.com/feeds/"
			};
			gapi.auth.authorize(parameters, this.callbackFn);
		},
		callbackFn: function (data) {
			this.accessToken = data.access_token;
			deferred.resolve(data);
		},
		getToken: function () {
			this.logMeIn();
			return deferred.promise;
		},
		getAuthToken: function (data) {
			if (data != null) {
				return "Bearer ".concat(data.access_token);
			} else {
				return null;
			}
		},
		accessToken: null
	}

	var wordpressKeys = function () {
		//Supporting multiple sites.
		var wpAuthArray = [{
				"k": "*Z8pj8eoywKbmWq!w66oBkquzIy8mbkew0msXVQZkkm2Er65RsBb)GyV1^R@KfL%",
				"id": "140456691",
				"url": "http://p33dump.wordpress.com"
			},
			{
				"k": "L3pViq!U#GZ!U*ARj*u*$OuC!WrCor(H1VLN$pjpSnmJ5r##w0el2^H30HuwVL$Z",
				"id": "140493596",
				"url": "http://p33img.wordpress.com"
			},
			{
				"k": "r*@VZ0ikkf!D09SzZvh&Qo^ulf(dx(Dgbjwz&0XVCwMqp*@lfzxS4prnz&dfEbAL",
				"id": "140493943",
				"url": "http://atpixer.wordpress.com"
			},
			{
				"k": "g8LJCQvMbjEncIjAGrZdEx#y6wQb%TrCHh8Wj2uHJnYfp^MKHOB4udVT!mSja&cd",
				"id": "140494150",
				"url": "http://btpixer.wordpress.com"
			},
			{
				"k": "UcQOX9Y5nQq%OIGjg5CwOB^T8bPF^J&!TG2QN!Q9g#6gNaR(7D5NzyP$*$bqgcn8",
				"id": "139733464",
				"url": "http://x12pixer.wordpress.com"
			},
			{
				"k": "WTdLiUrB^ei46g6ssNOxBRlNmBC@Wix%Tj5WJItgNrcPJ4dDMt5o*Tz!sRp#7onJ",
				"id": "139747368",
				"url": "http://y12pixer.wordpress.com"
			},
			{
				"k": "819eWt$&D4LTVewC%6@jZmBUtzsf9(X@^nV4Z0%^UFA##Kf!AxU7$Kd#L&w7jt^6",
				"id": "139747377",
				"url": "http://z12pixer.wordpress.com"
			},
			{
				"k": "h0qE3ZX1z7CZRusMAB$^@HD*ZjicLeN!Yu$OqKVzzn%fswejn66U*r9kUH&fpk5q",
				"id": "139747387",
				"url": "http://a12pixer.wordpress.com"
			},
			{
				"k": "995AmhBr1NHYMu&$%4kOBURObP@!h5EmMDUGE(s6FATy1rRIFR5kOVw8dnJL4J1y",
				"id": "140417781",
				"url": "http://pixer44x.wordpress.com"
			},
			{
				"k": "%i&@sob9C2wsKmEYVy3cpe*myH9cEqeSA^R3OwqeS)sNAOh1$#pMIc^Y$l#m9cTI",
				"id": "140417785",
				"url": "http://pixer44y.wordpress.com"
			},
			{
				"k": "!9!6npc*hKdOL*)sg%PJnXcfYz4WH$^32oxi0WWc@jK55m#1kpU$6ri5nL(8akh8",
				"id": "140417790",
				"url": "http://pixer44z.wordpress.com"
			},
			{
				"k": "ywkeKONBSheZ9*UGLgDvti%*l@ew%CaF8Ch6hc7&k1@KGjzG1v72CKSBgkiE2Kk*",
				"id": "140417802",
				"url": "http://pixer44aa.wordpress.com"
			},
			{
				"k": "gyvDbM)Y&rzYOhnIlJIS!9n2uvcYnK787$KQDAQqMGyEU9!6Dk)hA%02Zns6kSOb",
				"id": "140417814",
				"url": "http://pixer44bb.wordpress.com"
			},
			{
				"k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
				"id": "137728983",
				"url": "http://pixer12wp.wordpress.com"
			},
			{
				"k": "FnXT0hE(UHL^3QRr0YZjnJMQ(efcBNPp3Ibx8xcnZwCUzUYm8h3q(z71UreEyBWz",
				"id": "137785059",
				"url": "http://p12x.wordpress.com"
			},
			{
				"k": "HjaXFCYITC!!770sJyFH5W6cXM8A0$zfV&018k57@SsGsQCUXNWL@rnoB#uxUo$V",
				"id": "137858077",
				"url": "http://p12y.wordpress.com"
			},
			{
				"k": "yTZEmEEGLxA6Rw$3vbZ)sI5zr1SmRLV2#*KIafBLuDbdGY!4yeQcGt0$rFPUdS!G",
				"id": "137858138",
				"url": "http://p12zblog.wordpress.com"
			},
			{
				"k": "!wkjCPw0w$Jawnf^XnXaYNWd&)cO^iA9mmIV&YZN2ctUUGvXLU)SaCQW47QEkw4@",
				"id": "137895800",
				"url": "http://p12go.wordpress.com"
			},
			{
				"k": "9N^dD319d1VdBn1GUE3!wDWeyMr8HwoDLdIz^qs8SFH31uyn3dqsFZceosnGuZ)T",
				"id": "137895882",
				"url": "http://p12in.wordpress.com"
			},
			{
				"k": "VkXQ%I2h2RxDkIcva5zE@tO@khPwW7pg%rza9(KPza8DhbX@%s^sPBG#bbh6hF)R",
				"id": "137947561",
				"url": "http://p12o.wordpress.com"
			},
			{
				"k": "KQsy8ZwOzcAUSP8(^!#cTC7vk&rttRbGRl6kL0Oh1H0!WJWTT42(MbFQOJ!^7sYo",
				"id": "137947612",
				"url": "http://p12q.wordpress.com"
			},
			{
				"k": "g4%cJAyHuaq@b^Nq6nA#d40C53Hl@TT^*56BG2O1TE3cUY&jM#l05SGQeLse6uP)",
				"id": "137947675",
				"url": "http://p12dp.wordpress.com"
			}
		]
		return wpAuthArray;
	}

	var obseleteKeys = [{
			"k": "n75l%!FgW4QYGo(d)txM(vET*x)Vz&4#eOiA$&Bu2dESBF6SYJXA$a3LAmmD*6Fd",
			"id": "123529464",
			"url": "http://desipixer4all.wordpress.com"
		},
		{
			"k": "563pl9%SbhQxr!1cF*fBffoY(7uVLbnhqaD39EEd^qxLNBZ9@S$$2yH3(M4dHqH(",
			"id": "123532018",
			"url": "http://p4pixer.wordpress.com"
		},
		{
			"k": "3lfaVOM2Exp*7lHRzd1Itg2CsR6ZdgHYfe8qJAY#^jxA#)lV26jXBP^AKFJNG!8X",
			"id": "123584701",
			"url": "http://p1pixer.wordpress.com"
		},
		{
			"k": "KiaJ52r1&LYzcXv!IKw!r^z6*r&oR&KyA0SYs9aM%$Hu^gWed2PQP25z@Pzf#8@j",
			"id": "123589156",
			"url": "http://p2pixer.wordpress.com"
		},
		{
			"k": "ooqaYu5!1NAR@JKR0Nmh%EBDoOThmESBqYSuEPY2MtzY#ZzO$9rDJg9a@eeVk1Nk",
			"id": "123997120",
			"url": "http://p3pixer.wordpress.com"
		},
		{
			"k": "uz956XTL!N!dS5)&Ym^I@0kl#@&!bp!9ZjxjMd*Mjp!vnQPOi%HZyt#W9R!M!)2u",
			"id": "124016517",
			"url": "http://p5pixer.wordpress.com"
		},
		{
			"k": "nh(r%rMY&26F8l!&rP4^P0GhrK@0O^N(FG0TvmwA0fxcS529dUu(Xcgcc#CHdNZm",
			"id": "124210679",
			"url": "http://p6pixer.wordpress.com"
		},
		{
			"k": "wENBN7RDts1AaQC0HaItfwb3a5L1wu24aSrqIEptF3qmekJiCyLa*WGElnlvn3c&",
			"id": "124264068",
			"url": "http://p7pixer.wordpress.com"
		},
		{
			"k": "Q*0DCC!dk9j56U#ZK3GO2xmwB68o9GN1o1h!l(G2&)NJfXmO67mAww$PzaZlXTk#",
			"id": "124315189",
			"url": "http://p0pixer.wordpress.com"
		},
		{
			"k": "!ZTen(MhUi@H88AUTRgN$Flo%ihcp6UQKr5V!Z1c%CyL@ww0FT9Yv1EAgyx95Svq",
			"id": "125064500",
			"url": "http://p9pixer.wordpress.com"
		}, {
			"k": "An%QTst2!ZXhN5WmKSQpzlxtMY9Uz1QEA3l97DcBfvj9fOFkr@mUBXl)$eq!3l9P",
			"id": "125169089",
			"url": "http://p10pixer.wordpress.com"
		}, {
			"k": "AsaG&73bWRNm5%s2QT3PLEwRA34c#JRXVxImzZKOOWZ^*Q4WJAMXb3QpVS1%WoJn",
			"id": "125295464",
			"url": "http://p11pixer.wordpress.com"
		}, {
			"k": "#nszah*X1zG02RPdyQS$OJEtceD!jJXMiGCDLMhI2Zad1id^rmb)xy)nz)4&n3d@",
			"id": "125299869",
			"url": "http://p12pixer.wordpress.com"
		}, {
			"k": "g1Z1bdir()Tl5onXeMYEsPkb8YZkq)PrJFwnQi@#YCU2jvybU^ufeHAiZ#Sds7K)",
			"id": "125571041",
			"url": "http://p13pixer.wordpress.com"
		}, {
			"k": "AYaBUdCp13qm*KS0b&9P^^oxD7bBa#&&Ou^XO&v@Rz59MAEoE2ljjCKUA5Wqa!%K",
			"id": "126218198",
			"url": "http://p14pixer.wordpress.com"
		}, {
			"k": "BHHyD)L9cb9quM61KXAEK#VBxeUbXu)XM%pX7^rhxp(L(t73ct6hu4weDh$0sh3t",
			"id": "127036792",
			"url": "http://p15pixer.wordpress.com"
		}, {
			"k": "Etlc7ZGKV#)381Z(Gr3uWPnomKmte@L*rU6Cc)XIv9b9Kd2KF@a$FHrP^mFN5EV)",
			"id": "127756953",
			"url": "http://p16pixer.wordpress.com"
		}, {
			"k": "23o$b6P*o*QpfgXqVAkrF15IMpqRjO6CG8^fjZTHumuXsiCAJHs7hSEY7oT6$IP6",
			"id": "129364434",
			"url": "http://p18pixer.wordpress.com"
		},
		{
			"k": "K1nWTqM!3cwreJewYo^AS%jJQYfp6Ie4(uBF!1yuLryI6##X!mC%sNv2byU@a7!n",
			"id": "130089074",
			"url": "http://p19pixer.wordpress.com"
		},
		{
			"k": "oZ#6LbBE5syI3ycx19#(Mh5iRWKul%jb2G4MZ65*xtvKC9xIFQ6pH0itiFMNNJj6",
			"id": "130666870",
			"url": "http://p20pixer.wordpress.com"
		},
		{
			"k": "ZpV9Y3S8Zft8zY#Lp0zdNXHiW)%SluCfHwkBC#YXCCRktZdX#qeZtYgm*5RvS*AI",
			"id": "130966368",
			"url": "http://p22pixer.wordpress.com"
		},
		{
			"k": "KEvHN6S0uo4RWuw0bSGtx9ygXr9EhWQNaduLoiB4GmDu8duDSC5Vxco&2MDUG*3P",
			"id": "131240918",
			"url": "http://p23pixer.wordpress.com"
		},
		{
			"k": "TXDB#6WAb(doAIqEO0MZrGOYWoytBw6b&FsdS61*qjjN#xZLRh5#F)#lnEQqEw@%",
			"id": "131347544",
			"url": "http://p24pixer.wordpress.com"
		},
		{
			"k": "4&QK5F@zk96kDPO#Q^MiH2*WbY3gWGFDlksuPLbr0ikYrYBdACIbqqob4#mnn#CT",
			"id": "131368491",
			"url": "http://p25pixer.wordpress.com"
		},
		{
			"k": "GAplX8zm4#Y(IHxBsyfT7&P%1NCX2ZkkaXA2Ww9rKS4#F)CU%B9OY%we9%g&)V62",
			"id": "133609128",
			"url": "http://pixer02.wordpress.com"
		},
		{
			"k": "c9*cNX9nYX!LINRxHMAyaLD9R^6ecHXdUZ8oLxDSJfE%&8Qy0QtREg)0Jvb)jXv%",
			"id": "133630558",
			"url": "http://pixer02x.wordpress.com"
		},
		{
			"k": "&jB16!UZQ@zqdJL)G0M^%CRKuT!DsQeHhGM#MM&8Iodnl#$rChLDu%N8qvxQ3iOx",
			"id": "133630587",
			"url": "http://pixer02y.wordpress.com"
		}
	];

	//var wpBlodId = "109226478";
	//var wpBlogId = "121469346";
	//var wpBlogId = "123309558"; // desipixerz.wordpress.com --unused
	//var wpBlogId = "123360170"; //desipixercelebsnext.wordpress.com
	//var wpBlogId = "123467412"; //desipixersblog.wordpress.com

	return {
		getAuthKey: getAuthKey,
		blogger: blogger,
		wpKeys: wordpressKeys
	}
}]);
//service.util.js
app.service('service.url', ['$http', "service.auth","settings", function(http, authService, settings){

	var objToString = function(obj){
		if(obj == null){
			return;
		}
		var str = "?";
		Object.keys(obj).forEach(function(value,index){
			str += value.concat("=").concat(obj[value]).concat("&");
		})
		return str.substring(0, str.length - 1);
	}

	// construct url to get blog id if URL is given as input
	var urlForBlogDetails = function(id){
		id = id !== null ? id : settings.blogId;
		return "https://www.googleapis.com/blogger/v3/blogs/".concat(id).concat("/posts?fetchImages=true&key=").concat(authService.getAuthKey());
	}

	var	urlForBlogFeed = function(id ,startIndex, maxResults){
		startIndex = startIndex !== null ? startIndex : settings.startIndex;
		maxResults = maxResults !== null ? maxResults : settings.maxResults;
		id = id !== null ? id : settings.blogId;
		var qs = {
			"start-index" : startIndex,
			"max-results" : maxResults,
			"alt" : "json",
			"callback" : "JSON_CALLBACK"
		}
		return "https://www.blogger.com/feeds/".concat(id).concat("/posts/default").concat(objToString(qs));
	}

	var urlForBlogId = function(blogName){
		var qs = {
			key : authService.getAuthKey(),
			url : blogName
		}
		return "https://www.googleapis.com/blogger/v3/blogs/byurl".concat(objToString(qs));
	}

	var urlForSearchText = function(id, startIndex, maxResults, keyword){
		if(keyword == undefined || keyword == ""){
			return urlForBlogFeed(id, startIndex,maxResults);
		}
		startIndex = startIndex !== null ? startIndex : settings.startIndex;
		maxResults = maxResults !== null ? maxResults : settings.maxResults;
		id = id !== null ? id : settings.blogId;
		var qs = {
			"start-index" : startIndex,
			"max-results" : maxResults,
			"q" : keyword,
			"alt" : "json",
			"callback" : "JSON_CALLBACK"
		}
		return "https://www.blogger.com/feeds/".concat(id).concat("/posts/default").concat(objToString(qs));
	}

	var getPostUrl = function(blogId){
		return "https://www.googleapis.com/blogger/v3/blogs/".concat(blogId).concat("/posts");
	}

	var getApiFeedUrl = function(blogId, pageToken){
		blogId = blogId || "7833828309523986982";
		var baseUrl = "https://www.googleapis.com/blogger/v3/blogs/"+ blogId +"/posts";
		if(pageToken){
			var qs = {
				fetchImages : true,
				key : authService.getAuthKey(),
				maxResults : settings.maxApiFeedResults,
				pageToken : pageToken
			}
			return baseUrl.concat(objToString(qs));
		} 
		var apiFeedUrl = "https://www.googleapis.com/blogger/v3/blogs/"+ blogId +"/posts?fetchImages=true&key=AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE&maxResults=500";
		return apiFeedUrl;
	}

	return {
		urlForBlogId : urlForBlogId,
		urlForBlogFeed : urlForBlogFeed,
		getApiFeedUrl : getApiFeedUrl,
		urlForBlogDetails : urlForBlogDetails,
		urlForSearchText : urlForSearchText,
		objToString : objToString,
		getPostUrl : getPostUrl
	}
}]);
//service.util.js
app.service('service.util', ['$http','settings','service.url', function(http, settings, urlService){

	 this.sessionBlog = [];
	// filter images from HTML content and return as array
	var filterImages = function(htmlContent){
		var imgArray = [];
        var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
        if(imgTags != undefined && imgTags.length > 0){
            imgTags.forEach(function(value,index){
            	var imgURL = value.match(/(https?:\/\/.*\.(?:png|jpg))/ig);
            	if(imgURL != undefined && imgURL.length > 0){

            	    /* get large images if it is a blogger site images */
            	    if(imgURL[0].indexOf("blogspot.com") !== -1){
            	        var imgSplit = imgURL[0].split('/');
            	        var imgRes = imgSplit.splice(imgSplit.length - 2,1);
            	        largeIMG = imgURL[0].replace(imgRes,"s1600");
            	        
            	        imgArray.push(largeIMG);
            	    }
            	}
            });
        }
        return imgArray;
	}

	

	var processBlogObj = function(obj, category){
		if(obj == undefined){
			return;
		}
		
		category = category || 1;
		if(category == 1){
			if(obj.hasOwnProperty('feed')){
				if(obj.feed.hasOwnProperty('entry')){
					// print number of entries
					console.log("Entries : "+ obj.feed.entry.length);
					// start processing individual entries
					var resultArr = [];
					var entryArr = obj.feed.entry;
					entryArr.forEach(function(value,index){
						var obj = {};
						obj.title = (value.title.$t !== undefined) ? value.title.$t : null;
						obj.link = (value.link !== undefined) ? value.link[value.link.length - 1].href : null;
						obj.id = (value.id.$t !== undefined) ? value.id.$t.match(/\d+/g)[1].concat("-").concat(value.id.$t.match(/\d+/g)[2]) : null;
						obj.images = (value.content.$t !== undefined) ? filterImages(value.content.$t) : [];
						obj.thumb = (obj.images.length !== 0) ? obj.images[0].replace('s1600','s480') : [];
						obj.published = value.published.$t;
						obj.updated = value.published.$t;

						resultArr.push(obj);
					});
					this.sessionBlog = resultArr;
					return resultArr;
				}
			}
		} else if (category == 2){
			//console.log(obj);
			var resultArr = [];
			// process feed api obj
			var entryArr = obj.items;
			console.log("Entries : "+ obj.items.length);
			// from feed api
			entryArr.forEach(function(value,index){
				if(value != undefined){
					//console.log(value);
					var obj = {};
					obj.title = value.title;
					obj.images = filterImages(value.content);
					obj.thumb = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g,"s480"))[0]; //can be memory intensive
					obj.id = value.id;
					obj.published = (new Date(value.published)).getTime();
					obj.updated = (new Date(value.updated)).getTime();
					obj.link = value.url;
					
					resultArr.push(obj);
				}
			});
			
			this.sessionBlog = resultArr;
			return resultArr;
		}
		
		return [];
	}


	var processBlogImagesObj = function(obj, category){
		if(obj == undefined){
			return;
		}
		
		category = category || 1;
		if(category == 1){
			if(obj.hasOwnProperty('feed')){
				if(obj.feed.hasOwnProperty('entry')){
					// print number of entries
					console.log("Entries : "+ obj.feed.entry.length);
					// start processing individual entries
					var resultArr = [];
					var entryArr = obj.feed.entry;
					entryArr.forEach(function(value,index){
						var ent = {};
						ent.images = (value.content.$t !== undefined) ? filterImages(value.content.$t) : [];
						if(ent.images != undefined && ent.images.length > 0){
							ent.images.forEach(function(v, i){
								var obj = {};
								obj.title = (value.title.$t !== undefined) ? value.title.$t + " : "+ i.toString() : null;
								obj.link = (value.link !== undefined) ? value.link[value.link.length - 1].href : null;
								obj.id = (value.id.$t !== undefined) ? value.id.$t.match(/\d+/g)[1].concat("-").concat(value.id.$t.match(/\d+/g)[2]).concat("-").concat(i) : null;
								//obj.thumb = (obj.images.length !== 0) ? obj.images[0].replace('s1600','s480') : [];
								obj.published = value.published.$t;
								obj.updated = value.published.$t;
								obj.images = [v];
								resultArr.push(obj);
							})
							
						}

						
					});
					this.sessionBlog = resultArr;
					return resultArr;
				}
			}
		} else if (category == 2){
			//console.log(obj);
			var resultArr = [];
			// process feed api obj
			var entryArr = obj.items;
			console.log("Entries : "+ obj.items.length);
			// from feed api
			entryArr.forEach(function(value,index){
				if(value != undefined){
					//console.log(value);
					var obj = {};
					obj.title = value.title;
					obj.images = filterImages(value.content);
					obj.thumb = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g,"s480"))[0]; //can be memory intensive
					obj.id = value.id;
					obj.published = (new Date(value.published)).getTime();
					obj.updated = (new Date(value.updated)).getTime();
					obj.link = value.url;
					
					resultArr.push(obj);
				}
			});
			
			this.sessionBlog = resultArr;
			return resultArr;
		}
		
		return [];
	}

	var processBlogEntries = function(entryArr, category){
		var resultArr = [];
		if(entryArr.length == 0){
			return [];
		}
		if(entryArr == undefined){
			return [];
		}
		category = category || 1;
		if(category == 1){
			entryArr.forEach(function(value,index){
				if(value !== undefined){
					var obj = {};
					obj.title = (value.title.$t !== undefined) ? value.title.$t : null;
					obj.link = (value.link !== undefined) ? value.link[value.link.length - 1].href : null;
					obj.id = (value.id.$t !== undefined) ? value.id.$t.match(/\d+/g)[1].concat("-").concat(value.id.$t.match(/\d+/g)[2]) : null;
					obj.images = (value.content.$t !== undefined) ? filterImages(value.content.$t) : [];
					obj.thumb = (obj.images.length !== 0) ? obj.images[0].replace('s1600','s480') : [];
					obj.published = value.published.$t;
					obj.updated = value.published.$t;

					resultArr.push(obj);
				}
				
			});
		} else if(category == 2){
			// from feed api
			if(value != undefined){
				var obj = {};
				obj.title = value.title;
				obj.images = filterImages(value.content);
				obj.thumb = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g,"s320")); //can be memory intensive
				obj.id = value.id;
				obj.published = (new Date(value.published)).getTime();
				obj.updated = (new Date(value.updated)).getTime();
				obj.link = value.url;
				return obj;
			}
			
		}
		
		this.sessionBlog = resultArr;
		return resultArr;
	}

	var processBlogImgEntries = function(entryArr, category){
		var resultArr = [];
		if(entryArr.length == 0){
			return [];
		}
		if(entryArr == undefined){
			return [];
		}
		category = category || 1;
		console.log("CATEGORY :"+ category);
		if(category == 1){
			entryArr.forEach(function(value,index){
						var ent = {};
						console.log("value : ", value);
						if(value != undefined){
							ent.images = (value.content.$t !== undefined) ? filterImages(value.content.$t) : [];
							if(ent.images != undefined && ent.images.length > 0){
								ent.images.forEach(function(v, i){
									var obj = {};
									obj.title = (value.title.$t !== undefined) ? value.title.$t + " : "+ i.toString() : null;
									obj.link = (value.link !== undefined) ? value.link[value.link.length - 1].href : null;
									obj.id = (value.id.$t !== undefined) ? value.id.$t.match(/\d+/g)[1].concat("-").concat(value.id.$t.match(/\d+/g)[2]).concat("-").concat(i) : null;
									//obj.thumb = (obj.images.length !== 0) ? obj.images[0].replace('s1600','s480') : [];
									obj.published = value.published.$t;
									obj.updated = value.published.$t;
									obj.images = [v];
									obj.content = value.content.$t;
									resultArr.push(obj);
								})
							}	
						}
					});
		} else if(category == 2){
			// from feed api
			if(value != undefined){
				var obj = {};
				obj.title = value.title;
				obj.images = filterImages(value.content);
				obj.thumb = JSON.parse(JSON.stringify(obj.images).replace(/s1600/g,"s320")); //can be memory intensive
				obj.id = value.id;
				obj.published = (new Date(value.published)).getTime();
				obj.updated = (new Date(value.updated)).getTime();
				obj.link = value.url;
				return obj;

			}
			
		}
		
		this.sessionBlog = resultArr;
		return resultArr;
	}

	var searchSite = function(blogUrl){
		return http.get(urlService.urlForBlogId(blogUrl));
	}

	var searchText = function(blogId, keyword){
		//debugger;
		var reqUrl = urlService.urlForSearchText(blogId, null, null, keyword);
		return http.jsonp(reqUrl);
	}

	var getEntries = function(blogId, startIndex, maxResults, category){
		category = category || 1;
		if(category == 1){
			var reqUrl = urlService.urlForBlogFeed(blogId, startIndex, maxResults);
			return http.jsonp(reqUrl);
		}
		else if (category == 2){
			var reqUrl = urlService.getApiFeedUrl(blogId, null);
			return http.get(reqUrl);
		}
	}

	/**
		 * Read array from file and pass the values to Post function
		 */
	function getValuesFromFile(fileName, callbackFn) {
		fileName = fileName || 'data/images.json';
		http.get(fileName).success(function (dataObj) {
			if (dataObj instanceof Array) {
				if (dataObj.length > 0) {
					console.log("FILE RETRIEVED : ", dataObj.length);
					callbackFn(dataObj);
				}
			}
		}).error(function (err) {
			console.log("ERROR >> ", err);
		});
	}

	return {
		getEntries : getEntries,
		processBlogObj : processBlogObj,
		searchSite : searchSite,
		searchText : searchText,
		sessionBlog : this.sessionBlog,
		processBlogEntries : processBlogEntries,
		processBlogImgEntries : processBlogImgEntries,
		processBlogImagesObj : processBlogImagesObj,
		getValuesFromFile : getValuesFromFile
	}
}]);
app.service('service.sites', function(){
	/* returns default list of sites */
	var sites = [
		{
		    "blogId": "7833828309523986982",
		    "blogURL": "http://www.desipixer.in/",
		    "category": 1
		},
		{
		    "blogId": "3079987222818050451",
		    "blogURL": "http://movies.cinema65.com/",
		    "category": 1
		},
		{
		    "blogId": "4846859112009281783",
		    "blogURL": "http://rockingfunimages.blogspot.com/",
		    "category": 1
		},
		{
		    "blogId": "719302156971941098",
		    "blogURL": "http://hq-bollywood.blogspot.com/",
		    "category": 1
		},
		{
		    "blogId": "1579799827781024268",
		    "blogURL": "http://www.telugupeopleadda.com/",
		    "category": 1
		},
		{
		    "blogId": "5935905342569794143",
		    "blogURL": "http://sabhothimages.blogspot.com/",
		    "category": 1
		},
		{
		    "blogId": "3293309843232706023",
		    "blogURL": "http://www.searchtamilmovies.com/",
		    "category": 1
		},
		{
		    "blogId": "2951969169923408846",
		    "blogURL": "http://fultohot.blogspot.com/",
		    "category": 1
		},
		{
		    "blogId": "4846859112009281783",
		    "blogURL": "http://www.celebsnext.com/",
		    "category": 2
		},
		{blogId: "4040041419446016295", blogURL: "http://cinewaaradhi.blogspot.com", category: 1},
		{blogId: "2222622162581355396", blogURL: "http://www.tufan9.com/", category: 1},
		{blogId: "5338625676592862668", blogURL: "http://cinytown.blogspot.com/", category: 1},
        {blogId: "3430584311590741572", blogURL: "http://tollywoodboost.blogspot.com/", category: 1},
        {blogId: "5186853171678363994", blogURL: "https://latestmovieimagess.blogspot.com", category: 1},
        {blogId: "4758457913364204558", blogURL: "http://cinestargallery.blogspot.com/", category: 1},
        {blogId: "3512841850294928870", blogURL: "http://bollywoodtadkamasala.blogspot.com/", category: 2}
	];

	return {
		sites : sites
	}
});
app.service('service.post', ["service.auth", "service.util", "service.url", "$http", "$q", "settings", function(auth, utilService, urlService, $http, $q, settings){
	//post service

	var generatePostHTML = function(imgArray, title){
		var htmlStr = "";
		if(imgArray.length > 0){
			var imgTitle = title;
			htmlStr = "<div> <a href='https://twitter.com/desipixer'> @desipixer </a> </div><div>";
			imgArray.forEach(function(value,index){
				htmlStr = htmlStr.concat("<img src='").concat(value).concat("' title='").concat(imgTitle).concat("' class='desipixer' />");
			});
			htmlStr += "</div>";
		}
		return htmlStr;
	}

	var login = function(){
		console.log('called login service');
		return auth.blogger.getToken();
	}

	var loggedIn = function(){
		return auth.blogger.accessToken();
	}

	var createPostRequest = function(postObj, accessToken){
		var title = postObj.title;
		var imgArray = postObj.images;	
		var htmlStr = generatePostHTML(imgArray, title);

		return getPostObj(htmlStr, title, accessToken);
	}

	var getPostObj = function(htmlStr, title, accessToken){
		var blogId = settings.publish.sites[0].blogId;
		var url = urlService.getPostUrl(blogId);
		var ajaxData = {
			"content" : htmlStr,
			"title" : title
		};

		var data = "";

		var config = {
			headers : {
				'Authorization' : auth.blogger.getAuthToken(accessToken)
			}
		}

		return publishPost(url, ajaxData, config);
	}
	
	var publishPost = function(url, data, config){
		var deferred = $q.defer();
		$http.post(url,data,config).success(function(data,status){
			deferred.resolve(data);
		}).error(function(err){
			console.log(err);
		});
		return deferred.promise;
	}


	return {
		getPostObj : getPostObj,
		createPostRequest : createPostRequest,
		loggedIn : loggedIn,
		login : login,
		publishPost : publishPost,
		generatePostHTML : generatePostHTML
	}

}])
//third party libraries implementations

var clipboard = new Clipboard('.btn');


document.onkeydown = function(event){
	if(event.keyCode == 8  && (e.target.tagName != "TEXTAREA") && (e.target.tagName != "INPUT")) { 
		event.preventDefault();
		history.back(-1);
	}	

}
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});



app.controller('dpMainCtrl', ['$scope','service.sites','service.main', function($scope,siteServ, mainServ){
	$scope.sites = siteServ.sites;
	$scope.names = mainServ.names;

}]);

	
app.controller('dpHomeCtrl', ['$scope','service.sites','service.util','settings','$http', '$interval', 'service.post', function($scope,siteServ, utilServ, settings, $http, $interval, postService){
	$scope.title = "Home Page";
	$scope.sites = siteServ.sites;
	$scope.startIndex = settings.startIndex;

	if(utilServ.sessionBlog.length > 0){
		$scope.entries = utilServ.sessionBlog;
	} else {
		utilServ.getEntries(null, settings.startIndex, settings.maxResults).success(function(obj){
			var processedObj = utilServ.processBlogObj(obj, 1);
			$scope.entries = processedObj;
		}).error(function(err){
			console.log(err);
		});
	}

	$scope.selSiteChange = function(){
		var category = _.filter(siteServ.sites, function(site){
			
			return site.blogId == $scope.selSite;
		});
		if(category){
			category = category[0].category;
		}
		console.log("blog category "+ category);

		utilServ.getEntries($scope.selSite, null, null, category).success(function(obj){
			
			
			//$scope.totalEntries = obj.feed.entry !== undefined ? obj.feed.entry.length || 0;;
			var processedObj = utilServ.processBlogObj(obj, category);
			$scope.entries = processedObj;	
			//console.log($scope.entries);
		}).error(function(err){
			console.log(err);
		});
	}

	$scope.searchSite = function(){
		utilServ.searchSite($scope.txtSearchSite).success(function(obj){
			//console.log(obj);
			$scope.selSite = obj.id;
			$scope.selSiteChange();
			var blogObj = {
			    "blogId": obj.id,
			    "blogURL": $scope.txtSearchSite,
			    "category": 1
			};
			console.log(blogObj.toString());

		}).error(function(err){
			console.log("Error during searching site : "+ err);
		})
	}

	$scope.searchKeyWords = function(){
		var blogId = $scope.selSite.blogId !== undefined ? $scope.selSite.blogId : $scope.selSite ;
		utilServ.searchText(blogId, $scope.txtSearch).success(function(obj){
			var processedObj = utilServ.processBlogObj(obj);
			$scope.entries = processedObj;
		});
	}

	$scope.getPreviousPosts = function(){
		if(settings.startIndex <= 1){
			return;
		}
		$scope.startIndex= settings.startIndex -= settings.maxResults;
		var blogId = $scope.selSite.blogId !== undefined ? $scope.selSite.blogId : $scope.selSite ;
		utilServ.getEntries(blogId, settings.startIndex, settings.maxResults).success(function(obj){
			var processedObj = utilServ.processBlogObj(obj);
			$scope.entries = processedObj;
		}).error(function(err){
			console.log(err);
		});
	}

	$scope.getNextPosts = function(){
		$scope.startIndex = settings.startIndex += settings.maxResults;
		var blogId = $scope.selSite.blogId !== undefined ? $scope.selSite.blogId : $scope.selSite ;
		utilServ.getEntries(blogId, settings.startIndex, settings.maxResults).success(function(obj){
			var processedObj = utilServ.processBlogObj(obj);
			$scope.entries = processedObj;
		}).error(function(err){
			console.log(err);
		});
	}

	$scope.titleSort = function(){
		utilServ.sessionBlog = $scope.entries =  _.sortBy($scope.entries, function(obj){
			return obj.title;
		});
	}

	$scope.shuffleArray = function(){
		utilServ.sessionBlog = $scope.entries = _.shuffle($scope.entries);
	}


	$scope.getWPAuth = function(){
		var authUrl = "https://public-api.wordpress.com/oauth2/authorize?client_id=51005&redirect_uri=https://desipixer.github.io/dp-grunt/dist&response_type=token";
		var postUrl = "https://public-api.wordpress.com/rest/v1/sites/109226478/posts/new";

		$http({
			method: 'POST',
			url : postUrl, 
			data : {
				title : "Hi-Title-New"
			},
			headers : {
				"Authorization" : "Bearer mja3FL5dcUVKeVF5!$u3IvE6SPZYuVfef)g9cr2Tm0is2F7FMvlCCs(PfWdI0&eP"
			}
		}).success(function(data){
			console.log(data);
		}).error(function(err){
			console.log(err);
		})
		//window.location = authUrl;
	}


	$scope.postAllToWordpress = function(){
		// get all images and post to wordpress
		var entryArray = $scope.entries;
		var i= $scope.entries.length - 1;	
		var x = $scope.entries.length;

		setInterval(function() {

		    if (x > 0) {
		        postEntry($scope.entries[i--], i);
		    }

		    else return;

		    x--;
		}, 200);


	}


	function postEntry(postObj, i){	
		var bearerToken = "mja3FL5dcUVKeVF5!$u3IvE6SPZYuVfef)g9cr2Tm0is2F7FMvlCCs(PfWdI0&eP";
		var postUrl = "https://public-api.wordpress.com/rest/v1/sites/109226478/posts/new";
		var postTitle = postObj.title;
		var postContent = postService.generatePostHTML(postObj.images, postObj.title);
		// Ignore any posts with less than 2 images. Most probably it will be bogus/ spam
		if(postObj.images.length > 1){
			$http({
				method: 'POST',
				url : postUrl, 
				data : {
					title : postTitle,
					content : postContent
				},
				headers : {
					"Authorization" : "Bearer "+ bearerToken
				}
			}).success(function(data){
				//$('#wp-status').css('color','green').fadeOut(1000);
				
				console.log("Posted Item :"+ i);
				console.log(data);
			}).error(function(err){
				console.log(err);
			})
		}
		
	}

	$scope.shareToGplus = function(postObj){
		console.log(postObj);
		var url = "https://plus.google.com/share?url=".concat(postObj.link);
		var win = window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		win.focus();
	}

	//angular.element(document.getElementsByClassName('.thumb-img')).css('width', '100px');
	
	
}]);

	
app.controller('dpWpCtrl', ['$scope', 'service.sites', 'service.util', 'settings', '$http', '$interval', 'service.post', 'service.url', 'service.auth', '$q',
	function ($scope, siteServ, utilServ, settings, $http, $interval, postService, urlService, authService, $q) {
		$scope.title = "Wordpress Page";
		$scope.sites = siteServ.sites;
		$scope.startIndex = settings.startIndex;
		$scope.totalItems = 0;
		$scope.allEntries = [];
		var wpSettings = {
			errCount: 50
		}
		var wordpressKeys = authService.wpKeys();
		$scope.postSiteList = wordpressKeys;
		console.log(wordpressKeys);
		var targetBlog = wordpressKeys[wordpressKeys.length - 1];
		var wpBlogId = targetBlog.id;
		var bearerToken = targetBlog.k;

		$scope.startIndex = 0;
		$scope.endIndex = 0;

		$scope.selectedSiteChanged = function(){
			
			var siteUrl = $scope.selectedSite;
			let temparr = _.where(wordpressKeys, { url : siteUrl});
			if(temparr.length > 0){
				console.log("POST BLOG CHANGED TO ", temparr[0].url)
				bearerToken = temparr[0].k;
				wpBlogId = temparr[0].id;
			}
		}


		/********************
		* refer $scope.postContent() function 
		******************** */

		/**
		 * Post content inside textarea to Wordpress.
		 * Single post creation.
		 */


		/**
		 * Function for file upload
		 * @param {*} event 
		 */
		function onChange(event){
			var reader = new FileReader();
			reader.onload = onReaderLoad;
			if(event.target.files.length < 0){
				console.log("ERROR >> file not selected");
				$('#errContainer').text("ERROR >> file not selected").css('color','red');
			}
			reader.readAsText(event.target.files[0]);
		}

		function onReaderLoad(event){
			try {
				var obj = JSON.parse(event.target.result);
				if(obj){
					if(typeof obj == 'object'){
						$scope.endIndex = obj.length;
						dumpImages(obj);
					}
				} else {	
					console.log("INVALID object");
				}
			} catch(e){
				console.log("ERROR >> ", e);
			}
		}

		$scope.postJson = function(){
			var el = document.getElementById('uploadFile');
			document.getElementById('uploadFile').addEventListener('change', onChange);
			var event = new CustomEvent('change', onChange);
			el.dispatchEvent(event);
		}

		var settings = {
			count: 0,
			start: $scope.startIndex,
			end: $scope.endIndex,
			errCount: 0,
			imageCount : 20
		};


		var generateDumpHtml = function(arr){
			if(arr){
				var str = "";
				arr.forEach(function(value, index){
					var imgTitle = getCleanTitleName(value);
					var src = value;
					str += `<div id='postContainer'><h2> ${imgTitle} </h2> <div id='picContainer'><img src='${src}' title='${imgTitle}' alt='photo desipixer' /></div></div>`;
				});
				return str;
			}
		}

		$scope.postContent = function(){
			//get file from data folder.
			$http({
				method : 'GET',
				url : $scope.fileName
			})
			.success(function(data){
				console.log("TOTAL COUNT", data.length);
				dumpImages(data);
			})
			.error(function(err){
				console.log("ERROR >> ", err);
			})
		}

		function dumpImages(arr){
			if(arr){
				var count = settings.count || 0;
				var start = settings.start || 0;
				var end = settings.end || 0;
				var errCount = settings.errCount || 0;
				var imageCount = settings.imageCount || 10;
				end = arr.length;
				postDumpImages(arr, start, end, count, errCount, imageCount);
			} else {
				console.log("ERROR >> Invalid array");
			}
		}

		function postDumpImages(arr, start, end, count, errCount, imageCount){
			console.log("start:end:count:errCount", start, end, count, errCount);
			$scope.responseObj = JSON.stringify({
				"start" : start,
				"end" : end,
				"count" : count,
				"errCount" : errCount
			});
			if (start > end) {
				return;
			}
			var tempArr = [];
			try {
				tempArr = arr.slice(start, start + imageCount)
			}
			catch(e){
				console.log("ERROR >> array exception : ", e)
			}
			var title = getCleanTitleName(arr[start]) + " dump "+ count;
			var content = generateDumpHtml(tempArr);

			$http({
				method: 'POST',
				url: "https://public-api.wordpress.com/rest/v1/sites/" + wpBlogId + "/posts/new",
				data: {
					title: title,
					content: content
				},
				headers: {
					"Authorization": "Bearer " + bearerToken
				}
			}).success(function (data) {
				console.log("data : ", data);
				console.log("COUNT : " + ++count);
				$scope.wpPostResponse = data;
				

				postDumpImages(arr, start + imageCount, end, count, errCount, imageCount);

			}).error(function (err) {
				if (errCount > 20) {
					return;
				}
				console.log("ERROR >> " + err);
				console.log("COUNT : " + ++count);
				postDumpImages(arr, start + imageCount, end, count, ++errCount, imageCount);
			})
		}

		function randomIntFromInterval(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}


		/**
		 * Cleans title Name and returns the title.
		 */
		function getCleanTitleName(link) {
			try {
				var pathname = (new URL(link)).pathname;
				var filename = pathname.split("/").pop();
				filename = cleanFileName(filename);
				filename = removeStopWords(filename);
				return filename;
			} catch(ex){
				console.log("Error >> getCleanTitleName : ", ex);
				return (new Date().getTime())+" err";
			}
		}

		function cleanFileName(str) {
			try {
				str = decodeURIComponent(str);
				var suffix = "";
				var suffixMatch = str.match(/(\.jpg)|(\.png)/g);
				if (suffixMatch !== undefined && suffixMatch !== null) {
					suffix = suffixMatch[0];
				}
				str = str.replace(/(\.jpg)|(\.png)/g, " ");
				str = str.replace(/\W/g, " ");
				str = str.replace(/\_/g, " ");
				str = str.replace(/\s+/g, " ").trim();
				return str;
			} catch(ex) {
				console.log("Error >> cleanFileName : ", ex);
				return (new Date().getTime())+" err";
			}
		}

		function removeStopWords(string) {
			var stopWords = ["Telugu", "Tamil", "Actress", "Acress", "CelebsNext", "Photoshoot", "Cinema", "Photos", "Photo", "Pictures", "Picture", "Tollywood", "Kollywood", "Movies", "Movie", "Latest", "Saree", "Gallery", "Dress", "Event", "Audio", "Stills", "Still", " hot ", "Navel", "Cleavage", "Boobs", "Exposing", "Desi ", "Heroin", "Images", "Wallpapers", "Wallpaper", "Cute", "Spicy", "New ", "Function", "Success Meet", "Teaser Launch", "Launch ", " Hot", "Press Meet", " Launch"];
			var rExp;
			stopWords.forEach(function (val, index) {
				rExp = new RegExp(val, "gi");
				string = string.replace(rExp, " ").trim();
			});
			string = string.replace(/\s+/g, " ").trim();
			return string;
		}

		/**
		 * Generates random color from the list whenever the page is refreshed.
		 * TODO: Add more colors to the list.
		 */
		$scope.ran_col = function () { //function name
			var color = '#'; // hexadecimal starting symbol
			var letters = ['000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0']; //Set your colors here
			color += letters[Math.floor(Math.random() * letters.length)];
			document.getElementById('page-title').style.background = color; // Setting the random color on your div element.
		}

	}]);


app.controller('dpNewCtrl', ['$scope', 'service.sites', 'service.util', 'settings', '$http', '$interval', 'service.post', 'service.url', 'service.auth', '$q',
	function ($scope, siteServ, utilServ, settings, $http, $interval, postService, urlService, authService, $q) {
		$scope.title = "Wordpress Page";
		$scope.sites = siteServ.sites;
		$scope.startIndex = settings.startIndex;
		$scope.totalItems = 0;
		$scope.allEntries = [];
		var wpSettings = {
			errCount: 50
		}
		var wordpressKeys = authService.wpKeys();
		$scope.postSiteList = wordpressKeys;
		console.log(wordpressKeys);
		var targetBlog = wordpressKeys[wordpressKeys.length - 1];
		var wpBlogId = targetBlog.id;
		var bearerToken = targetBlog.k;


		$scope.selectedSiteChanged = function(){
			
			var siteUrl = $scope.selectedSite;
			let temparr = _.where(wordpressKeys, { url : siteUrl});
			if(temparr.length > 0){
				console.log("POST BLOG CHANGED TO ", temparr[0].url)
				bearerToken = temparr[0].k;
				wpBlogId = temparr[0].id;
			}
		}


		/********************
		* refer $scope.postContent() function 
		******************** */

		/**
		 * Post content inside textarea to Wordpress.
		 * Single post creation.
		 */


		/**
		 * Function for file upload
		 * @param {*} event 
		 */
		function onChange(event){
			var reader = new FileReader();
			reader.onload = onReaderLoad;
			if(event.target.files.length < 0){
				console.log("ERROR >> file not selected");
				$('#errContainer').text("ERROR >> file not selected").css('color','red');
			}
			reader.readAsText(event.target.files[0]);
		}

		function onReaderLoad(event){
			try {
				var obj = JSON.parse(event.target.result);
				if(obj){
					if(typeof obj == 'object'){
						dumpImages(obj);
					}
				} else {	
					console.log("INVALID object");
				}
			} catch(e){
				console.log("ERROR >> ", e);
			}
		}

		$scope.postJson = function(){
			var el = document.getElementById('uploadFile');
			document.getElementById('uploadFile').addEventListener('change', onChange);
			var event = new CustomEvent('change', onChange);
			el.dispatchEvent(event);
		}

		var settings = {
			count: 0,
			start: 0,
			end: 0,
			errCount: 0,
			imageCount : 20
		};


		var generateDumpHtml = function(arr){
			if(arr){
				var str = "";
				arr.forEach(function(value, index){
					var imgTitle = getCleanTitleName(value);
					var src = value;
					str += `<div id='postContainer'><h2> ${imgTitle} </h2> <div id='picContainer'><img src='${src}' title='${imgTitle}' alt='photo' /></div>`;
				});
				return str;
			}
		}

		$scope.postContent = function(){
			//get file from data folder.
			$http({
				method : 'GET',
				url : $scope.fileName
			})
			.success(function(data){
				console.log("TOTAL COUNT", data.length);
				dumpImages(data);
			})
			.error(function(err){
				console.log("ERROR >> ", err);
			})
		}

		function dumpImages(arr){
			if(arr){
				var count = settings.count || 0;
				var start = settings.start || 0;
				var end = settings.end || 0;
				var errCount = settings.errCount || 0;
				end = arr.length;
				postDumpImages(arr, start, end, count, errCount);
			} else {
				console.log("ERROR >> Invalid array");
			}
		}

		function postDumpImages(arr, start, end, count, errCount){
			console.log("start:end:count:errCount", start, end, count, errCount);
			$scope.responseObj = JSON.stringify({
				"start" : start,
				"end" : end,
				"count" : count,
				"errCount" : errCount
			});
			if (start > end) {
				return;
			}
			if(arr[start].img){
				if(arr[start].img.length == 0){
					console.log("No images found in the list : incrementing")
					++start;
				}
			}

			var title = arr[start].title;
			var content = generateDumpHtml(arr[start].img);

			$http({
				method: 'POST',
				url: "https://public-api.wordpress.com/rest/v1/sites/" + wpBlogId + "/posts/new",
				data: {
					title: title,
					content: content
				},
				headers: {
					"Authorization": "Bearer " + bearerToken
				}
			}).success(function (data) {
				console.log("data : ", data);
				console.log("COUNT : " + ++count);
				$scope.wpPostResponse = data;
				

				postDumpImages(arr, ++start, end, count, errCount);

			}).error(function (err) {
				if (errCount > 20) {
					return;
				}
				console.log("ERROR >> " + err);
				console.log("COUNT : " + ++count);
				postDumpImages(arr, ++start, end, count, ++errCount);
			})
		}

		function randomIntFromInterval(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}


		/**
		 * Cleans title Name and returns the title.
		 */
		function getCleanTitleName(link) {
			var pathname = (new URL(link)).pathname;
			var filename = pathname.split("/").pop();
			filename = cleanFileName(filename);
			filename = removeStopWords(filename);
			return filename;
		}

		function cleanFileName(str) {
			str = decodeURIComponent(str);
			var suffix = "";
			var suffixMatch = str.match(/(\.jpg)|(\.png)/g);
			if (suffixMatch !== undefined && suffixMatch !== null) {
				suffix = suffixMatch[0];
			}
			str = str.replace(/(\.jpg)|(\.png)/g, " ");
			str = str.replace(/\W/g, " ");
			str = str.replace(/\_/g, " ");
			str = str.replace(/\s+/g, " ").trim();
			return str;
		}

		function removeStopWords(string) {
			var stopWords = ["Telugu", "Tamil", "Actress", "Acress", "CelebsNext", "Photoshoot", "Cinema", "Photos", "Photo", "Pictures", "Picture", "Tollywood", "Kollywood", "Movies", "Movie", "Latest", "Saree", "Gallery", "Dress", "Event", "Audio", "Stills", "Still", " hot ", "Navel", "Cleavage", "Boobs", "Exposing", "Desi ", "Heroin", "Images", "Wallpapers", "Wallpaper", "Cute", "Spicy", "New ", "Function", "Success Meet", "Teaser Launch", "Launch ", " Hot", "Press Meet", " Launch"];
			var rExp;
			stopWords.forEach(function (val, index) {
				rExp = new RegExp(val, "gi");
				string = string.replace(rExp, " ").trim();
			});
			string = string.replace(/\s+/g, " ").trim();
			return string;
		}

		/**
		 * Generates random color from the list whenever the page is refreshed.
		 * TODO: Add more colors to the list.
		 */
		$scope.ran_col = function () { //function name
			var color = '#'; // hexadecimal starting symbol
			var letters = ['000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0']; //Set your colors here
			color += letters[Math.floor(Math.random() * letters.length)];
			document.getElementById('page-title').style.background = color; // Setting the random color on your div element.
		}

	}]);


app.controller('dpImageCtrl', ["$scope","$stateParams", "service.util","service.post","$http", function($scope,$stateParams, utilService, postService, $http){

	var id = $stateParams.id !== undefined ? $stateParams.id : 'default';
	var postObj = _.filter(utilService.sessionBlog, function(obj) {
		return obj.id == id;
	});
	if(postObj.length > 0){
		postObj[0].images =  _.uniq(postObj[0].images);
	}
	$scope.postObj = postObj.length > 0 ? postObj[0] : [];

	$scope.postContent = postService.generatePostHTML($scope.postObj.images, $scope.postObj.title);

	$scope.publishPost = function(){
		// check for login information and post it to blogger site
		postService.login().then(function(data){
			postService.createPostRequest($scope.postObj, data).then(function(data){
				
				angular.element(document.querySelector('#divPostStatus')).text('POSTED');
				console.log(data);
			}, function(err){
				angular.element(document.querySelector('#divPostStatus')).text('ERROR');
				console.log(err);
			})
		}, function(err){
			console.log(err);
		})
	}

	$scope.goToUrl = function(){
		var url = $scope.postObj.link;
		var win = window.open(url, '_blank');
  		win.focus();
	}

	$scope.shareToGplus = function(){
		var url = "https://plus.google.com/share?url=".concat($scope.postObj.link);
		var win = window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		win.focus();
	}

	$scope.downloadAllImages = function(){
		$scope.postObj.images.forEach(function(value,index){
            var link = document.createElement('a');
            link.href = value;
            link.download = 'Download.jpg';
            document.body.appendChild(link);
            link.click();
		})
	}

	$scope.publishToWordpress = function(){
		// Change Bearer Token manually till you figure out the flow
		var bearerToken = "mja3FL5dcUVKeVF5!$u3IvE6SPZYuVfef)g9cr2Tm0is2F7FMvlCCs(PfWdI0&eP";

		var postUrl = "https://public-api.wordpress.com/rest/v1/sites/109226478/posts/new";
		var postTitle = $scope.postObj.title;
		var postContent = postService.generatePostHTML($scope.postObj.images, $scope.postObj.title);
		$http({
			method: 'POST',
			url : postUrl, 
			data : {
				title : postTitle,
				content : postContent
			},
			headers : {
				"Authorization" : "Bearer "+ bearerToken
			}
		}).success(function(data){
			//$('#wp-status').css('color','green').fadeOut(3000);
			console.log(data);
		}).error(function(err){
			console.log(err);
		})


	}

}]);		