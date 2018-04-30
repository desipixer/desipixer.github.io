import cheerio from 'cheerio';

export class PostUtil {
    constructor() {

    }

    static getImages(htmlContent) {
        var imgArr = [];
        var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
        if (imgTags != undefined && imgTags.length > 0) {
            for (var i = 0; i < imgTags.length; i++) {
                var imgURL = imgTags[i].match(/(https?:\/\/.*\.(?:png|jpg))/);
                if (imgURL != undefined && imgURL.length > 0) {
                    var picURL = imgURL[0];
                    imgArr.push(picURL);
                }
            }
        }
        return imgArr;
    }

    static getImagesCheerio(htmlContent){
        if(!htmlContent){
            return []
        }
        var images = [];
        var $ = cheerio.load(htmlContent);
        $('img').each(function(index,value) {
            var src = $(this).attr('src');
            images.push(src);
        });
        return images;
    }

    static getThumb(imgUrl){
        if(imgUrl){
            imgUrl = imgUrl.replace(/s1600/gi,"s480");
            return imgUrl;
        }
        return "";
    }

}