const index = (req, res) => {
	console.log(req.params.user)
    res.send({ hello: 'world' })
}

const getHeadLines = (req, res) => {
	res.send({ headlines: [{
		username:'xm10',
		headline: 'Headline'
	}]})
}

const putHeadLines = (req, res) => {
	res.send({ headlines: [{
		username:'xm10',
		headline: req.body.headline || 'you did not supply it'
	}]})
}

const getEmail  = (req, res) => {
	res.send({
		username:'xm10',
		email: 'xm10@rice.edu'
	})
}

const putEmail = (req, res) => {
	res.send({
		username:'xm10',
		email: req.body.email || 'you did not supply it'
	})
}

const getZipcode = (req, res) => {
	res.send({
		username:'xm10',
		zipcode: '77005'
	})
}

const putZipcode = (req, res) => {
	res.send({
		username:'xm10',
		zipcode: req.body.zipcode || 'you did not supply it'
	})
}

const getAvatar = (req, res) => {
	res.send({ avatars: [{
		username:'xm10',
		avatar: 'Avatar'
	}]})
}

const putAvatar = (req, res) => {
	res.send({
		username:'xm10',
		avatar: req.body.avatar || 'you did not supply it'
	})
}

module.exports = app => {
    app.get('/:user?', index)
    app.get('/headlines/:user?',getHeadLines)
    app.put('/headline',putHeadLines)
    app.get('/email/:user?',getEmail)
    app.put('/email',putEmail)
    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)    
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar',putAvatar)
}