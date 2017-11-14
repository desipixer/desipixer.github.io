app.service('wpService', function($http){

    var postQueue = [];
    var config = {
        quality : 95
    }

    var wp = {
        id : "138616770",
        url : "http://p77desipixer.wordpress.com",
        t : "Gyqi^V@zQRSf93T$8cUC0k3P%4R$A1FvRJ7t2e0R*AQF@HVHpg^Ozu(^1d0!KdJk"
    }

    function postEntry(entry){
        $http({
            method: 'POST',
            url: "https://public-api.wordpress.com/rest/v1/sites/" + wp.id + "/posts/new",
            data: {
                title: entry.title,
                content: generatePostHtml(entry)
            },
            headers: {
                "Authorization": "Bearer " + wp.t
            }
        }).success(function (data) {
            console.log("data : ", data);
        }).error(function (err) {
            console.log("ERROR >> " + err);
        })
    }

    function generatePostHtml(entry){
        if(entry){
            if(entry.src){
                var src = getPhotonUrl(entry.src);
                var str = `<div><img src='${src}' title='${entry.title}' alt='${entry.title}' /><div>`;
                return str;
            }
        }
    }

    function getPhotonUrl(req){
        if(req){
            var quality = config.quality || 100;
            var protocol = new URL(req).protocol;
            var photonProtocol = ["https://i0.wp.com/","https://i1.wp.com/","https://i2.wp.com/"];
            //TODO: Randomize protocol selection.
            req = photonProtocol[0] + req.replace(protocol+"//", "");
            return req + "?" + "quality="+ quality;
        }
        return null;
    }
    

    return {
        postEntry : postEntry
    }
});