import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';
//fire kort etter hverandre som skal forestille en "bunke"

class Deck extends Component{
    render(){
        const {projects} = this.props;

        return(
            <div class="row">
                <div class="column">
                    <div class="deck">
                    <h3>Deck 1</h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                    </div>
                </div>

                <div class="column">
                    <div class="deck">
                    <h3>Deck 2</h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                    </div>
                </div>
                
                <div class="column">
                    <div class="deck">
                    <h3>Deck 3</h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                    </div>
                </div>
                
                <div class="column">
                    <div class="deck">
                    <h3>Deck 4</h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        flashcards: state.firestore.ordered.flashcard
    }
}


export default compose(
connect (mapStateToProps),
firestoreConnect([
    { collection: 'flashcards' }
])
)(Deck)