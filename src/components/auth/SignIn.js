import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app'; //forsøk på å løse warning. Fjerne /app hvis noe ødelegges her
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import '../../CSS/auth.css';
import { Link } from 'react-router-dom';

/*firebase.initializeApp({
    apiKey: 'AIzaSyCDQX_UAYLg44oOF40BGMT14Uk4prHJ5Hk',
    authDomain: 'kanjiapp-8f121.firebaseapp.com'
})
*/
class SignIn extends Component {
	// initial state
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
			signInSuccess: () => false
		}
	};
	componentDidMount = () => {
		firebase.auth().onAuthStateChanged((user) => {
			this.setState({ isSignedIn: !!user });
		});
	};
	/**
     * Function that fires when a user changes an input field
     */
	handleChange = (e) => {
		// setState updates the state
		this.setState({
			[e.target.id]: e.target.value // target to get the target element, and id to get wither the password or email id, depending on which the user types into. e.target.value -> so that we can update the state with the value with what the user has written into the input field, and the state changes
		});
	};

	/*responseFacebook = response =>{
        console.log("respons", response);
    }*/
	componentClicked = (e) => {
		console.log('clicked');
	};
	/**
     * Function for when a user submits the form
     */
	handleSubmit = (e) => {
		e.preventDefault(); // prevents the default action of the form being submitted and the page being refreshed when button is clicked or enter is pressed
		this.props.signIn(this.state);
	};

	render() {
		const { authError, auth } = this.props;
		if (auth.uid) return <Redirect to="/" />;

		return (
			<div className="auth-container center">
				<form onSubmit={this.handleSubmit}>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0 center">Login</button>
						<div className="red-text center">{authError ? <p>{authError}</p> : null}</div>
					</div>
					<div className="fb-login-field">
						{this.state.isSignedIn ? (
							<div>Signed in"</div>
						) : (
							<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
						)}
					</div>
					<div className="center">
						<p>
							Dont have a user? Create one <Link to="/signup">here</Link>{' '}
						</p>
					</div>
				</form>
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
