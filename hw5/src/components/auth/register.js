import React from 'react'
import { connect } from 'react-redux'
import { RegisterAction} from './registerActions'


const Register = ({dispatch}) => {
    let accountName, displayName, email, dateOfBirth, zipcode, password, confirmPassword;

    // Register form
    return(
    <div className="col-sm-6 well">
        <div className = "text-center">
            <h2>Register</h2>
        </div>
        <form  onSubmit= {(e) => {
            e.preventDefault();
            dispatch(RegisterAction());
        }}>
        <div className="form-group row">
            <label htmlFor="example-text-input" className="col-xs-4 col-form-label">Account Name</label>
            <div className="col-xs-8">
                <input className="form-control" type="text" name="account name" ref={(node) => { accountName = node }} required/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="example-text-input" className="col-xs-4 col-form-label">Display name (optional)</label>
            <div className="col-xs-8">
                <input className="form-control" type="text" name="display name" ref={(node) => { displayName = node }}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="example-text-input" className="col-xs-4 col-form-label">Email</label>
            <div className="col-xs-8">
                <input className="form-control" type="email" placeholder="eg. a@b.co" name="email address" ref={(node) => { email = node }} required/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="example-text-input" className="col-xs-4 col-form-label">Date of birth</label>
            <div className="col-xs-8">
                <input className="form-control" type="text" name="date of birth" placeholder="mm-dd-year" pattern="^\d{1,2}-\d{1,2}-\d{4}$" ref={(node) => { dateOfBirth = node }} required/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="example-text-input" className="col-xs-4 col-form-label">Zipcode</label>
            <div className="col-xs-8">
                <input className="form-control" type="text" name="zipcode" placeholder="77005" pattern="^\d{5}(?:[-\s]\d{4})?$" ref={(node) => { zipcode = node }}required/>
            </div>
        </div>
        <div className="form-group row">
            <label  className="col-xs-4 col-form-label">Password</label>
            <div className="col-xs-8">
                <input className="form-control" type="password" name="password" placeholder="Password" id="password" ref={(node) => { password = node }} required/>
            </div>
        </div>
            <div className="form-group row">
            <label htmlFor="example-text-input" className="col-xs-4 col-form-label">Password confirmation</label>
            <div className="col-xs-8">
                <input className="form-control" type="password" name="password confirmation" placeholder="Confirm Password" ref={(node) => { confirmPassword = node }} required/>
            </div>
        </div>
        <input type="hidden" name="timestamp" id="timestamp"/>
        <div className = "col-xs-8 col-md-offset-4">
            <input type="submit" className="btn btn-primary" value="Submit"/>
            <input type="button" className="btn btn-primary" value="Clear" onClick={()=>{
                accountName.value=''
                displayName.value=''
                email.value=''
                dateOfBirth.value=''
                password.value=''
                confirmPassword=''
            }}/>
        </div>
        </form>
        </div>
        )}

    export default connect()(Register)