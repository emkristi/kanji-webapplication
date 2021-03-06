/**
 * Frontpage when user is logged in to application. Displays all the decks.
 * @module Frontpage
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; // used to connect to firestore
import { compose } from 'redux';
import DeckInfo from './DeckInfo';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { removeCompletedFlashcards } from '../../store/actions/flashcardActions';
import '../../CSS/frontpage.css';
import { Dropdown, Divider } from 'react-materialize'

/**
 * Frontpage component. Contains decks of flashcards.
 * @class
 */
class Frontpage extends Component {
	
	/**
	 * Function for when the restart button is clicked. Removes flashcards in the deck
	 * that is clicked from userarray. 
	 * @function
	 */
	restartDeck = (cardsInDeck) => (e) => {
		e.preventDefault();
		for(let i = 0; i < cardsInDeck.length; ++i){
				this.props.removeCompletedFlashcards(cardsInDeck[i].id);
		} 
	}

	render() {
		const { decks, flashcards, auth, users } = this.props;

		let user;
		if (users) {
			user = users.find((u) => u.id === auth.uid);
		}

		if (!auth.uid) return <Redirect to="/"/>;
	
		return (
			<div className="frontpage-content center-align">
			
				<div className="row">
					{flashcards &&
						user &&
						decks &&
						decks.map((deck) => {
							let unfinisheddecks;
							let cardsInDeck = flashcards.filter((fcard) => fcard.deckid === deck.id);
							let radInDeck = cardsInDeck.filter((fcard => fcard.radicals === ""));
							let kanInDeck = cardsInDeck.filter((fcard => fcard.radicals !== ""));
							
							if (user.flashcardArray == null) {
								unfinisheddecks = flashcards;
							} else {
								unfinisheddecks = flashcards.filter(
									(fcard) => fcard.deckid === deck.id && user.flashcardArray.indexOf(fcard.id) === -1
								);
							}
							if (unfinisheddecks.length > 0 && (deck.type === "Images")) {
								return (
									<div key={deck.id} className="col s12 m6 l6">
										<Link to={deck.type === 'Images' ? '/img/' + deck.id : '/' + deck.id} key={deck.id} id="link">
											<div className="deck not-completed">
												<div className="info-dropdown">
											<Dropdown className="dropdown-content dropdown-content-deck" options={{belowOrigin: true, hover: true, closeOnClick: true}}
												trigger={<i className="material-icons right">info_outline</i>}>
													
													<span className="word-list-title">KANJI IN DECK</span>
													
													{
														radInDeck.map(card => {
																return (
																	<span key={card}>{card.kanji}{" - "}{card.eng}</span>
																)
															}
														)
													}
				
												</Dropdown>
												</div>
												<div className="deck-content">
												
													<DeckInfo deck={deck} />
													<p className="completionstat">{cardsInDeck.length}{" cards"}</p>
												</div>
											</div>
										</Link>
										
									</div>
								);
							} else if(unfinisheddecks.length > 0){
								return(
									<div key={deck.id} className="col s12 m6 l6">
										<Link to={deck.type === 'Images' ? '/img/' + deck.id : '/' + deck.id} key={deck.id} id="link">
											<div className="deck not-completed">
											<div className="info-dropdown">
											<Dropdown className="dropdown-content dropdown-content-deck" options={{belowOrigin: true, hover: true, closeOnClick: true}}
												trigger={<i className="material-icons right">info_outline</i>}>
													
													<span className="word-list-title">KANJI IN DECK</span>
													{
														kanInDeck.map(card => {
																return (
																	<span key={card}>{card.kanji}{" - "}{card.eng}</span>
																)
															}
														)
													}

													<Divider/>
													
													<span className="word-list-title">RADICALS IN DECK</span>
													{
														radInDeck.map(card => {
																return (
																	<span key={card}>{card.kanji}{" - "}{card.eng}</span>
																)
															}
														)
													}
				
												</Dropdown>
												</div>
												<div className="deck-content">
													<DeckInfo deck={deck} />
													<p className="completionstat">{cardsInDeck.length}{" cards"}</p>
												</div>
											</div>
										</Link>
										
									</div>
								
								)

							} else {
								return (
									<div key={deck.id} className="col s12 m6 l6">
										<div className="deck completed">
											<div className="deck-content-comp">
												<DeckInfo className="col s12" deck={deck} />
												<div onClick={this.restartDeck(cardsInDeck)}className="btn-floating btn-large waves-effect deck-btn">
													<i className="material-icons">replay</i>
												</div>
											</div>
										</div>
									</div>
								);
							}
						})}
				</div>
			</div>
		);
	}
}


 /**
 * Function for dispatching actions
 * @function
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
	return {
		removeCompletedFlashcards: (flashcard) => dispatch(removeCompletedFlashcards(flashcard))
	};
};

/**
 * Function for getting data from the store
 * @function
 * @param {*} state 
 */
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
