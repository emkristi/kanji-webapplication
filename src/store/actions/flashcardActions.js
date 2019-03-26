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
     
        console.log(firestore.collection('users').doc(userId));

        firestore.collection('users').doc(userId).update({  
            flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
        }).then(() => { 
            dispatch({ type: 'ADD_COMPLETED_FLASHCARDS', flashcardidd });
            console.log("flashcard added to user");
        }).catch((err) => {
            dispatch({ type: 'ADD_COMPLETED_FLASHCARDS_ERROR', err });
        })
    }
};

export const removeCompletedFlashcards = (flashcardid) => {

    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        const userId = getState().firebase.auth.uid;
        
        firestore.collection('users').doc(userId).update({
            flashchardArray: firestore.FieldValue.delete(flashcardid)
        }).then(() => { 
            dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS', flashcardid });
            console.log("flashcards removed from user");
        }).catch((err) => {
            dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS', err });
        })
    }

}