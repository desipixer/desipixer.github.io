

var request = require('request'),
    async = require('async');

var settings  = {
    "url.base" : "",
    "url.extension" : "",
    "url.start" : "",
    "async.threads" : ""
};

var app = {
    "err.count" : 0
}


var fetchBaseUrl = function(){
    request(settings["url.base"], function(err, response, body){
        if(!err){
            console.log("ERROR >> "+ err)
            ++app["err.count"];
            return;    
        } else {
            console.log("requested url : "+ settings['url.base'], response.statusCode);

        }

    });
}


