import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app'; //forsøk på å løse warning. Fjerne /app hvis noe ødelegges her
import '../../CSS/auth.css';
import { Link } from 'react-router-dom';

/**
 * Some of this code is borrowed from tutorial: https://www.youtube.com/watch?v=f4Lg-nzE0u8&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=8
 * 
 * Compontent for signing in to the application. 
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
							<button className="btn">Sign in</button>
							<div className="red-text center">{authError ? <p>{authError}</p> : null}</div>
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
