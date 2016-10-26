import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Action, {apiUrl, updateError, updateSuccess, 
	navToProfile, navToMain, navToOut, resource} from './actions'




describe('Validate actions (these are functions that dispatch actions)', () => {
	let Action, actions
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
		}
		Action = require('./actions').default
		actions = require('./actions') 
	})

	afterEach(() => {
		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
		}
	})

	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${apiUrl}/login`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})

		resource('GET', 'sample').then((response) => {
			expect(response.articles).to.exist
			done()
		})
	})

	it('resource should give me the http error', (done)=> {
		const username = 'xm10'
		const password = 'Unauthorized'
		
		mock(`${apiUrl}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password}).catch((err) => {
			expect(err.toString()).to.eql('Error: Error in POST login {}')
			done()
		})
	})


	it('resource should be POSTable', (done)=> {
		const username = 'xm10'
		const password = 'small-climbed-joined'
		
		mock(`${apiUrl}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).then((response) => {
			expect(response).to.eql({username: "xm10", result: "success"})
			done()
		})
	})


	it('should update error message (for displaying error mesage to user)', ()=>{
		const expectAction = {
			type: Action.ERROR,
			error: 'error message'
		}
		expect(updateError('error message')).to.eql(expectAction);
	})


	it('should update success message (for displaying success message to user)', ()=>{
		const expectAction = {
			type: Action.SUCCESS,
			success: 'success message'
		}
		expect(updateSuccess('success message')).to.eql(expectAction);
	})


	it('should navigate to profile, main, and landing', ()=>{
		expect(navToOut()).to.eql({type: Action.NAV_OUT});
		expect(navToMain()).to.eql({type: Action.NAV_MAIN});
		expect(navToProfile()).to.eql({type: Action.NAV_PROFILE});
	})

})
