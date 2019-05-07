/*
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from './FlashcardInfo';
import { Redirect } from 'react-router-dom'
import { addFlashcard } from '../../store/actions/flashcardActions'

class Flashcards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: (Math.floor(Math.random() * 6)),
            currentDeckList: []
        };
    }

    handleClick = (e) => {
        e.preventDefault();

        this.setState((state, props) => {
            return { currentCard: (Math.floor(Math.random() * 6)) }
        });

        this.props.addFlashcard(this.props.flashcards[this.state.currentCard].id);

    }

    handleClickCorrect = (e) => {

    }

    // metode som lager en array bestående av gjeldende kort samt 3 random
    randArray = () => {
        var arr = [];
        arr.push(this.state.currentCard);

        while (arr.length < 4) {
            var random = (Math.floor(Math.random() * 6));
            if (!arr.includes(random)) {
                arr.push(random);
            }
        }
        return arr;
    }

    randArrayKan = () => {

        var arr2 = [];
        arr2.push(this.props.flashcards[this.state.currentCard].kanji);
        while (arr2.length < 4) {
            var r = (Math.floor(Math.random() * 6));
            if (!arr2.includes(this.props.flashcards[r].kanji)) {
                arr2.push(this.props.flashcards[r].kanji)
            }
        }
        arr2.sort(function () { return 0.5 - Math.random() });
        return arr2;
    }

    render() {
        const { flashcards, auth, deck, match: { params: { id } } } = this.props;


        let categoryfcs = [];
        let riktig = null;
        if (flashcards) {
            categoryfcs = flashcards.filter(f => f.deckid == id)
            riktig = categoryfcs[this.state.currentCard].kanji;
        }



        //var randomArr = this.randArrayKan();
        let randomArr = [];

        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">
                {categoryfcs && categoryfcs.length &&
                    <FlashcardInfo hcc={this.handleClickCorrect} hc={this.handleClick} riktigfc={riktig} flashcard={categoryfcs[this.state.currentCard]} deck={this.props.deck} flashcards={categoryfcs} randomArrayList={randomArr} />
                }
            </div>
        )
    }
}

//const mapDispatchToProps = (dispatch) => {
//return {
//addFlashcard: (flashcard) => dispatch(addFlashcard(flashcard)) // will take in this.state from handleSubmit as the flashcard. this wil run the function in flashcardActions and return that function then dispatch.
// }
//}

const mapStateToProps = (state) => {
    const decks = state.firestore.data.decks;
    let flashcards = state.firestore.ordered.flashcards;
    console.log(state);
    //let flashcardsincurrent = flashcards.filter(val => val.deckid === id);
    // const deck = decks ? decks[id] : null;
    return {
        decks: decks,
        flashcards: flashcards,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'decks'
        }
    ]),
    firestoreConnect([
        {
            collection: 'flashcards'
        }
    ])
)(Flashcards)
*/