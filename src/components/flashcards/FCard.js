import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';
import { Redirect } from 'react-router-dom'
import {createFlashcard} from '../../store/actions/flashcardActions'

class FCard extends Component {

  constructor(props){
    super(props);
    this.state = { 
        currentCard: (Math.floor(Math.random() * 6)),
        currentDeckList: []
    };
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

    
    this.props.createFlashcard(this.props.flashcards[this.state.currentCard]); 

    console.log("gjeldende flashcard", this.props.flashcards[this.state.currentCard]);

  }

  handleClickCorrect = (e) => {
    //console.log(rikt);
    //console.log(randar);

  }

  // metode som lager en array bestående av gjeldende kort samt 3 random
  randArray = () => {
      var arr = [];
      arr.push(this.state.currentCard);

      //console.log('arr1', arr);

      while(arr.length < 4){
        var random = (Math.floor(Math.random() * 6)); 

        //console.log('randum', random)

        if(!arr.includes(random)){
            arr.push(random);
        }
      }
      //console.log('arr2', arr)
      return arr;
  }

  randArrayKan = () => {

      var arr2 = [];

      // hent ut random kan og bruk
      //console.log('1', this.props.flashcards[this.state.currentCard].kanji);
      
      arr2.push(this.props.flashcards[this.state.currentCard].kanji);
      //console.log('current card', this.props.flashcards[this.state.currentCard].kanji);
      //console.log('arrrrr2', arr2);
      //console.log('2', this.props.flashcards[this.state.currentCard].kanji);

      while(arr2.length < 4){
          var r = (Math.floor(Math.random() * 6)); 
          //console.log('r', this.props.flashcards[r].kanji);
          if(!arr2.includes(this.props.flashcards[r].kanji)){
              arr2.push(this.props.flashcards[r].kanji)
          }
      }
      //console.log('arrr2222', arr2);
      arr2.sort(function(){ return 0.5 - Math.random() });
      //console.log('rrrrrrand', arr2);
      return arr2;
  }

        
    

  render() {
    const { flashcards, auth, deck, flashcardsincurrent } = this.props;
    
    //console.log('deck t:', this.props.deck); // Tittel og type deck...
    //this.randArray();
    //console.log('hhh', );

    console.log("flashcards: ", this.props.flashcards);
    console.log("lagres i db?: ", this.props.flashcards[this.state.currentCard])
    console.log("current gard:", this.state.currentCard);
  
    //console.log('funker dette?', this.randArray());
    var dId = this.props.id;

    var riktig = this.props.flashcards[this.state.currentCard].kanji;

    //console.log('currcard2', this.props.flashcards[this.state.currentCard].kanji);
    

    // arrtest henter ut alle arrays i gjeldende deck
    var arrtest = this.props.flashcards.filter(val => val.deckid === this.props.id); 
    //console.log('hehe', arrtest);

    //var arrTestLength = arrtest.length;

    // array av random cards
    var randomArr = this.randArrayKan();

    //console.log('hehhe', this.randArrayKan());
     
    
    //console.log('fcards: ',this.props.flashcards);
    
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        {arrtest && arrtest.length > 0 &&
            <FlashcardInfo hcc={this.handleClickCorrect} hc={this.handleClick} riktigfc={riktig} flashcard={arrtest[this.state.currentCard]} deck={this.props.deck} flashcards={this.props.flashcards} randomArrayList={randomArr}  />
        }     
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      createFlashcard: (flashcard) => dispatch(createFlashcard(flashcard)) // will take in this.state from handleSubmit as the flashcard. this wil run the function in flashcardActions and return that function then dispatch.
  }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const decks = state.firestore.data.decks;
    let flashcards = state.firestore.ordered.flashcards;
    let flashcardsincurrent = flashcards.filter(val => val.deckid === id)
    //console.log(decks);
    const deck = decks ? decks[id] : null
    return {
        id,
        flashcardsincurrent,
        deck: deck,
        flashcards: state.firestore.ordered.flashcards,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
      { collection: 'decks'
        }
    ]),
    firestoreConnect([
        { collection: 'flashcards'
       }
    ])
 
  )(FCard)
