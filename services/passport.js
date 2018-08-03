const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
	done(null,user.id);//1st argument is a error object
});
passport.deserializeUser((id,done)=>{
	User.findById(id)
	.then(user=>done(null,user))
	.catch(error=>done(error));
});

passport.use(new GoogleStrategy({
	clientID: keys.google_client_id,
    clientSecret: keys.google_client_secret,
    callbackURL: "/auth/google/callback",
    proxy: true
},(accessToken, refreshToken, profile, done)=>{
	User.findOne({googleId:profile.id}).then((user)=>{
		if(user){
			//user already exist
			done(null,user);
		}else{
			new User({googleId:profile.id})
			.save()
			.then((newUser)=>{
				done(null,newUser);
			});
		}
	});
}));

