/**
 * Updates a users flashcardArray.
 * @param {string} flashcardId 
 */
export const updateUser = (flashcardId) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore(); // reference to our firestore database
		const userId = getState().firebase.auth.uid;

		firestore.collection('users').doc(userId).onSnapshot(function(doc) {});
		firestore
			.collection('users')
			.doc(userId)
			.update({
				flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
			})
			.then(() => {
				dispatch({ type: 'UPDATE_USER', flashcardId });
			})
			.catch((err) => {
				dispatch({ type: 'UPDATE_USER_ERROR', err });
			});
	};
};

export const loaduser = () => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore(); 
		//const userId = getState().firebase.auth.uid;

		firestore.collection('users').get().then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				//let users = doc.data();
			});
		});
	};
};
