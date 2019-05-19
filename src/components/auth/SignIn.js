/**
 * File for the SignIn component.
 * @module SignIn
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import '../../CSS/auth.css';
import { Link } from 'react-router-dom';

/**
 * Compontent for signing in to the application. 
 * Some of this code is borrowed from tutorial: https://www.youtube.com/watch?v=f4Lg-nzE0u8&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=8
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
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};

	/**
	 * @method
	 */
	componentDidMount = () => {
		var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			this.setState({ isSignedIn: !!user });
		});
		unsubscribe();
	};

	/**
	 * Handles input field
	 * @function
	 */
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	/**
	 * Signs in user if sign in button is clicked
	 * @function
	 */
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state);
	};

	render() {
		const { authError, auth } = this.props;
		if (auth.uid) return <Redirect to="/home" />;

		return (
			<div className="info-content">
				<div className="row">
                	<div className="col s12">
						<div className="auth-container">
			
				<div className="row">
					<div className="auth-title center">Log In</div>
					<form className="auth-content center" onSubmit={this.handleSubmit}>
						<br></br>
						<br></br>
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
						<br></br>
						<div className="input-field">
							<button className="btn">Log in</button>
							<div className="red-text center">{authError ? <p>{authError}</p> : null}</div>
						</div>
					
						<div className="auth-link">
							<p>Dont have a user? Create one <Link to="/signup">here</Link>{' '}</p>
						</div>
					</form>
				</div>
				</div>
				</div>
			</div>
			</div>
		);
	}
}

/**
 * Function for getting data from the store
 * @function
 * @param {*} state 
 */
const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	};
};

/**
 * Function for dispatching actions
 * @function
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
