const local = false;
const url = local? 'http://localhost:8080' : 'https://webdev-dummy.herokuapp.com'

//Action enum
const Action = {
    ERRORMSG:'error message',
    SUCCESSMSG: 'success message',

    NAV2MAIN: 'navigate to main page',
    NAV2INDEX: 'navigate to index page',
    NAV2PROFILE: 'navigate to profile page',

    LOGIN: 'login',
    LOGOUT: 'logout',

    UPDATE_PROFILE: 'update profile',

    UPDATE_FOLLOWERS: 'update followers',

    UPDATE_ARTICLES: 'update articles',
    SEARCH_KEYWORD: 'search keyword'
}

export default Action

//Action generator
export function displayErrorMsg(msg){
    return {type: Action.ERRORMSG, errorMsg: msg};
}

export function displaySuccessMsg(msg){
    return {type: Action.SUCCESSMSG, successMsg: msg};
}

export function nav2Main(){
    return {type: Action.NAV2MAIN};
}

export function nav2Profile(){
    return {type: Action.NAV2PROFILE};
}

export function nav2Index(){
    return {type: Action.NAV2INDEX};
}

//resource function
export function resource(method, endpoint, payload, submitJson=true){
    const options = {credentials: 'include', method}
    if (submitJson) options.headers = {'Content-Type': 'application/json'}
    if (payload) {
            options.body = submitJson ? JSON.stringify(payload) : payload
    }
    return fetch(`${url}/${endpoint}`, options)
    .then(response => {
        if (response.status === 200) {
            if (response.headers.get('Content-Type').indexOf('json') > 0) {
                return response.json()
            }else {
                return response.text()
            }
        } else {
            // useful for debugging, but remove in production
            console.error(`${method} ${endpoint} ${response.statusText}`)
            throw new Error(response.statusText)
        }
    })
}
