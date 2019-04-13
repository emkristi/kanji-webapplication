import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Method for showing links in navbar when the user is not logged in
 */
const SignedOutLinks = () => {
    return (
        <ul className="left">
            <li><NavLink to='/signup'>Sign up</NavLink></li>
            <li><NavLink to='/signin'>Sign in</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks