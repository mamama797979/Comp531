import React from 'react'
import {connect} from 'react-redux'

import Nav from './nav'
import Headline from './headline'
import Following from './following'
import ArticleView from '../article/articleView'

// Main page structure
const Main = () => (
    <div>
        <Nav/>
        <div className="container">
            <div className="col-md-3 text-center">
                <Headline/>
                <Following/>
            </div>
            <div className="col-md-8 col-md-offset-1">
                <ArticleView/>
            </div>
        </div>
    </div>
)

export default connect()(Main)