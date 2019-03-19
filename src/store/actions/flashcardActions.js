export const createFlashcard = (flashcard) => {
    // because we are using thunk -> can return a function instead of an action
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore(); // reference to our firestore database

        const userId = getState().firebase.auth.uid;
        /* access flashcards collection from our firebase, adding new document
         firestore.collection('flashcards') gets us a reference to our flashcard collection
         .add() to add collection. we pass inn an object. the object represents the document that will be added to the collection */
        console.log(firestore.collection('users').doc(userId));

        firestore.collection('users').doc(userId).update({  // async call (action takes some time to do) -> dispatch is halted
            flashcards: firestore.FieldValue.arrayUnion(flashcard)
        }).then(() => { // .then fires when the action above is complete
            dispatch({type: 'CREATE_flashcard', flashcard});    
            console.log("WORK?!!!!");
        }).catch((err) => {
            dispatch({type: 'CREATE_flashcard_ERROR', err});    
        })
    }
};