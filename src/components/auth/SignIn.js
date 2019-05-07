import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app'; //forsøk på å løse warning. Fjerne /app hvis noe ødelegges her
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import '../../CSS/auth.css';
import { Link } from 'react-router-dom';

/**
 * For signing in to the application. 
 * @class
 */
class SignIn extends Component {
	_isMounted = false;
	state = {
		email: '',
		password: '',
		isSignedIn: false,
		name: '',
		userId: ''
	};

	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [ firebase.auth.FacebookAuthProvider.PROVIDER_ID ],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};

	componentDidMount = () => {
		var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			this.setState({ isSignedIn: !!user });
		});
		unsubscribe();
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	componentClicked = (e) => {
		console.log('clicked');
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state);
	};

	render() {
		const { authError, auth } = this.props;
		if (auth.uid) return <Redirect to="/" />;

		return (
			<div className="auth-container">
				<div className="row center">
					<div className="auth-title">Sign In</div>
					<form className="auth-content center" onSubmit={this.handleSubmit}>
						<div className="auth-input">
							<div className="input-field">
								<label htmlFor="email">Email</label>
								<input type="email" id="email" required onChange={this.handleChange} />
							</div>
							<div className="input-field">
								<label htmlFor="password">Password</label>
								<input type="password" id="password" required onChange={this.handleChange} />
							</div>
						</div>
						<div className="input-field">
							<button className="btn">Sign in</button>
							<div className="red-text center">{authError ? <p>{authError}</p> : null}</div>
						</div>
						<div className="auth-text">OR</div>
						<div className="fb-login-field">
							{this.state.isSignedIn ? (
								<div>Signed in"</div>
							) : (
								<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
							)}
						</div>
						<div className="auth-link">
							<p>
								Dont have a user? Create one <Link to="/signup">here</Link>{' '}
							</p>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
