import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import '../../CSS/auth.css'


class Startpage extends Component {
    


  render() {
    
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <div className="s-text center">
              Memji is a language application made for learning and memorizing Kanji by using flashcards. This webapplication focuses on teaching not only Kanji but also the radicals that the Kanjis are made up of.
            </div>
          </div>

          <div className="col s6">
            <img className="center-align" src="img/LOGO-STOR.jpg" width="250rem" alt="logo" />
          </div>
        </div>
     

           
      </div>
    )
  }
}




export default Startpage
