import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { putProfileHeadline} from '../profile/profileActions'

//Headline component
const Headline = ({avatar, headline, dispatch}) => {
    let newHeadline;
    return(<div className="well">
        <div className="row">
            <img src={avatar} style={{height:'100px'}}/>
        </div>
        <div className="row">
            <br/>
            <p><label>My status:</label></p>
            <p>{headline}</p>
            <input type="text" className="form-control input-sm" style={{maxlength:"64px"}} placeholder="Update Status" ref={(node) => {newHeadline=node}}/>
            <br/>
            <button type="button" className="btn btn-primary" onClick={()=>
                {if(newHeadline.value.length!==0) {
                    dispatch(putProfileHeadline(newHeadline.value));
                    newHeadline.value = ''
                }
            }}>Update</button>
        </div>
    </div>)}

Headline.PropTypes = {
    avatar: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired
}

export default connect((state) => {
    return {
        avatar: state.profile.avatar,
        headline: state.profile.headline
    }
})(Headline)