
export const createDeck = (deck) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore(); // reference to our firestore database
        //const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        firestore.collection('decks').add({  // async call (action takes some time to do) -> dispatch is halted
            ...deck,
            authorId: userId
        }).then(() => { // .then fires when the action above is complete
            dispatch({type: 'CREATE_deck', deck});    // here we carry on with the dispatch. passing in action.
        }).catch((err) => {
            dispatch({type: 'CREATE_deck_ERROR', err});    // carry on with the dispatch. passing in action
        })
    }
};


export const getDeckid = (deck) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const deckId = getState().firestore.deck.id;
        
        /*
        firestore.collection('decks').
        (
            credentials.id
        ).then(() => {
            dispatch({ type: 'GET_DECK_ID'})
        }).catch((err) => {
            dispatch({ type: 'DECK_AUTH_ERROR', err})
        });
        */

    }
}
