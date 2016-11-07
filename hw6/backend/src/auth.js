const loginAction = (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(400).send({result:"Invalid input!"});
        return;
    }
    //Stub to return success to to user without checking in DB
    res.status(200).send({
        username:username, 
        result:'success'
    });
}

const logoutAction = (req, res)=>{
    res.status(200).send('OK');
}

const registerAction = (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const dob = req.body.dob;
    const zipcode = req.body.zipcode;
    if(!username || !password || !email || !dob || !zipcode){
        res.status(400).send({result:"Invalid input!"});
        return;
    }
    //Stub to return success to to user without checking in DB
    res.status(200).send({
        username:username, 
        result:'success'
    });
}

const putPassword = (req, res)=>{
    const password = req.body.password;
    if(!password){
        res.status(400).send({result:"Invalid input!"});
    }
    //Currently not allow change the password
    res.status(200).send({
        username:'by8test', 
        status:'will not change'
    });
    // Implement the logic in the future.
}

module.exports = app => {
    app.post('/login', loginAction)
    app.put('/logout', logoutAction)
    app.post('/register', registerAction)
    app.put('/password',putPassword)
}