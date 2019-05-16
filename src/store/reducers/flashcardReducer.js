/**
 * Handles flashcard actions
 * @module flashcardReducer
 */
const initState = {
	flashcards: [],
	mnemonics: []
};

/**
 * Handles the actions from flashcardActions.js
 * @function
 * @param {*} state 
 * @param {*} action 
 */
const flashcardReducer = (state = initState, action) => {
	switch (action.type) {
		/*
		case 'CREATE_FLASHCARD':
			return state;
		case 'CREATE_FLASHCARD_ERROR':
			return state;
		*/
		case 'ADD_COMPLETED_FLASHCARDS':
			return state;
		case 'ADD_COMPLETED_FLASHCARDS_ERROR':
			return state;
		case 'REPLACE_MNEMONIC':
			return state;
		case 'REPLACE_MNEMONIC_ERROR':
			return state;
		case 'UPDATE_MNEMONIC':
			return state;
		case 'UPDATE_MNEMONIC_ERROR':
			return state;
		case 'ADD_MNEMONIC_ARR':
			return state;
		case 'ADD_MNEMONIC_ARR_ERROR':
			return state;
		default:
			return state;
	}
};

export default flashcardReducer;
