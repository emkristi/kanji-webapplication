import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from '../decks/DeckInfo';
//fire kort etter hverandre som skal forestille en "bunke"

class Deck extends Component{
    
    constructor(props){
        super(props);
        this.state = { currentCard: (Math.floor(Math.random() * 6)) };
        //console.log(this.state.currentCard);
    }
    
    
    checkFlashcards = () => {
        //console.log('test', this.props);
        if(this.props.flashcards){ 
            var idd = this.props.flashcards[this.state.currentCard].id;
            if(idd === 'BtrHe7U7ZlaUmFza8unn'){

            }

            //console.log('id:', this.props.flashcards[this.state.currentCard].id);
            //console.log('rad:', this.props.flashcards[this.state.currentCard].radicals);
        }else{
            console.log('huuuh');
        }
    };
    

    render(){
        const {decks, flashcards} = this.props;
        
        //console.log("test:", flashcards);
        //console.log("hei", decks);

        this.checkFlashcards();


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
      decks: state.firestore.ordered.decks, // gives an array of the decks.. flashcard property, we are accessing the decks from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
      flashcards: state.firestore.ordered.flashcards,
      auth: state.firebase.auth
      //auth: state.firebase.auth
    }
  }
  
  
  export default compose(
    connect(mapStateToProps), 
    firestoreConnect([ // we use firestoreConnect to tell which collection we want to connect to. takes in an array that contains a series of objects
      { collection: 'decks'
     }
    ]),
    firestoreConnect([
        { collection: 'flashcards'
       }
    ])
 
  )(Deck)