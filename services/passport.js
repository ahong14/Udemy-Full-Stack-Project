//passport js
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy; 
var keys = require('../config/keys');

//setup passport authenication
passport.use(
	//pass google client id and secret
	new googleStrategy({
		clientID: keys.googleClientId,
		clientSecret: keys.googleSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken,refreshToken,profile,done) => {
		console.log('access token', accessToken);
		console.log('refresh token', refreshToken);
		console.log('profile', profile);
	})
);