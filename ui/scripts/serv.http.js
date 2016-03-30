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


	return {
		getBlogById : getBlogById
	}

}]);