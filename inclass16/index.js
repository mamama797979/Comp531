const express = require('express')
const bodyParser = require('body-parser')
var articleSet = {
		articles: [
			{
				id: 1,
				author: "Scott",
				text: "This is an article"
			},
			{
				id: 2,
				author: "Zou",
				text: "This is an article"
			},
			{
				id: 3,
				author: "Ma",
				text: "This is an article"
			}
		]
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     var Id = articleSet["articles"].length+1
     var Author = "Tom"
     var Text = "This is an article";
     articleSet["articles"][Id-1] = {
     	id: Id,
     	author: Author,
     	text: Text
     }
     res.send(articleSet["articles"][Id-1])
}

const hello = (req, res) => res.send({ hello: 'world' })
const getArticles = (req, res) => {
	res.send(articleSet)
}
 
const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
