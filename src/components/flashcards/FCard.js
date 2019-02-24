import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';
import { Redirect } from 'react-router-dom'

class FCard extends Component {

  constructor(props){
    super(props);
    this.state = { currentCard: (Math.floor(Math.random() * 6)),
                    currentDeckList: []};
  }

  
  test = () => {
    if(this.props.flashcards){
        var dId = 'F8tkIG514gs5ewG50iXs';
        var arrtest = this.props.flashcards.filter(val => val.deckid === dId);  

        var kk = 'F8tkIG514gs5ewG50iXs';

        var idh = this.props.flashcards[this.state.currentCard].deckid;
        
      
      console.log('test: ', this.props.deck);


      console.log(arrtest);
    }
  };

  checkIfInDeck = () => {
    var currentDeckId = 'F8tkIG514gs5ewG50iXs';
    var currentCardsDeckId = this.props.flashcards[this.state.currentCard].deckid;
    

    if(currentDeckId === currentCardsDeckId){
        return true;
        /*this.setState((state) => {
            return { currentDeckList: [...state.currentDeckList, cardChecked]}
        })
        */
    }else{
        return false;
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

  

  render() {
    const { flashcards, auth, deck } = this.props;
    console.log(this.props.flashcards);
    console.log(this.test());
    
    var dId = 'F8tkIG514gs5ewG50iXs';
    var arrtest = this.props.flashcards.filter(val => val.deckid === dId);  

    console.log('arr: ', arrtest);
    console.log('fcards: ',this.props.flashcards);
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        
        {/*arrtest && 
            <FlashcardInfo flashcard={arrtest[this.state.currentCard]}  />

        */} 

        
        <p>{deck.title}</p>
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