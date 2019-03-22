
export const createDeck = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore(); // reference to our firestore database
        //const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        firestore.collection('users').add({  // async call (action takes some time to do) -> dispatch is halted
            ...user,
            flashcardId: flashcardId
        }).then(() => { // .then fires when the action above is complete
            dispatch({type: 'ADD_FLASHCARD', user});    
        }).catch((err) => {
            dispatch({type: 'ADD_FLASHCARD_ERROR', err});    // carry on with the dispatch. passing in action
        })
    }
};
