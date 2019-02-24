import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';
import { deckAuth } from '../../store/actions/deckActions';
import { Redirect } from 'react-router-dom'
import { throws } from 'assert';


class FCard extends Component {

  constructor(props){
    super(props);
    this.state = { currentCard: (Math.floor(Math.random() * 6))};
  }
  
  test = () => {
    if(this.props.flashcards){
      var did = 'F8tkIG514gs5ewG50iXs';
      var idh = this.props.flashcards[this.state.currentCard].deckid;
  
      if(idh === did){
        console.log('eeeyyyyoo')
      }

    }
  };

  checkIfInDeck = () => {
    var currentDeckId = 'F8tkIG514gs5ewG50iXs';
    var currentCardsDeckId = this.props.flashcards[this.state.currentCard].deckid;

    if(currentDeckId === currentCardsDeckId){

    }
    
  }
  
  handleClick = (e) =>  {
    e.preventDefault();
    //currentCard = (Math.floor(Math.random() * 6));
  
    this.setState((state, props) => {
      return { currentCard: (Math.floor(Math.random() * 6))}
    });

    console.log(this.state.currentCard);
    //console.log(this.props)
    console.log('test');
  }

  insertContentFlashcard (){
    //Code to insert content to the flashcard
    var card = document.querySelector('.card');
    console.log("insertContentFlashcard(1)");
    card.addEventListener( 'click', function() {
      card.classList.toggle('is-flipped');
      console.log("insertContentFlashcard()");
    });
  }

  render() {
    const { flashcards, auth, deck } = this.props;
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        
        { flashcards && 
            <FlashcardInfo flashcard={flashcards[this.state.currentCard]}  />
        } 
        <button onClick={this.handleClick}>Next</button>
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
        flashcards: state.firestore.ordered.flashcards,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
      { collection: 'decks'
        }
    ]),
    firestoreConnect([
        { collection: 'flashcards'
       }
    ])
 
  )(FCard)