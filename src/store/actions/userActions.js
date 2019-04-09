
export const updateUser = (flashcardId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to our firestore database
        const userId = getState().firebase.auth.uid;

        firestore.collection('users').doc(userId).update({
            flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
        }).then(() => {
            dispatch({ type: 'UPDATE_USER', flashcardId });
            console.log("flashcardArray updated");
        }).catch((err) => {
            dispatch({ type: 'UPDATE_USER_ERROR', err });
        })
    }
};
