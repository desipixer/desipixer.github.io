export class Blog {
    constructor(id, url) {
        this.id = id;
        this.url = url;
        this.posts = [];
        this.nextPageToken = null;
        this.prevPageToken = null;
    }

    getBlogId() {
        return this.id;
    }

    getBlogUrl() {
        return this.url;
    }

    getBlogPosts() {
        return this.posts;
    }

    setBlogPosts(posts) {
        this.posts = posts;
    }

    getBlogNextToken() {
        return this.nextPageToken;
    }

    setBlogNextToken(token){
        this.nextPageToken = token;
    }

    getBlogPrevToken() {
        return this.prevPageToken;
    }

    setBlogPrevToken(token){
        this.prevPageToken = token;
    }
}