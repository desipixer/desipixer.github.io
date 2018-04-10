// service.post.js
app.service('postService', ['loginService', 'authService', function (loginService, authUtil) {

    function getPostUrl(blogId) {
        return `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;
    }

    function getWpPostUrl(wpId) {
        return `https://public-api.wordpress.com/rest/v1/sites/${wpId}/posts/new`
    }

    this.postFunction = function (postObject) {
        var title = postObject.postTitle + " ★ Desipixer  ★";
        var content = postObject.postContent;
        var blogId = postObject.blogId;
        loginService.getToken().then(function (data) {
            var authToken = data.access_token;
            var headers = {
                "headers": {
                    'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/json'
                }
            }
            var postBlogId = postObject.blogId;
            var postUrl = getPostUrl(postBlogId);
            axios.post(postUrl, {
                "content": content,
                "title": title
            }, headers).then(function (res) {
                console.log(res.data);
                $('#responseCode').show().css('color', 'green').text('POSTED').fadeOut(4000);
            }).catch(function (err) {
                console.log("error ", err);
                $('#responseCode').show().css('color', 'red').text('ERROR').fadeOut(4000);
            });
        });


    }

    this.postWp = function (title, content) {
        var t = authUtil.getToken();
        var wpId = authUtil.getWpId();
        var postUrl = getWpPostUrl(wpId);
        var data = {
            title: title,
            content: content
        };
        var headers = {
            "headers": {
                "Authorization": "Bearer " + t
            }
        }
        axios
            .post(postUrl, data, headers)
            .then(function (res) {
                console.log("POSTED TO Wordpress ", res.data);
            }).catch(function (err) {
                console.log("ERROR >> Error posting to wordpress", err);
            });
    }

    var getPostHTML = function (obj) {
        var imageArray = obj.images;
        var imageSrc = "";

        imageArray.forEach(function (element, index) {
            imageSrc = imageSrc + "<a href='" + element + "'  target='_blank'><img src='" + element + "' class='desipixer' title='Desi Actress Pictures and Photos, Latest' alt='desipixer' /></a>";
        });
        return imageSrc;
    }



    return {
        postFunction: this.postFunction,
        postWp: this.postWp,
        getPostHTML: getPostHTML
    }

}]);