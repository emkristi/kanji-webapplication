import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from './DeckInfo';
import Flashcards from '../flashcards/Flashcards'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Frontpage extends Component {
    
    render() {
        /*
        let user;
        if (users) {
            user = users.find(u => u.id === auth.uid);
        }
        */

        const { decks, flashcards, auth, users } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="row">
                <div className="content">
                    {decks && decks.map(deck => {
                        return (
                            <div key={deck.id} className="column">
                                <Link to={deck.type === "Images" ? '/img/' + deck.id : '/' + deck.id} key={deck.id}>
                                    <div className="deck">
                                        <DeckInfo deck={deck} />
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state.firestore.ordered.decks, // gives an array of the decks.. flashcard property, we are accessing the decks from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
        flashcards: state.firestore.ordered.flashcards,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([ // we use firestoreConnect to tell which collection we want to connect to. takes in an array that contains a series of objects
        {
            collection: 'decks'
        }
    ]),
    firestoreConnect([
        {
            collection: 'flashcards'
        }
    ])
)(Frontpage)