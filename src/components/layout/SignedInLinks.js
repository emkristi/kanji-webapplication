import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions';

/**
 * Method for showing links in navbar when the user is logged in
 */
const SignedInLinks = (props) => {
    return (
        <ul className="left">
            <li><NavLink to='/howto'>How does it work</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/start' onClick={props.signOut}>Log out</NavLink></li>
        </ul>
        
    )
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
