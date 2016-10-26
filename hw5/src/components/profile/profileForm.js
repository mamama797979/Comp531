import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Action, {displayErrorMsg} from '../../actions'
import Avatar from './avatar'

//Profile form structure
export class ProfileForm extends Component {
    constructor(props){
        super(props);
    }

    render() { return (
        <form className="centerForm" onSubmit={(e) => {
            if (e) e.preventDefault()
            this.props.dispatch(displayErrorMsg("Update information is not required for HW5"))
        }}>
            <Avatar/>
            <div className="row formRow property" id="displayName">
                <div className="col-md-4">Account:</div>
                <div className="col-md-4"><input type="text" size="20"/></div>
                <div className="col-md-4">{this.props.username}</div>
            </div>
            <div className="row formRow property" id="emailAddress">
                <div className="col-md-4">Email:</div>
                <div className="col-md-4"><input type="text" size="20"/></div>
                <div className="col-md-4">{this.props.email}</div>
            </div>
            <div className="row formRow property" id="zipcode">
                <div className="col-md-4">Zipcode:</div>
                <div className="col-md-4"><input type="text" size="20"/></div>
                <div className="col-md-4">{this.props.zipcode}</div>
            </div>
            <div className="row formRow property" id="password">
                <div className="col-md-4">Password:</div>
                <div className="col-md-4"><input type="password" size="20"/></div>
                <div className="col-md-4"></div>
            </div>
            <div className="row formRow">
                <div className="col-md-4">Password Confirmation:</div>
                <div className="col-md-4"><input type="password" size="20" id="passwordConfirm"/></div>
                <div className="col-md-4"></div>
            </div>
            <div className="row formRow">
                <div className="col-md-4">Date of Birth:</div>
                <div className="col-md-4">{this.props.dob}</div>
                <div className="col-md-4"></div>
            </div>
            <div className="row formRow text-center">
                <input type="submit" className="btn btn-primary" value="Update"/>
            </div>
        </form>
    )}
}


ProfileForm.PropTypes = {
    username:PropTypes.string.isRequired,
    avatar:PropTypes.string.isRequired,
    zipcode:PropTypes.number.isRequired,
    email:PropTypes.string.isRequired,
    dispatch:PropTypes.func.isRequired,
    dob:PropTypes.string.isRequired
}

export default connect((state) => {
    return {
        username: state.profile.username,
        avatar: state.profile.avatar,
        zipcode: state.profile.zipcode,
        email: state.profile.email,
        dob: state.profile.dob
    }
})(ProfileForm)
