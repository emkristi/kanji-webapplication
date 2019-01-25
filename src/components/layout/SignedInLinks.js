import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Lag ny bunke</NavLink></li>
            <li><NavLink to='/'>Logg ut</NavLink></li>
        </ul>
    )
}

export default SignedInLinks;