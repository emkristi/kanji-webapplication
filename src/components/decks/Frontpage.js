import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from './DeckInfo';
import Flashcards from '../flashcards/Flashcards'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Frontpage extends Component {


    // sjekk om alle flashcards i et deck finnes i flashcardArray til brukeren
    checkDeck = () => {
        const { flashcards, match: { params: { id } }, auth, users } = this.props;

        

        //radarray = rad.map(r => flashcards.find(f => f.id === r.id).kanji);
    } 


    render() {
        const { decks, flashcards, auth } = this.props;
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
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
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
    ]),
    firestoreConnect([
        { 
            collection: 'users' 
        }
    ])
)(Frontpage)