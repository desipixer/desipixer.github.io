
export class urlutil {
    constructor(name) {
        
    }

    getBlogPosts(blogId, maxResults){
        var feedUrl = getGoogleApiUrl(blogId, null, 500);
        return axios.get(feedUrl);
    }

    getAllBlogPosts(){
        
    }


    static getGoogleApiUrl(blogId = '4985646326158465936', key = 'AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE', maxResults = 10){
        return `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?fetchImages=true&key=${key}&maxResults=${maxResults}`;
    }

    static getWpFeed(wpId = ""){
        return ``;
    }

    static getWpSites(wpSiteName = "www.glamistan.com"){
        return `https://public-api.wordpress.com/rest/v1.1/sites/${wpSiteName}`
    }
    

}