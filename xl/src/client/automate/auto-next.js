//for url http://127.0.0.1:8080/


var settings = {
    INTERVAL : 4000,
    currentIndex : 0
};

var nextBtn = document.getElementById('nextBtn');


var counter = 0;

var timer = setInterval(function(){
    counter++;
    console.log("Current index : ", counter );

    nextBtn.click();
    
}, settings.INTERVAL);


//clearInterval(timer);