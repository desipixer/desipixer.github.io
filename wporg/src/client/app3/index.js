import axios from 'axios';
import { Blog } from './blog';
import { Post } from './post';
import { Settings } from './settings';
import { UrlUtil } from './util.url';
import { PostUtil } from './util.post';
import cheerio from 'cheerio';
//import VueRouter from 'vue-router';
//import router from 'vue-router';
//import Vue from 'vue';
//import Vue from 'vue';
var settings = Settings.getSettings();
var blog = new Blog(settings.defaultUrl, settings.pageNum, settings.perPage);

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
        getImages: function (id) {
            console.log(this.id);
            router.push({
                path: '/images/1'
            })
        }
    }
});

var imageContent = new Vue({
    data: {
        "images": [],
        "posts": []
    },
    el: '#myImages'
});



var nextButton = new Vue({
    data: {
        "myData": ""
    },
    el: '#btnNextPosts',
    methods: {
        getNext: function (event) {
            var pageNum = blog.getPageNum();
            pageNum++;
            //var reqUrl = UrlUtil.getWpPosts(blog.getUrl(), pageNum, settings.perPage);
            getWordpressObj(blog.getUrl(), pageNum);
            blog.setPageNum(pageNum);
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
            var pageNum = blog.getPageNum();
            if(pageNum > 1 ){
                pageNum--;
            } else {
                pageNum = 1;
            }
            
            //var reqUrl = UrlUtil.getWpPosts(blog.getUrl(), pageNum, settings.perPage);
            getWordpressObj(blog.getUrl(), pageNum);
            blog.setPageNum(pageNum);
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
                            blog = new Blog(mySite, 1, 10);
                            getWordpressObj(mySite, 1, 10);
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

/**
 * init the page here with default url.
 */
function init() {
    var reqUrl = UrlUtil.getWpPosts();
    //var defaultUrl = UrlUtil.getDefaultUrl();
    //https://moviegalleri.net/
    var defaultUrl = "http://www.cinejolly.com/";//"https://moviegalleri.net/";
    getWordpressObj(defaultUrl);

}


function parseUrl(myUrl) {
    //parse url
    try {
        var urlObj = new URL(myUrl);
        if (urlObj) {
            var requestUrl = urlObj.protocol + "//" + urlObj.hostname;
            console.log(requestUrl);
            return requestUrl;
        }
    } catch (ex) {
        console.log("EX ", ex);
    }
    return null;
}

function getWordpressObj(myUrl, pageNum = 1) {
    var parsedUrl = parseUrl(myUrl);
    if (parsedUrl) {
        //api url.
        var reqUrl = UrlUtil.getWpPosts(parsedUrl, pageNum++);
        axios.get(reqUrl).then((res) => {
            var data = res.data;
            if (data) {
                console.log(data);
                //iterate.
                var allImages = [];
                let allPostContent = [];
                data.forEach((v, i) => {
                    try {
                        var htmlContent = v.content.rendered;
                        var images = PostUtil.getImagesCheerio(htmlContent);
                        //console.log(images);
                        allImages = allImages.concat(images);
                        var postContent = {
                            title: v.title.rendered,
                            images: images,
                            link: v.link
                        }
                        allPostContent = allPostContent.concat(postContent);
                    } catch (e) {
                        console.log("ERR >> ", e);
                    }
                });

                imageContent.images = allImages;
                imageContent.posts = allPostContent;

            }
        }).catch((err) => {
            console.log("ERROR >>", err);
        });
    } else {
        console.log("ERROR >> Url in invalid format.");
    }
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

//main();
init();