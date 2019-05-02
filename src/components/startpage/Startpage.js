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
              <div className="col s12 m6 l5">
                  <img src="img/LOGO-STOR.jpg" alt="logo" />
                </div>


                <div className="col s12 m6 l7 ">
                  <div className="s-title">Learn Kanji with flashcards</div>
                  <div className="s-text">Memji focuses on learning Kanji by learning the radicals that kanjis are built up of.</div>
                  <br></br>
                  <a href="/signup"><button className="btn startpage-btn">Sign up</button></a>
                  <a href="/signin"><button className="btn startpage-btn">Sign in</button></a>
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
