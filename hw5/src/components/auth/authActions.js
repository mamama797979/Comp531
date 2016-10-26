import Promise from 'bluebird'
import Action, {nav2Main, nav2Index, displayErrorMsg, resource} from '../../actions'
import { getProfile, getProfileHeadline} from '../profile/profileActions'
import { getFollowers } from '../main/followingActions'
import { getArticles } from '../article/articleActions'

export function initialStates(username){
    return (dispatch) => {
        
        //Get all the informaiton for main page and profile page
        let t1 = dispatch(getProfile())
        let t2 = dispatch(getProfileHeadline(username))
        let t3 = dispatch(getFollowers())
        let t4 = dispatch(getArticles())

        //Navigate to the main page
        Promise.all([t1,t2,t3,t4]).then(()=>{
            dispatch(nav2Main())
        })
    }
}

export function loginAction(username, password) {
     console.log("Login triggered!")
    return (dispatch) => {
        console.log("Login triggered!")
        resource('POST', 'login', {username, password })
        .then((response) => {
            console.log("response:"+response);
            dispatch({type: Action.LOGIN, username: response.username})
            dispatch(initialStates(username))
        }).catch((err) => {
            dispatch(displayErrorMsg(`Invalid logging in as user: ${username}`))
        })
    }
}

export function logoutAction(){
    return (dispatch) => {
        resource('PUT','logout')
        .then((response) => {
            dispatch({type:Action.LOGOUT})
            dispatch(nav2Index())
        }).catch((err) => {
            console.log("Logout Fails: " + err);
        })
    }
}
