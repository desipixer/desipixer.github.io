export class UrlUtil {
    constructor(){

    }

    static getWpPosts(hostUrl = "http://www.mycelebrity.eu/", pagenum = 1, perPage = 10){
        return `${hostUrl}/wp-json/wp/v2/posts?page=${pagenum}&per_page=${perPage}`;
    }

    static getGoogleApiUrl(blogId = '4985646326158465936', key = 'AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE', maxResults = 100, nextPageToken = null){
        var reqUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?fetchImages=true&key=${key}&maxResults=${maxResults}`;

        if(nextPageToken){
            reqUrl += `&pageToken=${nextPageToken}`;
        }
        return reqUrl;
    }

    
    static getBlogIdByUrl(blogUrl, key="AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE"){
        if(!blogUrl){
            //error.
            return;
        }
        return `https://www.googleapis.com/blogger/v3/blogs/byurl?key=${key}&url=${blogUrl}`
    }

    static getDefaultUrl(){
        return "http://www.mycelebrity.eu/";
    }

}

