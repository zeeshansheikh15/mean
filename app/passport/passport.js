var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'zeeshan';


module.exports = function (app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));


    passport.serializeUser(function (user, done) {
        jwtoken = jwt.sign({ user:user.username, email: user.email }, secret, { expiresIn: '1h'});
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
            callbackURL: 'http://localhost:8080/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {

                User.findOne({email : profile._json.email}).select('username password email').exec(function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    // else {
                    //     var newUser = new users();
                    //     newUser.facebook.id = profile.id;
                    //     newUser.facebook.token = accessToken;
                    //     newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    //     newUser.facebook.email = profile.emails[0].value;
                    //
                    //     newUser.save(function(err){
                    //         if(err)
                    //             throw err;
                    //         return done(null, newUser);
                    //     })
                    //     console.log(profile);
                    // }
                });

            done(null, profile);
        }

    ));


    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
        res.redirect('/main/'+ jwtoken);
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    return passport;
}
    
