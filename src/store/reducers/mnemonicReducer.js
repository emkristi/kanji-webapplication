const initState = {
	mnemonics: []
};

/**
 *
 * Here we handle the actions from mnemonicActions.js
 * 
 * @param {*} state 
 * @param {*} action taken in from CreateFlashcard
 */
const mnemonicReducer = (state = initState, action) => {
	switch (action.type) { // checking the action type.
		case 'CREATE_MNEMONIC':
			console.log('created mnemonic', action.mnemonic);
			return state;
		case 'CREATE_MNEMONIC_ERROR':
			console.log('create project error', action.err);
			return state;
		default:
			return state;
	}
};

export default mnemonicReducer;
