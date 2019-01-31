/* Method for creating a new flashcard */
export const createFlashcard = (flashcard) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        // access flashcards collection from firebase, adding new document
        firestore.collection('flashcards').add({
            ...flashcard
        }).then(() => {
            dispatch({type: 'CREATE_flashcard', flashcard});
        }).catch((err) => {
            dispatch({type: 'CREATE_flashcard_ERROR', err});
        })
    }
};

