var express         = require('express');
var app             = express();
var port            = process.env.PORT || 8080;
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var router          = express.Router();
var appRoutes       = require('./app/routes/api')(router);
var path            = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/mean', function (err) {
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