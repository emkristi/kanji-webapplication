import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className="right">
        <li><NavLink to='/'>Registrer</NavLink></li>
        <li><NavLink to='/'>Logg inn</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;