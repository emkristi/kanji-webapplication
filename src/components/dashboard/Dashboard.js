import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';
import { timingSafeEqual } from 'crypto';

class Dashboard extends Component {

// intern this.state -> this.setState for å sette den
// this.state.currentCard for å bruke

  constructor(props){
    super(props);
    this.state = {currentCard: (Math.floor(Math.random() * 6)),
                  hCards:[],
                  eCards:[]
    };
    console.log(this.state.currentCard);
  }


  test = () => {
    //console.log('test', this.props);
    if(this.props.flashcards){
      console.log('id:', this.props.flashcards[this.state.currentCard].id);
      console.log('rad:', this.props.flashcards[this.state.currentCard].radicals);
    }
  };

  handleHard = (e) =>{
    e.preventDefault();
    console.log("bad");
    console.log("KortId:" + this.state.currentCard);
    console.log(this.state.currentCard);
   /* var hardCards = [this.state.currentCard];
    console.log(hardCards);
    var newHardCards = hardCards;
    newHardCards.push(this.state.currentCard);
    */
   // this.setState(hardCards);

   /// console.log(newHardCards);
    this.setState((state) => {
      return { hCards: [...state.hCards, this.state.currentCard]}
    });

    console.log(this.state.hCards);

   }

  handleEasy = (e) => {
    e.preventDefault();
    console.log("good");
    console.log("KortId:" + this.state.currentCard);

    this.setState((state) => {
      return { eCards: [...state.eCards, this.state.currentCard]}
    });

    console.log(this.state.eCards);
  }  

  handleClick = (e) =>  {
   e.preventDefault();
   //Hvis trykket bad:
    //this.handleBad();
    //currentCard = (Math.floor(Math.random() * 6));

    this.setState((state, props) => {
      return { currentCard: (Math.floor(Math.random() * 6))}
    });
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
    // destructuring to get the flashcards. this grabs the flashcards object off the props. we can now pass the flashcards down as a prop into the ListOfFlashcards component
    const { flashcards } = this.props;
    const { auth } = this.props;
    const currentCard = (Math.floor(Math.random() * 6));

    this.test();
    //console.log('test:', this.props.flashcards[this.state.currentCard].eng);
/*

    console.log(currentCard, "currentcard");
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div class="card blue-grey darken-1">
        <div class="card" onClick={this.insertContentFlashcard}>
          <div class="card__face card__face--front">
            <div class="container">
              {flashcards && 
                  <FlashcardInfo flashcard={flashcards[this.state.currentCard]} />
              } 
            </div>
          </div>
          <div class="card__face card__face--back">Engelsk + radikal</div>
        </div>
        <p>Click card to flip</p>
        <button onClick={this.handleClick}>Next</button>

*/

    //console.log("hei", flashcards.props.id);
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        { flashcards && 
            <FlashcardInfo flashcard={flashcards[this.state.currentCard]}  /> 
        }
        <div onClick={this.handleClick}>
        <button onClick={this.handleHard} id="Hard">Hard</button>
        <button onClick={this.handleEasy} id="Easy">Easy</button>
        </div>
      </div>
      
    )
  }
}

/**
 * Function that takes in the state of our store
 * Returns an object that represents which properties that are attached to the props of this component so then we can access them inside this component..
 * This function is passed as a parameter into the connect function so that the connect function knows what to connect to, and what data to get from the store. Were mapping that to the props objects (the
 * props inside the return inside the mapStateToProps). Now we can access props in the dashboard component to get this data (this.props...)
 * @param {*} state 
 */
const mapStateToProps = (state) => {
  console.log(state);
  return {
    flashcards: state.firestore.ordered.flashcards, // gives an array of the flashcards.. flashcard property, we are accessing the flashcards from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
    auth: state.firebase.auth
  }
}


export default compose(
  /**
   * connect() is used to connect the dashboard component with the redux store.
   * connect() is a function which returns a higher order component to take in the Dashboard.
   * We need to map our state from the store to the props in the dashboard component -> mapStateToProps.
   */
  
  connect(mapStateToProps), 
  firestoreConnect([ // we use firestoreConnect to tell which collection we want to connect to. takes in an array that contains a series of objects
    { collection: 'flashcards' } // contains one object that says which collection we want to conenct to..
  ])
  /**
   * When this component is active, tha collection that we are listening to is the flashcards collection
   * and when when this component first loads or the firestore data is changed in the database, this will induce the firestore reducer to sync the store state
   * with that flashcards collection in the firestore. when changes are made -> this component will hear that because its connected to that collection, and it will trigger the firestore reducer to update the state
   * the state of the firestore property in the rootReducer when this component is active on the page, is going to be synced with the flashcards collection in firestore
   */
)(Dashboard)