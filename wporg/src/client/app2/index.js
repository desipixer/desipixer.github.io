import axios from 'axios';
import { Blog } from './blog';
import { Post } from './post';
import { Settings } from './settings';
import { UrlUtil } from './util.url';
import { PostUtil } from './util.post';
//import VueRouter from 'vue-router';
//import router from 'vue-router';
//import Vue from 'vue';
//import Vue from 'vue';
var settings = Settings.getSettings();
var blog = new Blog(settings.id, null);

// init vue components
var postComponent = new Vue({
    data: {
        "blogData": []
    },
    el: '#myPosts',
    methods: {
        showTitle: function () {
            console.log(this.title);
        },
        getImages : function(id){
            console.log(this.id);
            router.push({
                path : '/images/1'
            })
        }
    }
});

var nextButton = new Vue({
    data: {
        "myData": ""
    },
    el: '#btnNextPosts',
    methods: {
        getNext: function (event) {
            var reqUrl = UrlUtil.getGoogleApiUrl(blog.id, settings.key, settings.maxResults, blog.getBlogNextToken());
            axios.get(reqUrl).then(function (res) {
                blog.setBlogPrevToken(blog.getBlogNextToken());
                blog.setBlogNextToken(res.data.nextPageToken);
                populateData(res.data);
            });
        }
    }
});

var prevButton = new Vue({
    data: {
        "myData": ""
    },
    el: '#btnPrevPosts',
    methods: {
        getPrev: function (event) {
            var reqUrl = UrlUtil.getGoogleApiUrl(blog.id, settings.key, settings.maxResults, blog.getBlogPrevToken());
            axios.get(reqUrl).then(function (res) {
                //blog.setBlogPrevToken(blog.getBlogNextToken());
                blog.setBlogNextToken(res.data.nextPageToken);
                populateData(res.data);
            });
        }
    }
});

const ImageRoute = {
    template: '<div> aaa {{ $route.params.id }} </div>'
}

const router = new VueRouter({
    routes: [
        {
            path: '/images/:id',
            component: ImageRoute
        }
    ]
});



var getSiteBtn = new Vue({
    el: '#myPostsId',
    methods: {
        getSite: function () {
            //get value of siteName
            let siteName = document.getElementById('siteName');
            if (siteName) {
                let val = siteName.value;
                if (val) {
                    try {
                        var myUrl = new URL(val);
                        if (myUrl.hostname) {
                            // full sitename;
                            var mySite = myUrl.protocol + "//" + myUrl.hostname;
                            console.log(mySite);
                            getBlogId(mySite);
                        }
                    } catch (ex) {
                        //error
                    }
                } else {
                    // error.
                }

            }
        }
    }
})


function main() {
    let settings = Settings.getSettings();


    var reqUrl = UrlUtil.getGoogleApiUrl();
    axios.get(reqUrl).then((res) => {
        console.log(res.status);

        console.log(res.data);
        // set next page token.
        blog.setBlogNextToken(res.data.nextPageToken);
        populateData(res.data);

    });

}


function populateData(data) {
    var rawEntry = data.items;
    var postData = [];
    if (rawEntry) {
        console.log(rawEntry);
        rawEntry.forEach((v, i) => {
            var blogPost = new Post(v);
            postData.push(blogPost);
        });

        updatePostsContent(postData);


    }
}

function updatePostsContent(data) {
    postComponent.blogData = data;
}

function getBlogId(blogUrl) {
    var reqUrl = UrlUtil.getBlogIdByUrl(blogUrl);
    return axios.get(reqUrl).then((res) => {
        console.log(res.data);
        var data = res.data;
        blog = new Blog(data.id, data.url);
        reqUrl = UrlUtil.getGoogleApiUrl(data.id, settings.key, settings.maxResults, null);
        axios.get(reqUrl).then((res) => {
            console.log(res.status);
            //debugger;
            console.log(res.data);
            // set next page token.
            blog.setBlogNextToken(res.data.nextPageToken);
            populateData(res.data);

        });
    });
}

const app = new Vue({ router }).$mount('#app')

main();