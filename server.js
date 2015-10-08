var express        = require('express');
var app            = express();


/* static webpage */
app.use(express.static(__dirname)); 
app.listen(3000);
console.log("App listening on port 3000");


