/* all http based calls are placed here */
app.service('dp.service.http', ['$http','$q', 'dp.service.url', 'settings', function($http, $q, urlService, settings ){


	var getDefaultBlog = function(){
		var deferred = $q.defer();
		var reqURL = urlService.getFeedUrlFromBlogId(settings.default.id, settings.startIndex, settings.maxResults);
		$http.jsonp(reqURL).success(function(data){
			deferred.resolve(data);
		})
		return deferred.promise;
	}

	var getSelectedBlog = function(id){
		var deferred = $q.defer();
		var reqURL = urlService.getFeedUrlFromBlogId(id, settings.startIndex, settings.maxResults);
		$http.jsonp(reqURL).success(function(data){
			deferred.resolve(data);
		})
		return deferred.promise;
	}

	var searchText = function(id, searchText){
		var deferred = $q.defer();
		var reqURL = urlService.getFeedSearchUrl(id, searchText);
		$http.jsonp(reqURL).success(function(data){
			deferred.resolve(data);
		})
		return deferred.promise; 
	}

	return {
		getDefaultBlog : getDefaultBlog,
		getSelectedBlog : getSelectedBlog,
		searchText : searchText
	}

}]);