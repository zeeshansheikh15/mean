var User = require('../models/user');

module.exports =function(router){

    router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    if(req.body.username == null || req.body.username == "" || req.body.email == null || req.body.email == "" ||req.body.password == null || req.body.password == "" ){
        res.send('Username, email and password not provided');
    }else {
        user.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send('user created');
            }
        });
    }
    });
    return router;
}