import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { Dropdown } from 'react-materialize';

const Navbar = (props) => {
	const { auth, profile } = props;
	const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
	return (
		<div>
			<nav className="transparent z-depth-0">
				<div className="nav-wrapper">
					<a href="/" className="brand-logo left">
						<i className="material-icons">cloud</i>MEMJI
					</a>
					<ul className="right">
						<Dropdown
							trigger={
								<a className="brand-logo">
									<i className="material-icons md-36">menu</i>
								</a>
							}
							options={{ coverTrigger: false }}
						>
							{links}
						</Dropdown>
					</ul>
				</div>
			</nav>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapStateToProps)(Navbar);
