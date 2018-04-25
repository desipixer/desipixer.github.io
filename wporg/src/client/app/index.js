import axios from 'axios';
import { urlutil } from './util.url';
import { WpBlog } from './wpBlog';
import {globals} from './globals';

function main() {
    var postsLink = "";
    var settings = globals.getGlobals();
    let wpBlog = new WpBlog(null, null, null);
    //get url from google api.
    var reqUrl = urlutil.getWpSites();
    axios.get(reqUrl)
        .then((res) => {
            let data = res.data;
            if (data) {
                wpBlog = new WpBlog(data.ID, data.URL, []);
                console.log(wpBlog);
                let meta = data.meta;
                if (meta) {
                    let links = meta.links;
                    if (links) {
                        postsLink = links.posts;
                        //console.log("posts link : ", postsLink)
                    }
                }
            }
        }).then(function(res) {
            // now get all posts.
            console.log("posts link : ", postsLink);
            
            axios.get(postsLink).then((res) => {
                let data = res.data;
                if(data){
                    console.log(data);
                    // get total posts
                    let totalPosts = wpBlog.getTotalPosts();
                    console.log(totalPosts);

                    // set total posts now.
                    wpBlog.setTotalPosts(data.found);
                    totalPosts = wpBlog.getTotalPosts();
                    console.log(totalPosts);
                }
                //console.log(res.data);
                
            });

        })
        .catch((err) => {
            console.log("err : ", err);
        });



}

main();