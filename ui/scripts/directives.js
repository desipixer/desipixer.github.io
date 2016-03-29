/* contains important directives */

app.directive('selectSite', function(){
	
});


app.directive('helloWorld', function(){
	return {
		restrict : 'AE',
		template : '<div> Hello World </div>',
		replace : true
	}
})


app.directive('autoComplete', function(){
	return {
		restrict : 'AE',
		replace : true,
		link : function(scope,elem, attrs){
			elem.bind('change', function(){
				
			})
		}
	}
})