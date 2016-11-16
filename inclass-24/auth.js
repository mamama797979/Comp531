const md5 = require('md5')
var User = require('./model.js').User

var cookieParser = require('cookie-parser')
var redis = require('redis').createClient('redis://h:pcrtnp7i8n0bnj2q58e41et9e6b@ec2-54-243-188-149.compute-1.amazonaws.com:10509')


const saltLength = 20;
const cookieKey = 'sid';

function isLoggedIn(req, res, next){

	if(!req.cookies){
		res.status(401).send('Not authorized! No cookie!')
		return
	}

	let sid = req.cookies[cookieKey]

	if(!sid){
		res.status(401).send('Not authorized! No cookie with sid!')
		return
	}

	redis.hgetall(sid, function(err,userObject){
		if(userObject && userObject.username){
			req.username = userObject.username;
			next();
		}
		else{
			res.status(401).send('Not authorized! Invalid cookie!')
		}
	})


}

const randomSalt = (len) =>{
	const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	randomString += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return randomString;
}


const saltedHash = (password, salt) =>{
	return md5(password+salt);
}


function findByUsername(username, callback) {
	User.find({ username }).exec(function(err, items) {
		callback(items);
	})
}


const registerAction = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	findByUsername(username, function(items){
		if(items.length !== 0){ 
			res.status(400).send({result:"User already exist!"})
			return;
		}
		else{
			const mySalt = randomSalt(saltLength)
			new User({username:username, salt:mySalt, hash: saltedHash(password,mySalt)}).save(function(){
				res.status(200).send({result:"Succeed!"})
				return;
			});
		}
	});
}


const loginAction = (req,res) => {
	const username = req.body.username;
	const password = req.body.password;
	if(!username || !password){
		res.status(400).send({result:"Invalid input!"});
		return;
	}

	findByUsername(username, (items)=>{
		if(items.length===0){
			res.status(401).send({result:"No such user exist!"})
			return;
		}
		else{
			//Get them from DB
			const salt = items[0].salt; 
			const hash = items[0].hash;
			if(saltedHash(password, salt)!=hash){
				res.status(401).send({result:"Wrong password!"})
				return;
			}
			else{
				let currentCookie = saltedHash(hash,salt)
				redis.hmset(currentCookie,{username})
				res.cookie(cookieKey, currentCookie, {maxAge:3600*1000, httpOnly:true})
				res.status(200).send({username:username, result:'success'});
				return;
			}
		}
	})
}

//This is a stub for testing
const hello = (req, res) =>{
	res.status(200).send('Hello '+ req.username)
}

const logout = (req,res)=>{
	redis.del(req.cookies[cookieKey])
	res.status(200).send('Logout Succeed!')
}

module.exports = app => {
	app.use(cookieParser())	
	app.get('/hello', isLoggedIn, hello)
	app.post('/register', registerAction)
	app.post('/login',loginAction)
	app.use('/logout',isLoggedIn, logout)
}
