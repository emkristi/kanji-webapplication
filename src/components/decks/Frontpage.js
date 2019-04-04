import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from './DeckInfo';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './Decks.css'

class Frontpage extends Component {

    render() {
        const { decks, flashcards, auth, users } = this.props;

        //console.log(flashcards);
        //this.checkDeck();

        let user;
        if (users) {
            user = users.find(u => u.id === auth.uid);
        }

        //console.log(user.flashcardArray);


        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <div className="row test center-align">
                    {flashcards && user && decks && decks.map(deck => {
                        let unfinisheddecks = flashcards.filter(fcard => fcard.deckid === deck.id && user.flashcardArray.indexOf(fcard.id) === -1);
                            if ( unfinisheddecks.length > 0 ) {
                                return (
                                    <div key={deck.id} className="col-sm-6">
                                        <div className="deck">
                                            <Link to={deck.type === "Images" ? '/img/' + deck.id : '/' + deck.id} key={deck.id} className="a">
                                                <DeckInfo deck={deck} />
                                            </Link>
                                        </div>
                                    </div>
                                )
                                
                            } else {
                                return (
                                    <div key={deck.id} className="col-sm-6">
                                        <div className="deck">
                                            
                                            <Link to={deck.type === "Images" ? '/img/' + deck.id : '/' + deck.id} key={deck.id}>
                                                <DeckInfo deck={deck} />
                                            </Link>
                                         
                                        </div>
                                    </div>
                                )
                            }   
                    }
                    )}
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