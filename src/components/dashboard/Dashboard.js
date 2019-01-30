import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListOfDecks from '../decks/ListOfDecks'
import '../../CSS/Dashboard.css'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from '../../../../../../Library/Caches/typescript/3.2/node_modules/redux';

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
  console.log(state);
  return {
    decks: state.firestore.ordered.decks,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'decks' }
  ])
)(Dashboard)