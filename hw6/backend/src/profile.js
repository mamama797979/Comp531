let defaultProfile = {
    username: 'xm10test',
    email: 'xm10@rice.edu',
    zipcode: '77005',
    avatar:'https://i.ytimg.com/vi/h_C2FMLDezM/hqdefault.jpg?custom=true&w=168&h=94&stc=true&jpg444=true&jpgq=90&sp=68&sigh=AMqgk1QrwWPa5mFIZ8Ut197wWBg',
    dob:Date.parse('1993-05-08'),
    headline: 'I like COMP531!'
}


const getHeadLines = (req, res) => {
    const users = req.params.users ? req.params.users.split(','): [defaultProfile.username];
    res.status(200).send({ headlines: users.map((user)=>{
            if(user===defaultProfile.username){
                return {username:user, headline:defaultProfile.headline}
            }
            else{
                return {username:user, headline:'Defalut value for headline!'}
            }
        })
    })
}


const putHeadLines = (req, res) => {
    const username = defaultProfile.username
    const headline = req.body.headline
    if(!headline){
        res.status(400).send("You did not supply headline!")
    }
    else{
        defaultProfile.headline = headline
        res.status(200).send({username, headline})
    }
}


const getEmail  = (req, res) => {
    const username = req.params.user ? req.params.user: defaultProfile.username
    const email = username===defaultProfile.username? defaultProfile.email: 'defaultEmail@rice.edu'
    res.status(200).send({username,email})
}


const putEmail = (req, res) => {
    const username = defaultProfile.username
    const email = req.body.email
    if(!headline){
        res.status(400).send("You did not supply email!")
    }
    else{
        defaultProfile.email = email
        res.status(200).send({username, email})
    }
}


const getZipcode = (req, res) => {
    const username = req.params.user ? req.params.user: defaultProfile.username
    const zipcode = username===defaultProfile.username ? defaultProfile.zipcode: '12345' //Default zipcode
    res.status(200).send({username,zipcode})
}


const putZipcode = (req, res) => {
    const username = defaultProfile.username
    const zipcode = req.body.zipcode
    if(!headline){
        res.status(400).send("You did not supply zipcode!")
    }
    else{
        defaultProfile.zipcode = zipcode
        res.status(200).send({username, zipcode})
    }
}


const getAvatar = (req, res) => {
    const users = req.params.user ? req.params.users.split(','): [defaultProfile.username];
    res.status(200).send({ avatars: users.map((user)=>{
            if(user===defaultProfile.username){
                return {username:user, avatar:defaultProfile.avatar}
            }
            else{
                return {username:user, avatar:'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjNzYCBh5PQAhUBQSYKHWPvCZoQjRwIBw&url=http%3A%2F%2Fwww.51allout.co.uk%2F2012-02-18-commonwealth-bank-odi-series-round-two-review%2Fimage-not-found%2F&psig=AFQjCNGWnrLj0kPmwX-7cJV5D05EdRuATw&ust=1478484723363260'}
            }
        })
    })
}


const putAvatar = (req, res) => {
    const username = defaultProfile.username
    const avatar = req.body.avatar
    if(!avatar){
        res.status(400).send("You did not supply avatar!")
    }
    else{
        defaultProfile.avatar = avatar
        res.status(200).send({username, avatar})
    }
}


const getDob = (req, res) => {
    const username = req.params.user ? req.params.user: defaultProfile.username
    const dob = username===defaultProfile.username ? defaultProfile.dob: Date.parse("2000-01-01") //Default dob
    res.status(200).send({username,dob})
}


module.exports = app => {
    app.get('/headlines/:user?',getHeadLines)
    app.put('/headline',putHeadLines)

    app.get('/email/:user?',getEmail)
    app.put('/email',putEmail)

    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)
    
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar',putAvatar)

    app.get('/dob', getDob)
}