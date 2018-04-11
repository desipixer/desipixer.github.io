var express = require('express');
var app = express();

app.use(express.static(__dirname));

var PORT_NUMBER = 5678;
app.listen(PORT_NUMBER);

console.log("successfully started in port : "+ 5678);