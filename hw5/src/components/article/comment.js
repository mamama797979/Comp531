import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ContentEditable from './contentEditable'
import { editArticle } from './articleActions'

//Comment JSX
class Comment extends Component {

    constructor(props) {
        super(props)        
        this.disabled = true
    }

    render() {
        const date = moment(new Date(this.props.date))
        return (
        <div>
            <div>
                <h4>
                    <img className="followingImage" src={ this.props.avatar }/>
                    &nbsp;&nbsp;{this.props.author} commented
                    on {date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}
                    <ContentEditable html={this.props.text}
                        contentEditable={this.props.username == this.props.author}
                        tooltip={this.props.username == this.props.author ? 'click to edit' : ''}
                        onChange={(e) => {
                            this.newMessage = e.target.value
                            this.disabled = this.props.text == this.newMessage
                            this.forceUpdate()
                        }}/>
                </h4>
            { this.props.username != this.props.author ? '' :
                <div>
                    <span className="cardbutton"
                        title="Click the text to edit your comment"
                        disabled={ this.disabled }
                        onClick={() => {
                            this.props.dispatch(editArticle(this.props.articleId, this.newMessage))
                            this.disabled = true
                        }}>
                        Update comment
                    </span>
                </div>
            }
            </div>
        </div>
    )}
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
}

export default connect()(Comment)



