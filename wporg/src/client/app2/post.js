import { PostUtil } from './util.post';

export class Post {
    constructor(obj) {
        this.id = obj.id;        
        this.images = PostUtil.getImages(obj.content);
        this.url = obj.url;
        this.thumb = PostUtil.getThumb(this.images[0]);
        this.title = obj.title;
        this.visible = false;
    }

    getImages() {
        return this.images;
    }

    getThumb() {
        return this.thumb;
    }

}