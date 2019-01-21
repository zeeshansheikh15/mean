var express         = require('express');
var app             = express();
var port            = process.env.PORT || 8080;
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var router          = express.Router();
var appRoutes       = require('./app/routes/api')(router);
var path            = require('path');
var passport        = require('passport');
var facebook        = require('./app/passport/passport')(app, passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://zee1993:zee1993@ds257314.mlab.com:57314/zeesite', function (err) {
    if(err){
        console.log('nope');
    }else{
        console.log('yess');
    }
});
//
// app.get('/home',function (req, res) {
//     res.send('hello this is home');
// });

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function () {
    console.log('Restarted '+port);
});