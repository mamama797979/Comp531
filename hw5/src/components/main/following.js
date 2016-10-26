import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'

//Follower display structure
const Follower = ({name, avatar, headline}) => (
    <div className="row text-center">
        <br/>
        <img src = {avatar}/>
        <br/>
        <p>{name}</p>
        <p>{headline}</p>
        <button type="button" className="btn btn-danger">Unfollow</button>
    </div>
)


class Following extends Component {
    render(){
        //Display followers
        return(
        <div className="well">
        
            {Object.keys(this.props.followers).sort().map((username) => this.props.followers[username]).map((follower)=> 
                <Follower key = {follower.name} name = {follower.name} avatar = {follower.avatar} headline = {follower.headline}/>)}
        
            <div className="form-group row">
                <br/>
                <input className="form-control" type="text" placeholder="Friend" id="login_account_name"/>
                <br/>
                <button className="btn btn-primary">Add New Friend</button>
                <br/>
            </div>
        </div>
    )}
}


Following.PropTypes = {
    followers: PropTypes.object.isRequired,
}

export default connect((state)=>{
    return {
        followers: state.followers.followers
    }
})(Following)