import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';
import { getSub } from '../../store/actions/flashcardActions';

class Dashboard extends Component {

// intern this.state -> this.setState for å sette den
// this.state.currentCard for å bruke

// var test = (Math.floor(Math.random() * 6));

  constructor(props){
    super(props);
    const rand = this.getRandomNumber();
    this.state = {  currentCard: rand,
                    completedCardsArray: [rand],
                    numComplete: 0
    };

    //console.log(this.state.currentCard);
    //console.log(this.state.completedCardsArray);
    console.log(this.checkIfComplete());
    //console.log(this.getFlashCardByIndex);
    //console.log('kom opp plis: ', this.getFlashCardByIndex())
  }

  getRandomNumber(){
    return (Math.floor(Math.random() * 6))
  }

  getFlashCardByIndex = () => {
    var fml = this.flashcards[this.state.currentCard];
    return fml;
  }


  checkIfComplete() {
    const numcompleted = this.state.completedCardsArray.length;
    const { flashcards } = this.props;

    // liste over alle tallene som er gått gjennom
    var array = this.state.completedCardsArray;



    console.log("test", array);
    console.log("testttttt", array[0]);
    console.log("test2", numcompleted);
    console.log("fokmalif", flashcards);

    for(var i = 0; i < numcompleted; ++i){
      
    }

    return 1203;
  }

  /*
  getSubCollection(){
    this.props.getSub();
    return this.getSub();
  }
*/
  /*
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getSubCollection(); 
    console.log("hello anyone there?");
  }*/

  handleClick = (e) =>  {
    e.preventDefault();

    console.log(this.state.currentCard);
    

    this.setState((state, props) => {
      const rand = this.getRandomNumber();
      return { currentCard: rand,
               completedCardsArray: [...this.state.completedCardsArray, rand],
      }
    });

   // console.log('test: ', this.getSubCollection());
    //console.log(this.state.currentCard);
    //console.log(this.state.completedCardsArray);
    console.log(this.checkIfComplete());
  }

  render() {
    // destructuring to get the flashcards. this grabs the flashcards object off the props. we can now pass the flashcards down as a prop into the ListOfFlashcards component
    const { flashcards } = this.props;
    const { auth } = this.props;

    //console.log(this.state.currentCard);

    //console.log(currentCard);
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

/**
 * Function that takes in the state of our store
 * Returns an object that represents which properties that are attached to the props of this component so then we can access them inside this component..
 * This function is passed as a parameter into the connect function so that the connect function knows what to connect to, and what data to get from the store. Were mapping that to the props objects (the
 * props inside the return inside the mapStateToProps). Now we can access props in the dashboard component to get this data (this.props...)
 * @param {*} state 
 */
const mapStateToProps = (state) => {
  //console.log(state);
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