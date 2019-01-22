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
                res.json({message:'Username or Email already exists'});
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


    router.post('/getuser/:usern', function (req, res) {
        console.log(req.params.usern);
        if(req.params.usern == null){
              res.json({message:'Email and password not provided'});
        }else {
            User.findOne({username: req.params.usern}).select('email username password').exec(function (err, user) {
                if (err) {
                    res.json({ message: error});
                }
                if (!user) {
                    res.json({ message: 'User not found', username: req.params.usern });
                } else if (user) {
                     res.json({valid: true, message: 'Welcome!!!',user : user})
                    }

            });
        }
    });



    return router;
}