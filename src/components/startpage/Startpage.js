import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import '../../CSS/auth.css'


class Startpage extends Component {
    


  render() {
    
    return (
      <div className="container center-align">
     
            <img class="" src="img/LOGO-STOR.jpg" width="500rem" alt="logo" />

           
      </div>
    )
  }
}




export default Startpage
