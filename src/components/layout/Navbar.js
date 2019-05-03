import React from 'react';
import { Link } from 'react-router-dom';
//import SignedInLinks from './SignedInLinks';
//import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { Dropdown } from 'react-materialize';
import { signOut } from '../../store/actions/authActions';

const Navbar = (props) => {
	const { auth } = props;
	//const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
	console.log(window.location.pathname);

	return (
		<div>
			{!(window.location.pathname === '/start') && (
				<div>
					<nav className="transparent z-depth-0">
						<div className="nav-wrapper">
							<Link to="/">
								<img className="navlogo" src="img/LOGOLITENNY.jpg" width="60rem" alt="logo" />
							</Link>
							<ul className="right">
								{auth.uid && (
									<Dropdown
										trigger={
											<a className="brand-logo">
												<i className="material-icons md-36">menu</i>
											</a>
										}
										options={{ coverTrigger: false }}
									>
										<a href="/howto">How to play</a>
										<a href="/about">Credits</a>
										<a href="/start" onClick={props.signOut}>
											Log out
										</a>
									</Dropdown>
								)}

								{!auth.uid && (
									<Dropdown
										trigger={
											<a className="brand-logo">
												<i className="material-icons md-36">menu</i>
											</a>
										}
										options={{ coverTrigger: false }}
									>
										<a href="/signup">Sign up</a>
										<a href="/signin">Sign in</a>
										<a href="/howto">How to play</a>
										<a href="/about">Credits</a>
									</Dropdown>
								)}
							</ul>
						</div>
					</nav>
				</div>
			)}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
