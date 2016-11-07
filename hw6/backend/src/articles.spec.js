/*
 * Test for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = (path) => `http://127.0.0.1:3000${path}`

describe('Validate Article functionality', () => {
	it('After adding a new article, the number of articles should increases by 1', (done) => {
		let oldCount, newCount;
		let options1 =  {
			method: 'GET',
        	headers: {'Content-Type': 'application/json'},
    	}
    	//Get the artciles 
		fetch(url("/articles"),options1)
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json();
		}).then(body => {
			expect(body.articles).to.exist;
			oldCount = body.articles.length;
		}).then( _=>{
			let options2 =  {
				method: 'POST',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({
					text: 'Hello article!'
        		})
    		}
    		//Post new article
		 	return fetch(url("/article"),options2)
		}).then(res => {
			expect(res.status).to.eql(200)
			return res.json();
		}).then(body => {
			expect(body.articles[0].text).to.eql('Hello article!')
		}).then(_=>{
			//Get the headline again
			return fetch(url("/articles"),options1)
		}).then(res => {
			expect(res.status).to.eql(200)
			return res.json();
		}).then(body =>{
			expect(body.articles).to.exist;
			newCount = body.articles.length;
			expect(newCount).to.eql(oldCount+1);
		})
		.then(done)
		.catch(done)
 	}, 200)
});