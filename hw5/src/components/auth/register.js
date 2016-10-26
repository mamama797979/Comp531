import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

//The register form JSX
class Register extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.phone.value = null
            this.birth.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() { return (
        <div className="register_title">
            <form onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                    username:this.username.value,
                    email:this.email.value,
                    phone:this.phone.value,
                    birth:this.birth.value,
                    zipcode:this.zipcode.value,
                    password:this.password.value,
                    pwconf:this.pwconf.value
                }
                this.props.dispatch(register(payload))
            }}>
                <table className="index_table">
                <tbody>
                    <tr>
                        <td>Account Name</td>
                        <td><input id="username" type="text" ref={(node) => this.username = node } placeholder="Account name"/></td>
                    </tr>
                    <tr>
                        <td>Email Address</td>
                        <td><input id="email" type="email" ref={(node) => this.email = node } placeholder="Email"/></td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td><input id="phone" type="tel" ref={(node) => this.phone = node } placeholder="713-213-9708"/></td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td>
                        <td><input id="birth" type="date" ref={(node) => this.birth = node } placeholder="mm/dd/yyyy"/></td>
                    </tr>                                                            
                    <tr>
                        <td>Zipcode</td>
                        <td><input id="zipcode" type="zipcode" ref={(node) => this.zipcode = node } placeholder="77005"/></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input id="password" type="password" ref={(node) => this.password = node } placeholder="Password"/></td>
                    </tr>
                    <tr>
                        <td>Password Confirmation</td>
                        <td><input id="pwconf" type="password" ref={(node) => this.pwconf = node } placeholder="Password confirmation"/></td>
                    </tr> 
                </tbody>                   
                </table>
                <div>&nbsp;</div>
                <div className="btnsignin">
                    <button className="button" id="submitButton" type="submit">Register</button>
                </div>
            </form>
        </div>
    )}
}

export default connect()(Register)

