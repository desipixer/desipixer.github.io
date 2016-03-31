/* all http based calls are placed here */
app.service('dp.service.http', ['$http','$q', 'dp.service.url', 'settings', function($http, $q, urlService, settings ){

	var getBlogById = function(id, startIndex, maxResults, searchText){
		var deferred = $q.defer();
		var reqURL = urlService.getBlogFeedUrl(id, startIndex, maxResults, searchText);
		$http.jsonp(reqURL).success(function(data){
			deferred.resolve(data);
		});
		return deferred.promise;
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
		getBlogById : getBlogById,
		publishPost : publishPost
	}

}]);