import React from 'react'
import { connect } from 'react-redux'
import {loginAction} from './authActions'


const Login = ({dispatch}) => {
    let username, password;

    // login form
    return (
        <div className="col-sm-6 well">
            <div className = "text-center">
                <h2>Log in</h2>
            </div>
            <div>
                <div className="form-group row">
                    <label className="col-xs-4 col-form-label">Account Name</label>
                    <div className="col-xs-8">
                        <input className="form-control" type="text" name="account name" placeholder="Account" ref={(node) => { username = node }}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-xs-4 col-form-label">Password</label>
                    <div className="col-xs-8">
                        <input className="form-control" type="password" name="password" placeholder="Password" ref={(node) => { password = node }}/>    
                    </div>
                </div>
                <div className="row formRow alert fade in" id="log-notice"></div>
                    <div className = "col-sm-4 col-md-offset-5">
                        <button type="button" className="btn btn-primary" onClick={() => {dispatch(loginAction(username.value, password.value))}}>Login</button>
                    </div>
            </div>
        </div>
    )
}

export default connect()(Login)