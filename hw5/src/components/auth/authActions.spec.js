import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'


import { loginAction } from './authActions'
import Action, { url } from '../../actions'


describe('Validate Authentication (involves mocked requests)', () => {

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	
	it('- should log in a user', (done)=> {
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
		})

		const username = 'xm10test'
		const password = 'branch-report-their'
		
		let count = 0;
		loginAction(username,password)((action) => {
			//console.log(action)
			expect(1).to.eql(2)
			if(count++ === 0) {
				console.log('Action 0')
				console.log(action)
				expect(action.type).to.eql(Action.LOGOUT);
			}
			else{
				console.log('Action else '+ count)
				console.log(action)
				expect(action.type).to.eql(Action.ERRORMSG);
			}
		})
		done()
	})

	it('- should not log in an invalid user', (done)=> {
		done()
	})

	it('- should log out a user (state should be cleared)', (done)=> {
		done()
	})

})






/*
should not log in an invalid user
should log out a user (state should be cleared)
*/