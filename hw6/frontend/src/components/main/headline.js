import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from '../profile/profileActions'

class Headline extends Component {

    render() { return (
        <div className="user_card">
            <img width="100%" src={ this.props.avatar }/>
            <p id="username">{ this.props.username }</p>
            <p id="headline">{ this.props.headline }</p>
            <div>
                <div>
                    <p><input className="headfield" id="newheadline" type="text"
                        placeholder="update your headline"
                        ref={ (node) => { this.newHeadline = node }}
                        onChange={() => this.forceUpdate()} /></p>
                </div>
                { !(this.newHeadline && this.newHeadline.value.length > 0) ? '' :
                    <div>
                        <p><input className="udtbtn" id="headlineBtn" type="button" value="Update your Headline"
                            onClick={() => {
                                this.props.dispatch(updateHeadline(this.newHeadline.value))
                                this.newHeadline.value = ''
                            }}/></p>
                    </div>
                }
            </div>
        </div>
    )}
}
export default connect(
    (state) => {
        return {
            username: state.profile.username,
            headline: state.profile.headline,
            avatar: state.profile.avatar
        }
    }
)(Headline)
