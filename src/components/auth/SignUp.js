import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import '../../CSS/auth.css'
import { Link } from 'react-router-dom';



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
        this.props.signUp(this.state)
        this.props.history.push('/howto');

    }

  render() {
    const {authError, auth} = this.props;
    if (auth.uid) return <Redirect to='/' />  

    return (
    <div>
        <div className="row" margin="30px">

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
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatch takes in the action creator which is signUp, imported at top
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
