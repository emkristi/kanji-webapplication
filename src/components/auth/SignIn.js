import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    // initial state
    state = {
        email: '',
        password: ''
    }

    /**
     * Function that fires when a user changes an input field
     */
    handleChange = (e) => {
        // setState updates the state
        this.setState({
            [e.target.id]: e.target.value   // target to get the target element, and id to get wither the password or email id, depending on which the user types into. e.target.value -> so that we can update the state with the value with what the user has written into the input field, and the state changes
        })
    }

    /**
     * Function for when a user submits the form
     */
    handleSubmit = (e) => {
        e.preventDefault(); // prevents the default action of the form being submitted and the page being refreshed when button is clicked or enter is pressed
        this.props.signIn(this.state)
    }

  render() {
    const {authError, auth} = this.props;
    if (auth.uid) return <Redirect to='/decks' /> 

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Login</button>
                <div className="red-text center">
                    { authError ? <p>{authError}</p> : null}
                </div>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
