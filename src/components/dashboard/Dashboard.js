import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListOfFlashcards from '../flashcards/ListOfFlashcards'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from '../../../../../../Library/Caches/typescript/3.2/node_modules/redux';

class Dashboard extends Component {
  render() {
    const { flashcards } = this.props;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className="row">
          <ListOfFlashcards flashcards={flashcards}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    flashcards: state.firestore.ordered.flashcards,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'flashcards' }
  ])
)(Dashboard)