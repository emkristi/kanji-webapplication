import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const Testerr = (props) => {
    console.log(props);

    const {deck, auth } = props;
    
    if(!auth.uid) return <Redirect to='/signin'/>
    if(deck){
        return (
            <div className="container section tester">
                <p>{deck.id}</p>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>No flashcards..</p>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const decks = state.firestore.data.decks;
    const deck = decks ? decks[id] : null
    return {
        deck: deck,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'decks'
    }])
)(Testerr)