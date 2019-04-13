import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from './DeckInfo';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { removeCompletedFlashcards } from '../../store/actions/flashcardActions'
import '../../CSS/frontpage.css';


class Frontpage extends Component {

  restartDeck = (cardsInDeck) => e => {
		e.preventDefault();
		for(let i = 0; i < cardsInDeck.length; ++i){
				this.props.removeCompletedFlashcards(cardsInDeck[i].id);
				console.log("removed ", cardsInDeck[i].id);
		} 
	}
	
	handleButton = (e) => {
		e.preventDefault();
		this.props.removeCompletedFlashcards("A8XHuB8TfzeLc2osKtjc");
		console.log("hey");
	}

	render() {
		const { decks, flashcards, auth, users } = this.props;

		let user;
		if (users) {
			user = users.find((u) => u.id === auth.uid);
		}

		if (!auth.uid) return <Redirect to="/signin" />;

		return (
				<div className="row frontpage-content center-align">
					{flashcards && user && decks && decks.map((deck) => {
						let unfinisheddecks;
						if (user.flashcardArray == null) {
							unfinisheddecks = flashcards;
						} else {
							unfinisheddecks = flashcards.filter(
								(fcard) => fcard.deckid === deck.id && user.flashcardArray.indexOf(fcard.id) === -1);
								}
								if (unfinisheddecks.length > 0) {
									return (
										<div key={deck.id} className="col s6">
											<div className="deck not-completed">
												<Link to={deck.type === 'Images' ? '/img/' + deck.id : '/' + deck.id} key={deck.id} id="link">
												<DeckInfo deck={deck} />
												</Link>
											</div>
										</div>
									);
									} else {
										let cardsInDeck = flashcards.filter((fcard) => fcard.deckid === deck.id);
										return (
											<div key={deck.id} className="col s6">
												<div className="deck completed">
													<DeckInfo deck={deck} />
													<a onClick={this.restartDeck(cardsInDeck)} class="btn-floating btn-medium waves-effect waves-light pink"><i class="material-icons">replay</i></a>
												</div>
											</div>
										);
									}
							})
						}
					</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
	  	removeCompletedFlashcards: (flashcard) => dispatch(removeCompletedFlashcards(flashcard))
    }
  }

const mapStateToProps = (state) => {
	return {
		decks: state.firestore.ordered.decks, // gives an array of the decks.. flashcard property, we are accessing the decks from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
		flashcards: state.firestore.ordered.flashcards,
		auth: state.firebase.auth,
		users: state.firestore.ordered.users
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		// we use firestoreConnect to tell which collection we want to connect to. takes in an array that contains a series of objects
		{
			collection: 'decks'
		}
	]),
	firestoreConnect([
		{
			collection: 'flashcards'
		}
	]),
	firestoreConnect([
		{
			collection: 'users'
		}
	])
)(Frontpage);
