import { GPost } from './GPost';
import { BPost} from './BPost';

export class BBlog {
    constructor(name, result) {
        this.name = name;
        this.entry = [];
        this.result = result;
        this.GEntry = [];
    }

    getPosts() {
        var _this = this;
        var entry = this.entry;
        return entry;
    }

    getCleanPosts() {
        var _this = this;
        var entry = _this.result.items;
        _this.entry = entry;
        if (entry) {
            entry.forEach(element => {
                _this.GEntry.push(BPost.createPost(element));
            })
        };
        return _this.GEntry;
    }

}