import { combineReducers } from 'redux'
import Action from './actions'

//reducers for changing the state in the store
export function shared(state = {location:'', errorMsg:'', successMsg:''},action){
    let cleanMsg = {errorMsg:'', successMsg:''}
    switch(action.type){
        case Action.ERRORMSG:
            return { ...state, ...cleanMsg, errorMsg: action.errorMsg}
        case Action.SUCCESSMSG:
            return { ...state, ...cleanMsg, successMsg: action.successMsg}
        case Action.NAV2MAIN:
            return { ...state, ...cleanMsg, location: 'MAIN_PAGE'}
        case Action.NAV2PROFILE:
            return { ...state, ...cleanMsg, location: 'PROFILE_PAGE'}
        case Action.NAV2INDEX:
            return { ...state, ...cleanMsg, location: ''}
        default:
            return {...state,...cleanMsg}
    }
}


export function profile(state = { username:'', headline:'', avatar:'', zipcode:'', email:'',dob:''}, action){
    switch(action.type){
        case Action.LOGOUT:
            return {...state, username:''}
        case Action.LOGIN:
            return {...state, username:action.username}
        case Action.UPDATE_PROFILE:
            if(action.avatar) {
                return {...state, avatar: action.avatar}
            }
            if(action.email) {
                return {...state, email: action.email}
            }
            if(action.zipcode){
                return {...state, zipcode: action.zipcode}
            }
            if(action.dob){
                return {...state, dob: action.dob}
            }
            if(action.headline){
                return {...state, headline: action.headline}
            }
        default:
            return state;
    }
}


export function followers(state = {followers:{}}, action){
    switch(action.type){
        case Action.UPDATE_FOLLOWERS:
            return {...state, followers: action.followers};
        default:
            return state;
    }
}


export function articles(state = {articles:{},keyword:''}, action){
    switch(action.type){
        case Action.UPDATE_ARTICLES:
            return {...state, articles: action.articles}
        case Action.SEARCH_KEYWORD:
            return {...state, keyword: action.keyword}
        default:
            return state;
    }
}

const Reducer = combineReducers({
    articles, followers, profile, shared
})

export default Reducer