const callbackURL = 'http://localhost:3000/auth/callback'
const clientSecret = "1f8ea46ab741474d78c6cc0ac74081a4"
const clientID = "1641419622822826"
const config = {clientSecret, clientID, callbackURL}

const request = require('request')
const qs = require('querystring')

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy


const app = express()
app.use(session({secret: 'thisIsMySec'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(cookieParser())

passport.serializeUser(function(user, done) {
	users[user.id] = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy(config, 
	function(token, refreshToken, profile, done) {
		process.nextTick(function() {
			return done(null, profile)
		})
	})
)

function logout(req, res) {
	req.logout()
	res.redirect('/')
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('./login')
	}
}

function profile(req, res) {
	res.send('ok now what', req.user)
}

function fail(req, res) {
	res.send('failed to login')
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}


app.use('./auth/facebook', passport.authenticate('facebook', {scope:'email'}))
app.use('/callback', passport.authenticate('facebook', {
	successRedirect: './profile', failureRedirect:'./fail'
}))
app.use('./profile', isLoggedIn, passport.authenticate('facebook', {scope:'email'}))
app.use('/logout', logout)
app.use('/fail', fail)
app.use('/', index)

    
// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
