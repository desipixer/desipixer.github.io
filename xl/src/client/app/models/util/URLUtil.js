/**
 * https://www.googleapis.com/blogger/v3/blogs/4985646326158465936/posts?fetchImages=true&key=AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE&maxResults=500
 * https://www.googleapis.com/blogger/v3/blogs/4985646326158465936/posts?fetchImages=true&key=AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE&maxResults=500
 * https://www.googleapis.com/blogger/v3/blogs/byurl?key=AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po&url=http://www.tollywoodblog.in/
 * 
 **/


//import { GPost } from './GPost';
import axios from 'axios';


export class URLUtil {
    constructor(name) {
        
    }

    getBlogPosts(blogId, maxResults){
        var feedUrl = getGoogleApiUrl(blogId, null, 500);
        return axios.get(feedUrl);
    }

    getAllBlogPosts(){
        
    }


    getGoogleApiUrl(blogId = '4985646326158465936', key = 'AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE', maxResults = 500){
        return `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?fetchImages=true&key=${key}&maxResults=${maxResults}`;
    }
    

}