import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListOfDecks from '../decks/ListOfDecks'
import '../../CSS/Dashboard.css'

class Dashboard extends Component {
  render() {
    const { decks } = this.props;

    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className="row">
          <ListOfDecks decks={decks}/>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    decks: state.deck.decks,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Dashboard)