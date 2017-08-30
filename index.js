var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const regRoutes = require('./reg');
const mongoose = require('mongoose');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/RegistrationPlates')
const routes = regRoutes(models);
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static('public'));
app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));

app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
    res.render('index');
})


app.get('/index',routes.addReg );
app.post('/index',routes.addReg);
app.get('/index/search',routes.searchScreen );
app.post('/index/search',routes.filterReg);
app.get('/reset',routes.clear );
app.post('/reset',routes.clear);



// app.get('/reg/:reg', function(req, res){
//
//   var regNumber = req.params.reg
//     res.send(regNumber)
// })


var server = app.listen(3011, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening on port 3011!')
})
