import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from '../decks/DeckInfo';
//fire kort etter hverandre som skal forestille en "bunke"

class Deck extends Component{
    render(){
        const {decks} = this.props;
        console.log("test:");

        return( 
            <div className="row"> 
                <div className="column">
                    <div className="deck">
                    <h3>{ decks && 
                        <DeckInfo deck={decks[0]}  />
                    } </h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                    </div>
                </div>

                <div className="column">
                    <div className="deck">
                    <h3>{ decks && 
                        <DeckInfo deck={decks[1]}  />
                    } </h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                    </div>
                </div>
                
                <div className="column">
                    <div className="deck">
                    <h3>{ decks && 
                        <DeckInfo deck={decks[2]}  />
                    } </h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                    </div>
                </div>
                
                <div className="column">
                    <div className="deck">
                    <h3>{ decks && 
                        <DeckInfo deck={decks[3]}  />
                    } </h3>
                    <p>Noe tekst</p>
                    <p>Tekst</p>
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
      decks: state.firestore.ordered.decks // gives an array of the decks.. flashcard property, we are accessing the decks from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
      //auth: state.firebase.auth
    }
  }
  
  
  export default compose(
    connect(mapStateToProps), 
    firestoreConnect([ // we use firestoreConnect to tell which collection we want to connect to. takes in an array that contains a series of objects
      { collection: 'decks' } // contains one object that says which collection we want to conenct to..
    ])
 
  )(Deck)