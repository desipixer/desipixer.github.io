var express        = require('express');
var app            = express();


/* static webpage */
app.use(express.static(__dirname+'/main')); 
var PORT_NUM = 3334;
app.listen(PORT_NUM);
console.log("App listening on port "+PORT_NUM);


