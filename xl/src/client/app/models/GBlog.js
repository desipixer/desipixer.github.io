import { GPost } from './GPost';

export class GBlog {
    constructor(name, result) {
        this.name = name;
        this.entry = [];
        this.result = result;
        this.GEntry = [];
    }

    getPosts() {
        var _this = this;
        var entry = _this.result.feed.entry;
        _this.entry = entry;
        if (entry) {
            entry.forEach(element => {
                _this.GEntry.push(GPost.getCleanPost(element));
            })
        };
        return entry;
    }

    getCleanPosts() {
        var _this = this;
        var entry = _this.result.feed.entry;
        _this.entry = entry;
        if (entry) {
            entry.forEach(element => {
                _this.GEntry.push(GPost.getCleanPost(element));
            })
        };
        return _this.GEntry;
    }

}