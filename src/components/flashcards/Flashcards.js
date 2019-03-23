import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' //used to connect to firestore
import { compose } from 'redux';
import Flashcard from '../flashcards/Flashcard';
import { addFlashcard } from '../../store/actions/flashcardActions'

class Flashcards extends Component {
  // intern this.state -> this.setState for å sette den
  // this.state.currentCard for å bruke
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      eCards: [],
      radicals: [],
    };
  }

  handleHard = (e) => {
    this.handleClick();
  }

  handleEasy = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { currentCard, eCards } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);

    addFlashcard(categoryfcs[currentCard].id);
    this.setState({ eCards: [...eCards, currentCard] });

    this.handleClick();
  }

  handleClick = (e) => {
    const { flashcards, match: { params: { id } }, auth } = this.props;
    const { currentCard, eCards, radicals } = this.state;

    let categoryfcs = flashcards.filter(f => f.deckid == id);

    if (eCards.length === categoryfcs.length) { //denne funksjonen er riktig
      window.location.href = '/decks';

      return;
    }

    let currentNumber = 0;
    if (radicals.length > 0) {
      let currentradical = radicals[0].id; //show first radical

      let value = categoryfcs.find((val) => {
        return (val.id == currentradical)
      });

      currentNumber = categoryfcs.indexOf(value);
      this.setState({ radicals: radicals.splice(1, radicals.length - 1) })
    } else {
      let user = auth.providerData[0];

      let temp = true;
      while (temp) {
        currentNumber = (Math.round(Math.random() * (categoryfcs.length - 1)));
        if (!((user.flashcards && user.flashcards.includes(categoryfcs[currentNumber])) || eCards.includes(currentNumber) || currentNumber === currentCard)) {
          // found unseen flashcard. contains radicals?
          let fcradicals = categoryfcs[currentNumber].radicals;
          if (fcradicals.length > 0) {
            //has seen all radicals?
            let notseen = [];

            for (let i = 0; i < fcradicals.length; i++) {
              if (!(user.flashcards && user.flashcards.includes(fcradicals[i].id))) {
                notseen.push(fcradicals[i]);
              }
            }
            if (notseen.length > 0) { //if there are radicals which are not seen
              let currentradical = notseen[0].id; //show first radical
              //find index of radical id
              let value = categoryfcs.find((val) => {
                return (val.id == currentradical)
              });
              let flashcard = categoryfcs[currentNumber];
              currentNumber = categoryfcs.indexOf(value);
              let notseenid = notseen.map(ele => ele.id).filter(ele => ele !== notseen[0].id);
              let newarray = radicals;
              for (let i = 0; i < notseen.length; i++) {
                newarray.push(notseen[i]);
              }
              newarray.push(flashcard.id);
              console.log("newarray", newarray);
              this.setState({ radicals: newarray });

            }
            temp = false;
          }
          temp = false;
        }
      }
    }

    this.setState({
      currentCard: currentNumber
    });
  }

  insertContentFlashcard() {
    //Code to insert content to the flashcard
    var card = document.querySelector('.card');
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
    });
  }

  render() {
    const { flashcards, match: { params: { id } }, auth } = this.props;
    const { currentCard, eCards } = this.state;

    console.log(eCards);
    let categoryfcs = [];
    if (flashcards) {
      categoryfcs = flashcards.filter(f => f.deckid === id)
    }
    if (!auth.uid) return <Redirect to='/signin' />

    if (!categoryfcs[currentCard]) return <div>Not defined</div>
    return (
      <div className="dashboard container">
        {categoryfcs.length &&
          <Flashcard flashcard={categoryfcs[currentCard]} />
        }
        <div>
          {/*<button onClick={this.handleHard} id="Hard">Hard</button>*/}
          <button onClick={this.handleEasy} id="Easy">Easy</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    flashcards: state.firestore.ordered.flashcards, // gives an array of the flashcards.. flashcard property, we are accessing the flashcards from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'flashcards' }
  ]),
  firestoreConnect([
    { collection: 'decks' }
  ])
)(Flashcards)