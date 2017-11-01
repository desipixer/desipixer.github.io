//globals.js

/**
 * Contains all global variables in this function
 * integrated icaro library which monitors urlArray change.
 */
app.service('globals', function(){
    
    var obj = {};//icaro({});
    obj.count = 0;
    // obj.listen(function(changes){
    //     ++obj.count;
    //     console.log("POSTED,COUNT : ", obj.count);
    // });

    var imgArray = [];
    obj.urlArray = [];

    return {
        imgArray : imgArray,
        urlArray : obj.urlArray,
        postCount : 0
    }

});