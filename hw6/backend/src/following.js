//Stub the functionality for now.

const getFollowing = (req, res) => {
    const user = req.params.user ? re.params.user: 'xm10test'
    //Hard code the return value;
    res.status(200).send({ 
        username:user,
        following:['xm10','xm10test'] 
     })
}


const putFollowing = (req, res) => {
    const user = req.params.user
    //Should check if user exist in the future.
    if(!user){
        res.status(400).send({result:"Invalid input!"});
        return;
    }
    //Stub the default user name as by8test for now.
    res.status(200).send({ 
        username:'xm10test',
        following:['xm10','xm10test',user]
    })
    // Implement the logic in the future.
}


const deleteFollowing = (req, res) => {
    const user = req.params.user
    if(!user){
        res.status(400).send({result:"Invalid input!"});
        return;
    }
    //Stub the default user name as by8test for now.
    res.status(200).send({ 
        username:'xm10test',
        following:[]
    })
}


module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}