function article(id, author, text){
	this.id = id;
	this.author = author;
	this.text = text;
	this.date = new Date();
	this.comments = [];
}


let articles = [new article(1,"xm10test","This is my first articles"),
				new article(2,"xm10test","This is my second articles"),
				new article(3,"xm10test","This is my third articles")];

const postArticle = (req, res) => {
    console.log('Payload received', req.body);
    if(!req.body.text){
    	res.status(401).send("Invalid input! No text!");
    	return;
    }
    const newArticle = new article(articles.length+1,'xm10test',req.body.text)
    articles.push(newArticle);
    res.status(200).send({articles: [newArticle]});
}

const getArticles = (req,res) => {
	if(req.params.id){
		console.log(articles)
		let target = articles.filter((item)=>{return item.id == req.params.id })
		if(target.length!==0){
			res.send({articles:target});
		}
		else{
			res.status(200).send({articles:[]})
		}
	}
	else{
		res.status(200).send({articles:articles});
	}
}

const pubArticles = (req, res) => {
	const text = req.body.text;
	if(req.params.id >= articles.length){
		res.status(401).send("ID not found!")
		return;
	}
	if(!req.body.commentId){
		articles[req.params.id].text = req.body.text;
	}
	else{
		articles[req.params.id].comments.append({commentId:req.body.commentId, text: req.body.text})
	}
	res.status(200).send({articles: [articles[req.params.id]]});
}


module.exports = app => {	
	app.post('/article', postArticle)
	app.get('/articles/:id*?',getArticles)
	app.put('/articles/:id', pubArticles)
}