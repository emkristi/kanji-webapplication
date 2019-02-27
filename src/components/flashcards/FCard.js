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

  /*
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
  */
  
  handleClick = (e) =>  {
    e.preventDefault();
  
    this.setState((state, props) => {
      return { currentCard: (Math.floor(Math.random() * 6))}
    });

    console.log(this.state.currentCard);
    console.log('test');
  }

  render() {
    const { flashcards, auth, deck } = this.props;
    
    console.log('deck:', this.props.id);
    var dId = this.props.id;
    var arrtest = this.props.flashcards.filter(val => val.deckid === dId); 
    var arrTestLength = arrtest.length;
 

    console.log('arr len: ', arrTestLength);
    console.log('fcards: ',this.props.flashcards);
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        {arrtest && arrtest.length > 0 &&
            <FlashcardInfo flashcard={arrtest[this.state.currentCard]}  />
        }     
        <button onClick={this.handleClick}>Next</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const decks = state.firestore.data.decks;
    console.log(decks);
    const deck = decks ? decks[id] : null
    return {
        id,
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