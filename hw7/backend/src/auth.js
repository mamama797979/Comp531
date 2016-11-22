'use strict';
//this is the stub for authentication
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const md5 = require('md5')
const cookieKey = 'sid'
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = 'I like to be a web developer!'
const redis = require('redis').createClient('redis://h:pfrsifsi26si8tdem66mdkm4kem@ec2-184-73-200-54.compute-1.amazonaws.com:12199')
const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientID:'1205657472813475', 
	clientSecret:'3b4e1c0b74ea4ff17144aa15f09df86b', 
	callbackURL
}

const register = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const dob = new Date(req.body.birth).getTime();
	const zipcode = req.body.zipcode;
	const password = req.body.password;
	if (!username || !email || !dob || !zipcode || !password) {
		res.status(400).send({result: "all fields should be supplied"})
		return
	}
	//check if the username has already been used
	User.find({username: username}).exec(function(err, users){
		if(users.length !== 0) {
			res.status(401).send(`${username} has already been registered.`)
			return
		} else {
			const salt = md5(username + new Date().getTime())
			const hash = md5(password + salt)
			const userObj = new User({username: username, salt: salt, hash: hash})
			new User(userObj).save(function (err, usr){
				if(err) return console.log(err)
			})
			const profileObj = new Profile({username: username, headline: "", following:[], email: email, zipcode: zipcode, dob: dob, avatar: "http://staff.rice.edu/images/styleguide/Rice_OwlBlueTMCMYK300DPI.jpg"})
			new Profile(profileObj).save(function (err, usr){
				if(err) return console.log(err)
			})
			//successfully register
			res.send({
				username: username,
				result: 'success'
			})
		}
	})
	
}

const login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		res.status(400).send("username or password is missing")
		return
	}

	User.find({username: username}).exec(function(err, users){
        if (!users || users.length === 0){
            res.sendStatus(401)
            return
        }
        const userObj = users[0]
		if(!userObj){
			res.status(401).send("Don't have this user in db")
		}
		const salt = userObj.salt;
		const hash = userObj.hash;

		if(md5(password + salt) === hash){
			const sessionKey = md5(secret + new Date().getTime() + userObj.username)
			redis.hmset(sessionKey, userObj)
			res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
			res.send({ username: username, result: 'success'})
		} else{
			res.status(401).send("incorrect password!")
		}
	})
}

//wait for the final requirement
const newPassword = (req, res) => {
	const newPassword = req.body.password;
	const username = req.username;
	if (!newPassword) {
		res.status(400).send("newPassword is missing")
		return
	}
	User.find({username: username}).exec(function(err, users){
        const userObj = users[0]
		const oldSalt = userObj.salt;
		const oldHash = userObj.hash;
		if(md5(newPassword + oldSalt) === oldHash){
			res.status(400).send({username: username, status: 'you have used the same password'})
		}
		else{
			const newSalt = md5(username + new Date().getTime())
			const newHash = md5(newPassword + newSalt)
			User.update({username: username}, { $set: { salt: newSalt, hash: newHash }}, { new: true }, function(err, profile){
		        if(err) return console.log(err)
		        res.status(200).send({username: username, status: 'successfully change the password and you can logout to check'})
		    })
		} 
	})
}

//use Facebook Strategy to login
passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	const user = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null, profile);
		})
	}
))

function logout(req,res){
	const sid = req.cookies[cookieKey]
	redis.del(sid)
	res.clearCookie(cookieKey)
	res.status(200).send("OK")
}

function isLoggedIn(req, res, next){
	const sid = req.cookies[cookieKey]
	if (!sid){
        return res.sendStatus(401)
    }
    redis.hgetall(sid, function(err, userObj) {
    	if(err) throw err;
    	if(userObj){
    		console.log(sid + ' mapped to ' + userObj.username)
    		req.username = userObj.username
			next()
		}
		else{
			res.sendStatus(401)
		}
    })
	
}

function profile(req,res){
	res.send({'ok now what?':req.user})
}

module.exports = app => {
	app.use(cookieParser());
    app.post('/login', login);
    app.post('/register', register);
    
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))

	app.use(isLoggedIn)

	app.put('/password', newPassword);
	app.put('/logout', logout);
	app.use('/profile', profile)
}