export class WpBlog {
    constructor(id, url, posts){
        this.id = id;
        this.url = url;
        this.posts = [];
        this.totalPosts = 0;
    }

    setPosts(posts){
        let _this = this;
        _this.posts = posts;
    }

    setTotalPosts(count){
        this.totalPosts = count;
    }

    getTotalPosts(){
        return this.totalPosts;
    }



}