import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'react-materialize'
import { signOut } from '../../store/actions/authActions';

const Navbar = (props) => {
    const { auth} = props;

    return (
        <div>
        {!(window.location.pathname === "/start") && 
            <div>
                <nav className="transparent z-depth-0">
                    <div className="nav-wrapper">
                        <a href="/"><img className="navlogo" src="img/LOGOLITENNY.jpg" width="60rem" alt="logo" /></a>
                        
                        <ul className="right">
                            {(auth.uid) &&
                                <Dropdown trigger={<a className="brand-logo right"><i className="right material-icons md-36">menu</i></a>} options={{coverTrigger: false}}>
                                    <a className="navbarlinks" href='/howto'>How to play</a>
                                    <a className="navbarlinks" href='/about'>Credits</a>
                                    <a className="navbarlinks" href='/start' onClick={props.signOut}>Log out</a>
                                </Dropdown>
                            }

                            {(!auth.uid) &&
                                <Dropdown trigger={<a className="brand-logo right"><i className="material-icons md-36">menu</i></a>} options={{coverTrigger: false}}>
                                    <a className="navbarlinks" href='/signup'>Sign up</a>
                                    <a className="navbarlinks" href='/signin'>Sign in</a>
                                    <a className="navbarlinks" href='/howto'>How to play</a>
                                    <a className="navbarlinks" href='/about'>Credits</a>
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

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
