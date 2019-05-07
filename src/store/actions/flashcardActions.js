/**
 * Creates new flashcard from user input
 * @param {*} flashcard 	User input from CreateFlashcard.js
 */
export const createFlashcard = (flashcard) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection('flashcards')
			.add({
				...flashcard
			})
			.then(() => {
				dispatch({ type: 'CREATE_FLASHCARD', flashcard });
			})
			.catch((err) => {
				dispatch({ type: 'CREATE_FLASHCARD_ERROR', err });
			});
	};
};

/**
 * Adds completed flashcards in an array in User. This is used to know which flashcards
 * the user has seen (clicked easy on). 
 * @param {} flashcardId 
 */
export const addCompletedFlashcards = (flashcardId) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;

		firestore.collection('users').doc(userId).update({
				flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
			})
			.then(() => {
				dispatch({ type: 'ADD_COMPLETED_FLASHCARDS', flashcardId });
			})
			.catch((err) => {
				dispatch({ type: 'ADD_COMPLETED_FLASHCARDS_ERROR', err });
			});
	};
};

/**
 * Removes completed flashcards from the flashcardArray for logged in user. 
 * Used to restart a deck that has been completed if the restart button is clicked. 
 * @param {*} flashcardid 
 */
export const removeCompletedFlashcards = (flashcardid) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;
		const fid = flashcardid;

		firestore
			.collection('users')
			.doc(userId)
			.update({
				flashcardArray: firestore.FieldValue.arrayRemove(fid)
			})
			.then(() => {
				dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS', flashcardid });
			})
			.catch((err) => {
				dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS_ERROR', err });
			});
	};
};

/**
 * Method for adding a personal mnemonic to a flashcard. 
 * @param {string} newMnemonic 
 * @param {string} fcId 
 */
export const addMnemonic = (newMnemonic, fcId) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;

		const mnemref = firestore.collection('mnemonics').doc();

		mnemref
			.set({
				mnemonic: newMnemonic,
				fcId: fcId,
				userId: userId
			})
			.then(() => {
				dispatch({ type: 'ADD_MNEMONIC', newMnemonic });
			})
			.catch((err) => {
				dispatch({ type: 'ADD_MNEMONIC_ERROR', err });
			});

		firestore
			.collection('users')
			.doc(userId)
			.update({
				mnemonicArr: firestore.FieldValue.arrayUnion(mnemref.id)
			})
			.then(() => {
				dispatch({ type: 'ADD_MNEMONIC_ARR' });
			})
			.catch((err) => {
				dispatch({ type: 'ADD_MNEMONIC_ARR_ERROR', err });
			});
	};
};

/**
 * Method for replacing a personal mnemonic. 
 * @param {string} newMnemonic 	new mnemonic 
 * @param {array} oldMnemonic 	mnemonic that is getting replaced
 * @param {string} fcId 		id of flashcard
 */
export const replaceMnemonic = (newMnemonic, oldMnemonic, fcId) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;
		const oldMnemonicId = oldMnemonic.id;

		firestore
			.collection('mnemonics')
			.doc(oldMnemonicId)
			.set({
				mnemonic: newMnemonic,
				fcId: fcId,
				userId: userId
			})
			.then(() => {
				dispatch({ type: 'REPLACE_MNEMONIC', newMnemonic });
			})
			.catch((err) => {
				dispatch({ type: 'REPLACE_MNEMONIC_ERROR', err });
			});
	};
};

/**
 * Updates the mnemonic array for the user.
 * Used to only show mnemonics that the logged in user has made.
 * @param {array} mnemonic
 */
export const updateMnemonicArray = (mnemonic) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;

        firestore.collection('users').doc(userId).update({
            mnemonicArr: firestore.FieldValue.arrayUnion(mnemonic.id)
        }).then(() => {
            dispatch({ type: 'ADD_MNEMONIC_ARR', mnemonic });
        }).catch((err) => {
            dispatch({ type: 'ADD_MNEMONIC_ARR_ERROR', err });
        })
    }
}
