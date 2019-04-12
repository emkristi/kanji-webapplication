import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { NavLink } from 'react-router-dom'

/**
 * Method for showing links in navbar when the user is logged in
 */
const SignedInLinks = (props) => {
    
    return (
        <ul className="right">
            <li><a onClick={props.signOut}>Log Out</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
} 

export default connect(null, mapDispatchToProps)(SignedInLinks)