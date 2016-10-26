import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Profile actions (mocked requests)', ()=> {
	let Action, resource, url, getProfile, putProfileHeadline
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		Action = require('../../actions').default
		resource = require('../../actions').resource
  		url = require('../../actions').url
  		getProfile = require('./profileActions').getProfile
  		putProfileHeadline = require('./profileActions').putProfileHeadline
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	/*it("should fetch the user's proile information", (done)=>{
		mock(`${url}/dob`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{dob:'dobValue'}
		})
		mock(`${url}/zipcode`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{zipcode:'zipcodeValue'}
		})
		mock(`${url}/email`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{email:'emailValue'}
		})
		mock(`${url}/avatars`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{avatars:'avatarsValue'}
		})
		let count = 4
		getProfile()((action) => { 
			try{
				if(action.avatars){
					expect(action.avatars).to.eql('avatarsValue');
				}
				else if(action.email){
					expect(action.email).to.eql('emailValue');
				}
				else if(action.zipcode){
					expect(action.zipcode).to.eql('zipcodeValue');
				}
				else if(action.dob){
					expect(action.dob).to.eql('Invalid Date');
				}
				count--;
			}catch(e){
				done(e);
			}
		}).then(() => {
			expect(count).to.eql(0)
		}).then(done)
		.catch(done)
	})*/

	
	/*it('should update headline',(done)=> {
		const username = 'xm10test'
		const headline = 'New headline!'

		mock(`${url}/headline`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			json: {username, headline}
		})

		putProfileHeadline(headline)((action)=>{
			try{
				expect(action.type).to.eql(Action.UPDATE_PROFILE)
				expect(action.headline).to.eql(headline)
				done();
			}catch(e){
				done(e);
			}
		})
	})*/
})