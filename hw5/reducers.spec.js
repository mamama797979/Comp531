import {expect} from 'chai'

import Action from './actions'
import Reducer, {shared, articles} from './reducers'
import {filterFunction} from './components/article/articleView'


describe('Validate reducer (no fetch requests here)', ()=> {
	it('should initialize state', ()=>{
		expect(Reducer(undefined,{})).to.eql({
			shared:{location:'', errorMsg:'', successMsg:''},
			profile:{ username:'', headline:'', avatar:'', zipcode:'', email:'',dob:''},
			followers:{followers:{}},
			articles:{articles:{},keyword:''}
		})
	})

	it('should state success (for displaying success message to user)',()=> {
		expect(shared(undefined,{type:Action.SUCCESSMSG, successMsg:'success message'}))
		.to.eql({location:'',successMsg:'success message', errorMsg:''})
	})

	it('should state error (for displaying error message to user)',()=> {
		expect(shared(undefined,{type:Action.ERRORMSG, errorMsg:'error message'}))
		.to.eql({location:'',successMsg:'', errorMsg:'error message'})
	})

	it('should set the articles',()=> {
		expect(articles(undefined,{type:Action.UPDATE_ARTICLES, articles:{
			1:{_id:1, text:'hello world!', author:'xm10',date:'2016-10-24'}
		}}))
		.to.eql({keyword:'', articles:{1:{_id:1, text:'hello world!', author:'xm10',date:'2016-10-24'}}})
	})

	it('should set the search keyword',()=> {
		expect(articles(undefined,{type:Action.SEARCH_KEYWORD, keyword:'search keyword'}))
		.to.eql({keyword:'search keyword', articles:{}})
	})

	it('should filter displayed articles by the search keyword',()=> {
		const articles = {1:{_id:1, text:'hello world!', author:'xm10', date:'2016-10-24'},
						  2:{_id:2, text:'hello javascript', author:'xm10', date:'2016-10-24'}}
		const keyword = 'world'
		expect(filterFunction(articles,keyword)).to.eql([{_id:1, text:'hello world!', author:'xm10', date:'2016-10-24'}]);
	})
})