import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' //used to connect to firestore
import { compose } from 'redux';
import FlashcardInfo from '../flashcards/FlashcardInfo';

class Dashboard extends Component {

  // intern this.state -> this.setState for å sette den
  // this.state.currentCard for å bruke
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      hCards: [],
      eCards: []
    };
  }

  test = () => {
    if (this.props.flashcards) {

    }
  };

  handleHard = (e) => {
    this.setState((state) => {
      return {
        hCards: [...state.hCards, this.state.currentCard]
      }
    });
    this.handleClick();
  }

  handleEasy = (e) => {
    this.setState((state) => {
      return {
        eCards: [...state.eCards, this.state.currentCard]
      }
    });
    this.handleClick();
  }

  handleClick = (e) => {
    const { flashcards } = this.props;
    const { users } = this.props;
    const { auth } = this.props;
    console.log("filter", flashcards.filter(item => item.radicals === "")); //sorterer kanjine til å bare være radikaler.


    let i = this.state.currentCard;
    console.log("Current card", i);

    for (let i = 0; i < flashcards.length; i++) {
      console.log("tegn i flashcard", flashcards[i].kanji);
    }

    console.log("users", users);


    //let a= users[i].flashcards[i].radicals; //henter ut radikalene fra en bruker
    //får opp et kanji fra database
    // 1) sjekk om radikalet er gått igjennom, om den finnes i brukerens flashcardarray
    // 2) Hvis i array => sjekk om andre radikalet er i database
    // hvis radikal 1 ikke er i database: Da skal dette radikalet komme opp istedet for kanjien. Legg så i flashcardarray. 


    /*if (users[i].id === "6kSNDh8XyDfpyaGuQhtfYqzbp4o1"){
      console.log("id=", users[i].id)
      let a= users[i].flashcards[i].radicals; //henter ut radikalene fra en bruker
      console.log("radikalene gitt bruker:",a);
    
    }*/

    /* for (let i=0; i<users.length; i++){
       if(users[i].id === auth.uid){
         console.log("uid finnes i id")
         console.log("usersid", users[i].id);
         console.log("uid", auth.uid);
         //IKKE VIS ALLE USERS??!?!
       }
     }*/

    /*
    if(users[i].id !== auth.uid){
      console.log("uid",auth.uid);
      console.log(users[i].id);
    } */


    //Sjekke flashcardtabellen om det finnes radikaler i tabellen. Hvis ja: Gå igjennom denne før kanjien vises.
    if (this.state.eCards.length + 1 === flashcards.length) {
      console.log("Du blir sendt ut av deck");
      window.location.href = '/decks';
      return;
    }

    let user = users[0];
    let currentNumber;// = (Math.round(Math.random() * (flashcards.length - 1)));

    let temp = true;
    let element = "";
    for (let x = 0; x < user.flashcards.length; x++) {
      element += user.flashcards[x].kanji + ", ";
    }
    let element2 = "";
    for (let x = 0; x < flashcards.length; x++) {
      element2 += flashcards[x].kanji + ", ";
    }
    console.log(element, user.flashcards.length);
    console.log(element2, flashcards.length);


    if (user.flashcards.length === flashcards.length + 1) {
      alert("ingen flere kort som ikke er lest");
      temp = false;
    }

    restartWhile:
    while (temp) {
      currentNumber = (Math.round(Math.random() * (flashcards.length - 1)));

      console.log(user.flashcards.includes(flashcards[currentNumber]), flashcards[currentNumber], user.flashcards);

      if (user.flashcards.includes(flashcards[currentNumber]) || this.state.eCards.includes(currentNumber) || currentNumber === this.state.currentCard) {
        //if (user.flashcards.includes(flashcards[currentNumber]) || user.flashcards[user.flashcards.length - 1] === flashcards[currentNumber]) {
        continue restartWhile;
      } else {
        let tempRadicals = flashcards[currentNumber].radicals;
        if (tempRadicals.length === 0) temp = false;
        else {
          for (let i = 0; i < tempRadicals.length; i++) {
            let tempCheck = false;
            for (let j = 0; j < user.flashcards.length; j++) {
              if (tempRadicals[i] === user.flashcards[j].kanji) {
                tempCheck = true;
              }
            }
            if (!tempCheck) {
              continue restartWhile;
            }
            tempCheck = false;
          }
          temp = false;
        }
      }
    }

    user.flashcards.push(flashcards[currentNumber]);

    /* while ((this.state.eCards.includes(currentNumber) || currentNumber === this.state.currentCard)) {
       currentNumber = (Math.round(Math.random() * (flashcards.length - 1)));
       console.log("Nå skal random funksjonen kalles");
       console.log("currentnumber", currentNumber);
 
 
       /*
       if(users[i].flashcards[i].radicals[i].includes("nASldc6p15eNon4U40Wa")){
         console.log("radikal finnes");
       }*/
    /* for (let i = 0; i < users[].length; i++) {
       console.log("users[i]", users[i]);
       if (users[i].flashcards != null) {
         users[i].flashcards.forEach(flashCard => {
           console.log(flashCard.radicals);
         });
       }
     }*/
    //}
    this.setState({
      currentCard: currentNumber
    });
  }

  insertContentFlashcard() {
    //Code to insert content to the flashcard
    var card = document.querySelector('.card');
    console.log("insertContentFlashcard(1)");
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
      console.log("insertContentFlashcard()");
    });
  }

  render() {
    // destructuring to get the flashcards. this grabs the flashcards object off the props. we can now pass the flashcards down as a prop into the ListOfFlashcards component
    const { flashcards } = this.props;
    const { auth } = this.props;

    this.test();

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
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        {flashcards &&
          <FlashcardInfo flashcard={flashcards[this.state.currentCard]} />
        }
        <div>
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
    users: state.firestore.ordered.users,
    decks: state.firestore.ordered.decks,
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
    {
      collection: 'flashcards'
    } // contains one object that says which collection we want to conenct to..
  ]),
  firestoreConnect([ // we use firestoreConnect to tell which collection we want to connect to. takes in an array that contains a series of objects
    {
      collection: 'users' //fikse dette!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } // contains one object that says which collection we want to conenct to..
  ])
  /**
   * When this component is active, tha collection that we are listening to is the flashcards collection
   * and when when this component first loads or the firestore data is changed in the database, this will induce the firestore reducer to sync the store state
   * with that flashcards collection in the firestore. when changes are made -> this component will hear that because its connected to that collection, and it will trigger the firestore reducer to update the state
   * the state of the firestore property in the rootReducer when this component is active on the page, is going to be synced with the flashcards collection in firestore
   */
)(Dashboard)