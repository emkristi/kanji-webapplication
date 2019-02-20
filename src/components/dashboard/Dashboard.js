import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' //used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';
import { NavLink } from 'react-router-dom'

class Dashboard extends Component {

// intern this.state -> this.setState for å sette den
// this.state.currentCard for å bruke

  constructor(props){
    super(props);
    this.state = {currentCard: (Math.floor(Math.random() * 6)),
                  hCards:[],
                  eCards:[],
                  cardList:[0,1,2,3,4,5] //må få denne til å ikke være hardkodet! hente verdier fra DB
    };
    //console.log(this.state.currentCard);
  }


  test = () => {
    //console.log('test', this.props);
    if(this.props.flashcards){
      console.log('id:', this.props.flashcards[this.state.currentCard].id);
      console.log('rad:', this.props.flashcards[this.state.currentCard].radicals);
    }
  };

  handleHard = (e) =>{
    //e.preventDefault();
    console.log("This was hard, let me have this card again");
    console.log("KortId:" + this.state.currentCard /*this.props.flashcards[this.state.currentCard].id*/);
  
    this.setState((state) => {
      return { hCards: [...state.hCards, this.state.currentCard]} /*this.props.flashcards[this.state.currentCard].id]*/
    });
  
    console.log("hCard:",this.state.hCards);
  }

  handleEasy = (e) => {
    //e.preventDefault();
    console.log("This is easy! Give me something harder");
   // console.log("KortId:" + this.state.currentCard /*this.props.flashcards[this.state.currentCard].id*/);

    this.setState((state) => {
      return { eCards: [...state.eCards, this.state.currentCard]
              /*this.props.flashcards[this.state.currentCard].id]*/}
    });

    console.log("eCard:",this.state.eCards);
    console.log("cardList:", this.state.removeCard)
  }
  
  handleClick = (e) =>  {
   e.preventDefault();
   
    this.setState((state) => {
      return { 
        currentCard: (Math.floor(Math.random() * 6))}
    });

    
    //cardList.push(this.state.currentCard)  KOMMER DETTE TIL Å FUNKE KANSKJE??
    
    //når det kommer et kort som har kommet før må denne funksjonen overses
    for (let i = 0; i <this.state.eCards.length; i++) {
      console.log("cc:",this.state.currentCard);
      console.log("ec:",this.state.eCards[i]);
     
      if(this.state.currentCard === this.state.eCards[i]){
        console.log("yesssssssssss");
        for(let j=0; j<this.state.cardList.length; j++){
            while (this.state.cardList.length!==[]){
              this.state.cardList.splice(this.state.cardList.indexOf(this.state.eCards[i]),1); //prints true when working. Vet nå at verdien eksisterer i eCards
              //slett deretter fra cardList

              console.log("REMOVED ELEMENT: ", this.state.cardList); //sletter element fra cardList
          
              return this.state.cardList;
            }
        }
        if(this.state.cardList.length==[]){
          console.log("Ingen flere kort igjen"); //bruker må sendes til startsiden av deck!!!!
          alert("ingen flere kort igjen!! Du blir sendt ut av deck");
          //<li><NavLink to='/decks'></NavLink></li>
        }
       
        
        //Når eCard er fylt opp og alle elementene her finnes i cardList: send bruker ut av decket. 


      }else {
         console.log("Helllllll no")
         //Hva skal skje når cc og ec er ulike?
         //trenger ikke skje noe, for da kommer kortet opp uansett så lenge den ikke er lagret i eCards. 


      }
    }
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
   // const currentCard = (Math.floor(Math.random() * 6));

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