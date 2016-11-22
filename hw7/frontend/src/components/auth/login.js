import React from 'react'
import { connect } from 'react-redux'

import { localLogin } from './authActions'

//The login section react component
const Login = ({dispatch}) => {
    let username, password
    return (

        <div id="form_login">
            
            
            <fieldset className="form-group">
            <legend>Login</legend>
            <div className="form-group row">
                  <label className="col-sm-4 col-form-label" for="username">username</label>
                  <div className="col-sm-8">
                        <input type="text" id="loginUsername" className="form-control" ref={(node) => { username = node }}
                        placeholder="username" required/>
                  </div>
            </div>
            <div className="form-group row">
                  <label className="col-sm-4 col-form-label" for="user_password">Password</label>
                  <div className="col-sm-8">
                        <input type="password" id="loginPassword" className="form-control" ref={(node) => { password = node }}
                        placeholder="password" required/>
                  </div>
            </div>
            <div className="form-group row" id="lgn_frm_btn">
                    <input type="submit" id="login" className="btn btn-success" value="Login"
                    onClick={() => { dispatch(localLogin(username.value, password.value)) }}/>
            </div>
            </fieldset>
            

        </div>
    )
}

export default connect()(Login)



/** WEBPACK FOOTER **
 ** ./src/components/auth/login.js
 **/