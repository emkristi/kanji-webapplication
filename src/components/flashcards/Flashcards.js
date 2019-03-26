import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' //used to connect to firestore
import { compose } from 'redux';
import Flashcard from '../flashcards/Flashcard';
import { addCompletedFlashcards } from '../../store/actions/flashcardActions'
import { removeCompletedFlashcards } from '../../store/actions/flashcardActions'

class Flashcards extends Component {
  // intern this.state -> this.setState for å sette den
  // this.state.currentCard for å bruke
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      bufferfc: []
    };
  }

  handleHard = (e) => {
    this.changeFc();
    
  }

  handleEasy = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);
    // Legg til flashcard i DB
    this.props.addCompletedFlashcards(categoryfcs);

    this.changeFc();
  }

  testKnapp = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);

    for(let i = 0; i < categoryfcs.length; ++i){

    }
    
  }

  findIndexOfFcId = (categoryfcs, fcid) => {
    let value = categoryfcs.find((val) => {
      return (val.id == fcid)
    });
    return categoryfcs.indexOf(value);
  }

  findFlashcardById = (id) => {
    const { flashcards } = this.props;
    return flashcards.find(f => f.id === id);
  }

  changeFc = (e) => {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;
    const { currentCard, bufferfc } = this.state;

    let categoryfcs = flashcards.filter(f => f.deckid === id);
    let user = users.find(u => u.id == auth.uid);
    const seenFc = user.flashcardArray ? user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id) : [];

    // If no more unseen flashcards, go back to frontpage
    if (seenFc.length === categoryfcs.length - 1) {
      window.location.href = '/';
      return;
    }

    let currentNumber = 0;
    // If flashcards in buffer, show first element and remove element from buffer
    if (bufferfc.length > 0) {
      currentNumber = this.findIndexOfFcId(categoryfcs, bufferfc[0]);
      if (bufferfc.length > 1) {
        this.setState({ bufferfc: bufferfc.splice(1, bufferfc.length - 1) })
      } else {
        this.setState({ bufferfc: [] });
      }
      // If no flashcards in buffer, find random flashcard from category flashcards
    } else {
      let temp = true;
      while (temp) {
        currentNumber = (Math.round(Math.random() * (categoryfcs.length - 1)));
        // If this random flashcard is not seen before
        if (!((user.flashcardArray && user.flashcardArray.includes(categoryfcs[currentNumber].id) || currentNumber === currentCard))) {
          //Check if random flashcard's got radicals
          let fcradicals = categoryfcs[currentNumber].radicals;
          if (fcradicals.length > 0) {
            let notseen = [];
            for (let i = 0; i < fcradicals.length; i++) {
              if (!((user.flashcardArray && user.flashcardArray.includes(fcradicals[i].id)) || currentCard === this.findIndexOfFcId(categoryfcs, fcradicals[i].id))) {
                notseen.push(fcradicals[i].id); // add unseen radical to array
              }
            }
            //if there are radicals who are not seen, show first radical in array and push others + parent flashcard to buffer array in state
            if (notseen.length > 0) {
              let flashcard = categoryfcs[currentNumber];
              currentNumber = this.findIndexOfFcId(categoryfcs, notseen[0]);
              let newarray = [];
              for (let i = 1; i < notseen.length; i++) {
                newarray.push(notseen[i]);
              }
              newarray.push(flashcard.id);
              this.setState({ bufferfc: [...bufferfc, ...newarray] });
            }
          }
          temp = false;
        }
      }
    }
    // set found current number
    this.setState({
      currentCard: currentNumber
    });
  }

  render() {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;
    const { currentCard } = this.state;

    if (!auth.uid) return <Redirect to='/signin' />;

    // Only show flashcards in current category
    let categoryfcs = [];
    if (flashcards) {
      categoryfcs = flashcards.filter(f => f.deckid === id)
    }

    // Check if you've seen every flashcard
    let user;
    if (users) {
      user = users.find(u => u.id == auth.uid);
      if (user.flashcardArray
        && user.flashcardArray.filter(f => this.findFlashcardById(f).deckid == id).length === categoryfcs.length) {
        return (<div>Du har vært gjennom alle i denne kategorien <button onClick={() => window.location.href = '/'}>Gå tilbake</button></div>);
      }
    }

    // Error handling
    if (!categoryfcs[currentCard]) return (<div>Not defined</div>);

    return (
      <div className="dashboard container">
        {(categoryfcs.length > 0) &&
          <Flashcard flashcard={categoryfcs[currentCard]} />
        }
        <div>
          {<button onClick={this.handleHard} id="Hard">Hard</button>}
          <button onClick={this.handleEasy} id="Easy">Easy</button>
          <button onClick={this.testKnapp} id="TestK">Test</button>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCompletedFlashcards: (flashcard) => dispatch(addCompletedFlashcards(flashcard)),
    removeCompletedFlashcards: (flashcard) => dispatch(removeCompletedFlashcards(flashcard))

  }
}
const mapStateToProps = (state) => {
  return {
    flashcards: state.firestore.ordered.flashcards, // gives an array of the flashcards.. flashcard property, we are accessing the flashcards from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'flashcards' }
  ]),
  firestoreConnect([
    { collection: 'decks' }
  ]),
  firestoreConnect([
    { collection: 'users' }
  ])
)(Flashcards)