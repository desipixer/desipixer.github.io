// each GoogleAPI post might have the following.

export class BPost {
    constructor(obj, type = 0) {
        this.obj = obj;
        this.type = type;
    }

    static getImages(htmlContent) {
        var imgArray = [];
        var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
        if (imgTags != undefined && imgTags.length > 0) {
            imgTags.forEach(function (img, i) {
                var imgURL = img.match(/(https?:\/\/.*\.(?:png|jpg))/ig);
                if (imgURL != undefined && imgURL.length > 0) {
                    /* get large images if it is a blogger site images */
                    if (imgURL[0].indexOf("bp.blogspot.com") !== -1) {
                        var imgSplit = imgURL[0].split('/');
                        var imgRes = imgSplit.splice(imgSplit.length - 2, 1);
                        let largeIMG = imgURL[0].replace(imgRes, "s1600");
                        imgArray.push(largeIMG);
                    }
                }
            });
        }
        return imgArray;
    }

    static createPost(obj){
        return {
            "id" : obj.id + "-"+ obj.blog.id,
            "url" : obj.url,
            "images" : this.getImages(obj.content),
            "title" : obj.title
        }
    }


    static getCleanPost(obj) {
        let id = obj.id.$t;
        let content = obj.content.$t;
        let title = obj.title.$t;
        let images = this.getImages(content);
        let thumb = (images != null) ? images[0].replace("s1600","s320") : null;

        return {
            id: id,
            content: content,
            title: title,
            images : images,
            thumb : thumb
        }
    }

    getContent() {
        let _this = this;
        let content = _this.obj.content.$t;
        return content;
    }
}