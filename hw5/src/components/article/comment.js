import React from 'react'
import { connect } from 'react-redux'

//Display comment
const Comment = ({author, date, text}) => {
    return (
    <div className='row'>
        <h5> {author} commented on {date} </h5>
        <p> {text} </p>
    </div>
    )
}

export default connect()(Comment)