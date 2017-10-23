app.service('service.util', ['config', function (config) {

    /**
     * Parses HTML String and gets blogspot URL.
     */
    function getImageFromHtml(htmlContent) {
        try {
            var imgArr = [];
            var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
            if (imgTags != undefined && imgTags.length > 0) {
                for (var i = 0; i < imgTags.length; i++) {
                    var imgURL = imgTags[i].match(/(https?:\/\/.*\.(?:png|jpg))/ig);
                    if (imgURL != undefined && imgURL.length > 0) {
                        var picURL = imgURL[0];
                        if (picURL.indexOf('blogspot.com')) {
                            var splitter = picURL.split("/")[7];
                            picURL = picURL.replace(splitter, "s1600");
                            imgArr.push(picURL);
                        } else {
                            if(config.includeAllImages == true){
                                imgArr.push(picURL);
                            }
                            
                        }
                    }
                }
            }
            return imgArr;
        } catch (ex) {
            console.log("ERROR >> getImageFromHtml ", ex);
            return [];
        }
    }

    /**
     * Get wordpress post content string 
     * @param {*} title 
     * @param {*} imgArr 
     */
    function wpContentHtml(title,imgArr){
        try {
            if(title && imgArr){
                let str = `<div><div id='wpTitle'> ${title} </div>`;
                str += `<div id='imgContainer'>`
                imgArr.forEach(function(val,i){
                    str += `<div id='imgDp'> <img src='${val}' alt='photo' /></div>`;
                });
                str += `</div>`;
                return str;
            }
        } catch(ex){
            console.log("ERROR >> wpContentHtml ",ex);
            return "";
        }
    }

    

    return {
        wpContentHtml : wpContentHtml,
        getImageFromHtml : getImageFromHtml
    }
}]);