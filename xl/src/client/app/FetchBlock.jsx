import React from 'react';
import { render } from 'react-dom';
import * as axios from 'axios';
import * as superagent from 'superagent';
import fetchJsonp from 'fetch-jsonp';
import { GBlog } from './models/GBlog';

export default class FetchBlock extends React.Component {
    constructor(props) {
        super(props);
        this.getSite = this.getSite.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPreviousPosts = this.getPreviousPosts.bind(this);
        this.getNextPosts = this.getNextPosts.bind(this);
        this.state = {
            textBoxVal: "https://desipixer.blogspot.com/",
            posts: [],
            imagesLoaded: false,
            startIndex : 1,
            maxResults : 300,
            currentIndex : 1
        }
    }

    getSite() {
        let siteName = this.state.textBoxVal;
        var _this = this;
        try {
            let myUrlObj = new URL(siteName);
            let hostname = myUrlObj.hostname;
            console.log(hostname);
            let currentIndex = this.state.currentIndex;
            let maxResults = this.state.maxResults;
            console.log(currentIndex);
            fetchJsonp(this.getBlogFeedUrl(null, currentIndex, maxResults))
                .then(function (response) {
                    return response.json()
                }).then(function (json) {
                    //console.log('parsed json', json)

                    var blog = new GBlog(siteName, json);
                    var posts = blog.getPosts();
                    var cleanPosts = blog.getCleanPosts();
                    console.log("clean posts : ", cleanPosts);
                    _this.setState({
                        posts: cleanPosts,
                        imagesLoaded: true
                    })


                }).catch(function (ex) {
                    console.log('parsing failed', ex)
                });
        } catch (e) {
            console.log("ERROR >> ", e);
        }
    }

    getFeedUrl(blogName) {
        let key = 'AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po';
        return `https://www.googleapis.com/blogger/v3/blogs/byurl?key=${key}&url=${blogName}`
    }

    getBlogFeedUrl(blogId = '7833828309523986982', startIndex = 1, maxResults = 10) {
        blogId = blogId == null ? '7833828309523986982' : blogId;
        return `https://www.blogger.com/feeds/${blogId}/posts/default?start-index=${startIndex}&max-results=${maxResults}&alt=json`;
    }

    getPreviousPosts(){
        let currentIndex  = this.state.currentIndex;
        currentIndex = currentIndex - this.state.maxResults
        if(currentIndex < 0){
            currentIndex = 1;
        }
        this.setState({
            currentIndex : currentIndex
        });
        this.getSite();
    }

    getNextPosts() {
        let currentIndex  = this.state.currentIndex;
        currentIndex = currentIndex + this.state.maxResults
        this.setState({
            currentIndex : currentIndex
        });
        this.getSite();
    }

    handleChange(evt) {
        this.setState({ textBoxVal: evt.target.value.substr(0, 100) });
    }

    render() {
        var textBoxStyle = {
            width : "400px"
        }
        if (this.state.imagesLoaded == true) {
            return (
                <div>
                    <input type="text" id="txtSiteId" value={this.state.textBoxVal} onChange={this.handleChange} autoFocus="autofocus" style={textBoxStyle} />
                    <button id='btnSiteId' className="btn btn-primary" onClick={this.getSite}>GET</button>
                    <button id="btnPrev" onClick={this.getPreviousPosts} > PREV </button>

                    <button id="btnNext" onClick={this.getNextPosts} > NEXT </button>
                    <div>
                        {
                            this.state.posts.map((val, ind) => {
                                return <img src={val.thumb} width="240px" height="320px" key={ind} title={val.title + " "+ ind } alt="image" />
                            })
                        }
                    </div>
                </div>
            )
        }
        return (
            <div>
                <input type="text" id="txtSiteId" value={this.state.textBoxVal} onChange={this.handleChange} autoFocus="autofocus" style={textBoxStyle} />
                <button id='btnSiteId' className="btn btn-primary" onClick={this.getSite}>GET</button>

            </div>
        )
    }
}