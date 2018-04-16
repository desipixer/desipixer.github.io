//total wordpress items to post.
var els = document.getElementsByClassName('postContentButton');
var totalItems = els.length || 10;
console.log("TOTAL ITEMS -- ", totalItems);
 
var counter = 0;
//var counter = totalItems - 3;
var i = 0;
var timer = null;
var settings = {
    INTERVAL : 3000,
    isSequential : false,
    postedIndex : 0
};
 
timer = setInterval(function(){
    if(settings.isSequential == true){
        i = counter;
    } else {
        i = getRandomNumber(0, totalItems - 1);
    }
    counter++;
    console.log("Current Element : ", i , " of Total : ", totalItems, ", Current Posted Index : ", ++settings.postedIndex);
    if(settings.postedIndex > 150 || settings.postedIndex > totalItems){
        console.log("COMPLETED POST : SUCCESS")
        cancelTask(timer);
    }
    clicker(i);
}, settings.INTERVAL);
 
 
 
function clicker(i){
    try {
        var spanEl = els[i];
        var ch = spanEl.children;

        if(ch.length != 0){
            var btn = ch[0];
            btn.click();
        }
    } catch(e){
        console.log("ERROR >> ", e);
    }  
}
 
function cancelTask(t){
    t = t || timer;
    console.log("CANCEL TASK INITIATED --")
    clearInterval(t);
}
 
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}