/* service to handle all wordpress related posts */

app.service('dp.service.wordpress', ['dp.service.auth', 'settings', function(authService, settings){

	var wpcom = WPCOM();
	var blog = wpcom.site(settings.wordpress.sitename);

	var params = {
		id : "",
		name : "",
		dateAccessed : ""
	}

	var createPost = function(title,content){

	}

	var getPosts = function(num){
		return blog.postsList({ number : num });
	}



}])