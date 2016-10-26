import React from 'react'
import {connect} from 'react-redux'

//Create new article
const NewArticle = () =>{

    return (
        <div className="row text-center">
            <textarea rows="4" cols="60" id="new-post-textarea"></textarea>
            <br/>
            <label className="btn btn-default btn-file">Upload Image<input type="file" style={{display: 'none'}}/></label>
            <button type="button" className="btn btn-danger" id="clear-new-post">Cancel</button>
            <button type="button" className="btn btn-success">Update</button>
        </div>
    )
}

export default connect()(NewArticle)