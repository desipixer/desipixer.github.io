import axios from 'axios';
import { Blog } from './blog';
import { Post } from './post';
import { Settings } from './settings';
import { UrlUtil } from './util.url';
import { PostUtil } from './util.post';
import cheerio from 'cheerio';
var settings = Settings.getSettings();
var blog = new Blog(settings.defaultUrl, settings.pageNum, settings.perPage);



var imageContent = new Vue({
    data: {
        "images": [],
        "posts": [],
        "showLinks" : false
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

var checkBoxFullResolution = new Vue({
    el : '#showFullResolution',
    data : {

    },
    methods : {
        makeChange : function(){
            var pageNum = blog.getPageNum()
            getWordpressObj(blog.getUrl(), pageNum);
        }
    }
});

var showLinksCheckBox = new Vue({
    el : '#showLinksCheckBox',
    data : {

    },
    methods : {
        showLinks : function(){
            imageContent.showLinks = !imageContent.showLinks;
            var pageNum = blog.getPageNum();
            getWordpressObj(blog.getUrl(), pageNum);
        }
    }
})

function isFullResolutionChecked(){
    //
    let isChecked = document.getElementById('showFullResolution').checked;
    console.log(isChecked);
    return isChecked;
}


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


/**
 * init the page here with default url.
 */
function init() {
    var defaultUrl = settings.defaultUrl;
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
                        var postTitle = v.title.rendered;
                        if(postTitle && postTitle.indexOf('Desipixer') == -1){
                            postTitle += " ★ Desipixer ★";
                        }
                        var images = PostUtil.getImagesCheerio(htmlContent);
                        let isFullResolution = isFullResolutionChecked();
                        if(isFullResolution == true){
                            images = images.map(x => PostUtil.replaceStringWp(x));
                        }
                        allImages = allImages.concat(images);
                        var postContent = {
                            title: postTitle,
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
init();