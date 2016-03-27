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