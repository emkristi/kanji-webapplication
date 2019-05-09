/**
 * Creates a new deck from user input. Not in use but code is kept for future development.
 * @param {*} deck  User input from CreateDeck.js
 */

/*
export const createDeck = (deck) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore(); 
        firestore.collection('decks').add({  
            ...deck
        }).then(() => { 
            dispatch({type: 'CREATE_deck', deck});             
        }).catch((err) => {
            dispatch({type: 'CREATE_deck_ERROR', err});   
        })
    }
};
*/