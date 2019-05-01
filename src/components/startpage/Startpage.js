import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class Startpage extends Component {

  render() {
    
    return (
      <div className="startpage center">
        <div className="row tester">
          <div className="col s12">
            <div className="s-content">
              <div classname="row">
                <div className="col s12 m6 l6 center-align">
                  <div className="s-text">Learn Kanji with flashcards! Memji focuses on learning Kanji by learning the radicals that kanjis are built up from before the kanji itself.</div>
                  <br></br>
                  <button className="btn">Sign up</button>
                  <button className="btn">Sign in</button>

                </div>
                <div className="col s12 m6 l6 center-align">
                  <img src="img/LOGO-STOR.jpg" alt="logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}




export default Startpage
