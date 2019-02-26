import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from '../decks/DeckInfo';
import { Link } from 'react-router-dom'


class Deck extends Component{
    
    constructor(props){
        super(props);
        this.state = { currentCard: (Math.floor(Math.random() * 6)) };
    }
    
    /*
    checkFlashcards = () => {
        //console.log('test', this.props);
        if(this.props.flashcards){ 
            var idd = this.props.flashcards[this.state.currentCard].id;
            if(idd === 'BtrHe7U7ZlaUmFza8unn'){
                console.log('like');
            }else{
                console.log('ikke like');
            }

            console.log('id:', this.props.flashcards[this.state.currentCard].id);
            console.log('rad:', this.props.flashcards[this.state.currentCard].radicals);
        }else{
            console.log('huuuh');
        }
    };
    */

    render(){
        console.log('her:', this.props);
        const {decks, flashcards, auth} = this.props;
    
        //this.checkFlashcards();
        if (!auth.uid) return <Redirect to='/signin' />
        return( 
            <div className="row"> 
                <div className="container" onClick={this.clickDeck}>
                        { decks && decks.map(deck => {
                            return (
                                <Link to={'/deck/' + deck.id} key={deck.id}>
                                    <div className="deck">
                                        <DeckInfo deck={deck}/>
                                    </div>
                                </Link>
                            )
                        })}     
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