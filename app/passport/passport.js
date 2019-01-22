var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var User             = require('../models/user');
var session          = require('express-session');
var jwt              = require('jsonwebtoken');
var secret           = 'zeeshan';
var userdet          = null;

module.exports = function (app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));


    passport.serializeUser(function (user, done) {
        jwtoken = jwt.sign({ user:user.username, email: user.email }, secret, { expiresIn: '1h'});
        userdetails = ({id : userdet.id, name : userdet.name, token : jwtoken});
        iduser = userdetails.id;
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        users.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: '1863459637110110',
            clientSecret: 'c8966afbdcf080900074f6de23c3585c',
            callbackURL: 'https://zeesite.herokuapp.com/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
                userdet = ({id : profile._json.id, name : profile._json.name});
                User.findOne({email : profile._json.email}).select('username password email').exec(function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else {
                        var newUser = new User();
                        newUser.username =  profile._json.name;
                        newUser.email = profile.emails[0].value;
                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                });
        }
    ));


    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {

       res.redirect('/loggedin/'+ userdetails.name);
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    return passport;
}
    
