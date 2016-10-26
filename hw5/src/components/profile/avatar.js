import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadImage } from './profileActions'

class Avatar extends Component {

    componentDidUpdate(oldprops) {
        if (oldprops.img != this.props.img) {
            this.preview = undefined
            this.file = undefined
            this.forceUpdate()
        }
    }

    handleImageChange(e) {
        e.preventDefault()

        let reader = new FileReader();
        reader.onloadend = () => {
            this.preview = reader.result
            this.forceUpdate();
        }

        this.file = e.target.files[0];
        reader.readAsDataURL(this.file)
    }

    render() { return (
        <div className="index_table2">
            <img width="100%" height="50%" src={this.props.img}/>
            <em>Upload new avatar</em>
            <p><input type="file" accept="image/*" onChange={(e) => this.handleImageChange(e)}/></p>
            <div>
            { !this.file ? '' :
                <div>
                    <div>
                        <img width="100%" src={this.preview}/>
                    </div>
                    <div>
                        { this.file.webkitRelativePath || this.file.name } ({ parseInt(this.file.size / 1024 * 100)/100.0 } kB)
                    </div>
                    <input className="card_button" type="button" value="Update Profile Picture" onClick={() => { this.props.dispatch(uploadImage(this.file)) }}/>
                </div>
            }
            </div>
            <p>Xintong Ma</p>
            <p>05/08/1993</p>         
        </div>

    )}
}

export default connect(
    (state) => {
        return {
            img: state.profile.avatar
        }
    }
)(Avatar)


