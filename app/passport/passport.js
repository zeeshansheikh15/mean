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
        jwtoken = jwt.sign({ user:user.username, email: user.email, id: user.id, photo: user.photo }, secret, { expiresIn: '1h'});
        done(null, user);
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
                console.log(profile.photos[0].value);
                User.findOne({email : profile._json.email}).select('id username password email photo').exec(function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else {
                        var newUser = new User();
                        newUser.username =  profile._json.name;
                        newUser.email = profile.emails[0].value;
                        newUser.id    = profile._json.id;
                        newUser.photo    = profile.photos[0].value;
                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                });
        }
    ));


    passport.use(new TwitterStrategy({
            consumerKey: 'mYgPrFDJGewOgFL8xYAgOy3qf',
            consumerSecret: 'ZTzAmoK4gyIHpzWVSABh7SkG6S6mmIi4EeN37v0OMaCigUEiPK',
            callbackURL: "https://zeesite.herokuapp.com/auth/twitter/callback",
            userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
        },
        function(token, tokenSecret, profile, done) {
        console.log(profile);
            User.findOne({id : profile._json.id}).select('id username password email photo').exec(function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.username =  profile._json.name;
                    newUser.id = profile._json.id;
                    newUser.photo    = profile.photos[0].value;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                }
            });
        }
    ));


    passport.use(new GoogleStrategy({
            clientID: '134355234813-e1k526h5it4k79jk14mli9qrhmpvaduc.apps.googleusercontent.com',
            clientSecret: 'sZ6Le_BqbbFole7r6WAjAR6C',
            callbackURL: "https://zeesite.herokuapp.com/auth/google/callback"
        },
        function(token, tokenSecret, profile, done) {
            console.log(profile);
            User.findOne({email : profile.emails[0].value}).select('id username password email photo').exec(function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.username =  profile._json.displayName;
                    newUser.id = profile._json.id;
                    newUser.photo    = profile.photos[0].value;
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







    app.get('/auth/google', passport.authenticate('google', { scope: ['email','profile'] }));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/loggedin/'+jwtoken);
        });




    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function (req, res) {

        res.redirect('/loggedin/'+jwtoken);
    });



    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {

       res.redirect('/loggedin/'+ jwtoken);
    });

    return passport;
}
    
