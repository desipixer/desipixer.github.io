app.service('blogService',function(){
	var entries = [];
	var startIndex = 0;
	var totalItems = 0;
	var blogID = null;

	var service = {
		startIndex : 0,
		totalItems : 0,
		currBlogID : 0
	}

	var currBlog = {
		blogID : null,
		blogName : null,
		startIndex : 0,
		totalItems : 0,
		labels : []
	}



})



app.service('authServices',function(){
	this.k = "AIzaSyCIEuVxD1SFWMNBTtc24gBtuVExstlSGEQ",
})


app.service('remoteServ',function($q){
	/* @input : give website name */
	this.getBlogID = function(name){
		var deferred = $q.defer;
		var apiURL = "https://www.googleapis.com/blogger/v3/blogs/byurl?key=AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po&url=" + blogName;
    	$http.get(apiURL).success(function(data){
			
	   	})
    }
})