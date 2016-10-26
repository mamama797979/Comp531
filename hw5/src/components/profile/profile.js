import React from 'react'
import { connect } from 'react-redux'

import {nav2Main} from '../../actions'
import {nav2Index} from '../../actions'
import Message from '../message'
import ProfileForm from './profileForm'

//Profile page structure
const Profile = ({dispatch}) => (
    <div>
        <p><a className="btn btn-primary" href="#" onClick={ () => {dispatch(nav2Main())}} role="button">Main Page</a></p>
        <p><a className="btn btn-primary" href="#" onClick={ () => {dispatch(nav2Index())}} role="button">Log Out</a></p>
        <div className="jumbotron text-center">
            <h1>Profile:</h1>
        </div>
        <Message/>
        <ProfileForm/>
    </div>
)

export default connect()(Profile)