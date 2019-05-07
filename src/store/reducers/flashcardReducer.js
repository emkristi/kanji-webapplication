const initState = {
	flashcards: [],

	mnemonics: []
};

/**
 * Here we handle the actions from flashcardActions.js
 * 
 * @param {*} state 
 * @param {*} action taken in from CreateFlashcard
 */
const flashcardReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_FLASHCARD':
			return state;
		case 'CREATE_FLASHCARD_ERROR':
			return state;
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
