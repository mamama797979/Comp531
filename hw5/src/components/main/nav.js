import React from 'react'
import { connect } from 'react-redux'
import {nav2Profile, nav2Index} from '../../actions'
import {logoutAction} from '../auth/authActions'


const Nav = ({dispatch}) => (
  <nav role="navigation" className="navbar navbar-default">
        <div className="navbar-header">
            <a href="#" className="navbar-brand">Rice Book</a>
        </div>
        <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={ ()=> {dispatch(nav2Profile())}}>Profile</a></li>
                <li><a href="#" onClick={ ()=> {dispatch(logoutAction())}}>Logout</a></li>
            </ul>
        </div>
    </nav>
)

export default connect()(Nav)