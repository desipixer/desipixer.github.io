/* settings stored here */

app.service('settings', function(){
	return {
		default : {
			id : "7833828309523986982",
			name : "http://desipixer.in",
			maxResults : 150,
			startIndex : 1
		},
		maxResults : 150,
		startIndex : 1,
		wordpress : {
			sitename : 'http://desipixer.wordpress.com'
		}
	}
})