//express server module
var express = require('express');

//application, running express app
var app = express();

//cors
var cors = require('cors')


//body parse for requests
var bodyParser = require('body-parser');

//use cors;
app.use(cors());

//mongodb setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://ahong:aa12345@ds127293.mlab.com:27293/userrecords');


// mongoose.connection.on('error', function() {
// 	console.error('Database connection error:');
// });
  
// mongoose.connection.once('open', function() {
// 	console.log('Database connected');
// });

//models for mongoose
require('./models/users');
//model class
var userModel = mongoose.model('users');

//passport.js 
// require('./services/passport');
//passport js
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy; 
var keys = require('./config/keys');

//enable cookies
var cookieSession = require('cookie-session');


//enable body parser
app.use(bodyParser.json()); //want to use json, parses for json
app.use(bodyParser.urlencoded({extended: false})); //shallow parsing (false)

//enable CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


//enable cookies
app.use(
	cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);

//serialize user
//generate identifying piece of info for a user
passport.serializeUser((user, done) =>{
	done(null,user.id);
});


passport.deserializeUser((id,done) => {
	userModel.findById(id)
		.then(user => {
			done(null,user);
		})
});

//setup passport authenication with google strategy
passport.use(
	//pass google client id and secret
	//callback function returns access/refresh tokens, user profile info
	new googleStrategy({
		clientID: keys.googleClientId,
		clientSecret: keys.googleSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken,refreshToken,profile,done) => {

		userModel.findOne({googleId: profile.id})
			.then( (existingUser) => {
				//check for existing user in database with same google id
				if(existingUser){
					done(null,existingUser);
				}

				//if user does not exist, create new user
				else{
					//create model instance of a user, save profile id, insert into collection
					new userModel({
						googleId: profile.id,
						name: profile.displayName
					}).save().then(user => done(null,user));
				}
			});
		})
);

app.use(passport.initialize());
app.use(passport.session());


//auth routes
//app object is passed into arrow function
//require calls function that was exported
// require('./routes/authRoutes')(app);
	
//route handler for google auth
app.get('/auth/google', 
//first parameter: find strategy associated with it
//second parameter: permissions to user account
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', 
    passport.authenticate('google')
);


//choose port based on environment
const PORT = process.env.PORT || 8080;

//listen to requests on port
app.listen(PORT);
