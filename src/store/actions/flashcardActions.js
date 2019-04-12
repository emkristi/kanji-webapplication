/**
 * Adds flashcards that has been completed by a user to an array 
 * for that user. 
 * 
 * @param {*} flashcardidd 
 */

export const addCompletedFlashcards = (flashcardidd) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore(); // reference to our firestore database
		const userId = getState().firebase.auth.uid;
		const flashcardId = flashcardidd;

		firestore
			.collection('users')
			.doc(userId)
			.update({
				flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
			})
			.then(() => {
				dispatch({ type: 'ADD_COMPLETED_FLASHCARDS', flashcardidd });
				console.log('flashcard added to user');
			})
			.catch((err) => {
				dispatch({ type: 'ADD_COMPLETED_FLASHCARDS_ERROR', err });
			});
	};
};

export const addMnemonicUser = (mnemonicidd) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const userId = getState().firebase.auth.uid;
		const mnemonicId = mnemonicidd;
		firestore
			.collection('users')
			.doc(userId)
			.update({
				mnemonicArray: firestore.FieldValue.arrayUnion(mnemonicId)
			})
			.then(() => {
				dispatch({ type: 'ADD_MNEMONIC', mnemonicidd });
				console.log('mnemonic added to user');
			})
			.catch((err) => {
				dispatch({ type: 'ADD_MNEMONIC_ERROR', err });
			});
	};
};

export const removeCompletedFlashcards = (flashcardid) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
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
				console.log('flashcards removed from user');
			})
			.catch((err) => {
				dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS_ERROR', err });
			});
	};
};
