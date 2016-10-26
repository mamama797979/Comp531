import React from 'react'
import Register from './register'
import Login from './login'
import Message from '../message'

// landing page display structure
const Landing = () => (
    <div>
        <div className="jumbotron text-center">
            <h1>Welcome to RiceNet</h1>
        </div>
        <div className="container">
            <Message/>
            <div className="row">
                <Register/>
                <Login/>
            </div>
        </div>
    </div>
)

export default Landing