
/* Method for creating a new deck */
export const createDeck = (deck) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        // access decks collection from firebase, adding new document
        firestore.collection('decks').add({
            ...deck
        }).then(() => {
            dispatch({type: 'CREATE_DECK', deck});
        }).catch((err) => {
            dispatch({type: 'CREATE_DECK_ERROR', err});
        })
    }
};