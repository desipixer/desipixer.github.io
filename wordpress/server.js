var express = require('express'),
    app = new express();

app.use(express.static(__dirname + '/dist'));
var PORT_NUM = 2233;
app.listen(PORT_NUM);

console.log("Application running successfully at "+ PORT_NUM);