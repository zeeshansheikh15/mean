var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = "zeeshan";

module.exports =function(router){

    router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    if(req.body.username == null || req.body.username == "" || req.body.email == null || req.body.email == "" ||req.body.password == null || req.body.password == "" ){
        res.json({ message:'Username, email and password not provided'});
    }else {
        user.save(function (err) {

            if (err) {
                res.json({message: 'Username or Email already exists', error: err});
                console.log(err.message);
            } else {
                res.json({created: true, message:'user created'});
            }
        });
    }
    });

    router.post('/login', function (req, res) {
        if(req.body.email == null || req.body.email == "" ||req.body.password == null || req.body.password == "" ){
            res.json({message:'Email and password not provided'});
        }else {
            User.findOne({email: req.body.email}).select('email username password').exec(function (err, user) {
                if (err) {
                    res.json({ message: error});
                }
                if (!user) {
                    res.json({ message: 'User not found'});
                } else if (user) {
                    var pass = user.validPassword(req.body.password);
                    if (!pass) {
                        res.json({message: 'Invalid Password'});
                    } else {
                        var jwtoken = jwt.sign({ user:user.username, email: user.email }, secret, { expiresIn: '1h'});

                        res.json({valid: true, message: 'Welcome!!!', token: jwtoken, user : user})
                    }
                }
            });
        }
    });

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }
    });

    router.post('/getuserdet', function(req, res) {
        res.send(req.decoded);
    });

    //
    //
    // router.post('/getuser/:usern', function (req, res) {
    //     console.log(req.params.usern);
    //     if(req.params.usern == null){
    //           res.json({message:'Email and password not provided'});
    //     }else {
    //         User.findOne({username: req.params.usern}).select('email username password').exec(function (err, user) {
    //             if (err) {
    //                 res.json({ message: error});
    //             }
    //             if (!user) {
    //                 res.json({ message: 'User not found', username: req.params.usern });
    //             } else if (user) {
    //                  res.json({valid: true, message: 'Welcome!!!',user : user})
    //                 }
    //
    //         });
    //     }
    // });

    router.post('/weather', function (req, res) {
        var city = req.body.city;
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';
        request(url, function (err, response, body) {
            if(err){
                res.json({weather: null, error: 'Error, please try again'});
            } else {
                var weather = JSON.parse(body)
                if(weather.main == undefined){
                    res.json({weather: null, error: 'Error, please try again'});
                } else {
                    res.json({weather: weather, error: null});
                }
            }
        });
    })

    return router;
}