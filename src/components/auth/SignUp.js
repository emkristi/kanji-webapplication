/**
 * File for the SignUp component. Some of this code is borrowed from this tutorial https://www.youtube.com/watch?v=f4Lg-nzE0u8&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=8
 * @module SignUp
 */

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import '../../CSS/auth.css'
import { Link } from 'react-router-dom';


/**
 * For signing up to the application
 * @class
 */
class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }

    /**
     * Function that fires when a user changes an input field
     */
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

     /**
     * Function for submitting the form
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

  render() {
    const {authError, auth} = this.props;
    if (auth.uid) return <Redirect to='/howto' />  

    return (
    <div>
    <div className="info-content">
        <div className="row">
        <div className="col s12">

      <div className="auth-container center">
      <div className="auth-title">Sign Up</div>

        <form onSubmit={this.handleSubmit}>
            <div className="auth-input">
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" onChange={this.handleChange}/>
            </div>
            </div>
            <div className="input-field">
                <button className="btn">Sign up</button>
                <div className="red-text center">
                    {authError ? <p>{ authError }</p> : null }
                </div>
            
            </div>

            <div className="auth-link">
                <p>Already have a user? Click <Link to ='/signin'>here</Link> to sign in</p>
            </div>
        </form>
      </div>
      </div>
      </div>
      </div>
      </div>
      
    )
  }
}

/**
 * Function for getting data from the store
 * @function
 * @param {*} state 
 */
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

/**
 * Function for dispatching actions
 * @function
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
