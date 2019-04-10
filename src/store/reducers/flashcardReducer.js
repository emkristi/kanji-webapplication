const initState = {
	flashcards: []
};

/**
 *
 * Here we handle the actions from flashcardActions.js
 * 
 * @param {*} state 
 * @param {*} action taken in from CreateFlashcard
 */
const flashcardReducer = (state = initState, action) => {
	switch (action.type) { // checking the action type.
		case 'ADD_COMPLETED_FLASHCARDS':
			console.log('added completed flashcards', action.flashcard);
			return state;
		case 'ADD_COMPLETED_FLASHCARDS_ERROR':
			console.log('add complete flashcards error', action.err);
			return state;
		case 'REMOVE_COMPLETED_FLASHCARDS':
			console.log('removed completed flashcards', action.flashcard);
		case 'REMOVE_COMPLETED_FLASHCARDS_ERROR':
			console.log('remove completed flashcards error', action.err);
		case 'CREATE_MNEMONIC':
			console.log('created mnemonic', action.mnemonic);
			return state;
		default:
			return state;
	}
};

export default flashcardReducer;
