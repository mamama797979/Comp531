import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({username, onProfile, onMain, dispatch}) => (
    <nav>
      <div>
        { <div>      
            {onProfile?
              <div>
                <li className="button"><a href="#" onClick={() => { dispatch(navToMain()) }}>Main page</a></li>
                <li className="button"><a href="#" onClick={() => { dispatch(logout()) }}>Log out</a></li>
              </div>:''               
            }
            {onMain?
              <div>
                <li className="button"><a href="#" onClick={() => { dispatch(navToProfile()) }}>Profile Page</a></li>
                <li className="button"><a href="#" onClick={() => { dispatch(logout()) }}>Log out</a></li>
              </div>:'' 
            }
          </div>
        }
      </div>
    </nav>
)

export default connect(
  (state) => {
    return {
      username: state.profile.username || '',
      onProfile: state.common.location == 'profile',
      onMain: state.common.location == 'main'}
  })(Nav)
