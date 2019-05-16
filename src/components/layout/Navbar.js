/**
 * File containing the navbar component
 * @module Navbar
 */
import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'react-materialize'
import { signOut } from '../../store/actions/authActions';
import { Link } from 'react-router-dom'

/**
 * Navbar component. 
 * @param {*} props 
 */
const Navbar = (props) => {
    const { auth } = props;
    const logosrc = "https://firebasestorage.googleapis.com/v0/b/kanjiapp-8f121.appspot.com/o/LOGOLITENNY.jpg?alt=media&token=64293fe7-f33f-485b-8177-f7a4e8ffe6ab"

    return (
        <div>
        {!(window.location.pathname === "/start") && 
            <div>
                <nav className="transparent z-depth-0">
                    <div className="nav-wrapper">
                        {(auth.uid) &&
                            <Link to={'/'}><img className="navlogo" src={logosrc} width="60rem" alt="logo" /></Link>
                        }
                        {!(auth.uid) &&
                            <a href='/start'><img className="navlogo" src="img/LOGOLITENNY.jpg" width="60rem" alt="logo" /></a>
                        }

                        <ul className="right">
                            {(auth.uid) &&
                                <Dropdown trigger={<div className="brand-logo right"><i className="right material-icons md-36">menu</i></div>} options={{coverTrigger: false}}>
                                    <Link to={'/howto'} className="navbarlinks">How to use</Link>
                                    <Link to={'/about'} className="navbarlinks">Credits</Link>
                                    <Link to={'/start'} onClick={props.signOut} className="navbarlinks">Log out</Link>
                                </Dropdown>
                            }

                            {(!auth.uid) &&
                                <Dropdown trigger={<div className="brand-logo right"><i className="material-icons md-36">menu</i></div>} options={{coverTrigger: false}}>
                                    <Link to={'/signup'} className="navbarlinks">Sign up</Link>
                                    <Link to={'/signin'} className="navbarlinks">Log in</Link>
                                    <Link to={'/about'} className="navbarlinks">Credits</Link>
                                </Dropdown>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        }
        </div>       
    )
}

/**
 * Function for getting data from the store
 * @function
 * @param {*} state 
 */
const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

/**
 * Function for dispatching actions
 * @function
 * @param {*} dispatch 
 */
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
