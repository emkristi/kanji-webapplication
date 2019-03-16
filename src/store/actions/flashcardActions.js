// action creator

/* Method for creating a new flashcard */
export const createFlashcard = (flashcard) => {
    // because we are using thunk -> can return a function instead of an action
    
    /* inside of the function we take some parameters
        dispatch: dispatches an action to the reducer. 
        getState: so that we can get the state of the store if we need to
        Because of thunk.getExtraArgument, we can pass {getFirebase, getFirestore}
     */
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore(); // reference to our firestore database

        /* access flashcards collection from our firebase, adding new document
         firestore.collection('flashcards') gets us a reference to our flashcard collection
         .add() to add collection. we pass inn an object. the object represents the document that will be added to the collection */
        firestore.collection('flashcards').add({  // async call (action takes some time to do) -> dispatch is halted
            ...flashcard    // use spread operator to spread the properties that are already inside the flashcard.
            // radicals: ['test', 'test']
            // this will go to our firestore to the flashcard collection and add this new document. it will also make a new flashcard id. 
        }).then(() => { // .then fires when the action above is complete
            dispatch({type: 'CREATE_flashcard', flashcard});    // here we carry on with the dispatch. passing in action.
        }).catch((err) => {
            dispatch({type: 'CREATE_flashcard_ERROR', err});    // carry on with the dispatch. passing in action
        })
    }
};


