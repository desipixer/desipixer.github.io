/* services for the app goes here */
app.service('dp.service.site', function(){

	/* returns default list of sites */
	var defaultSiteList = [
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
		}
	];

	var blog = {};

	return {
		defaultSiteList : defaultSiteList,
		blog : blog
	}
})