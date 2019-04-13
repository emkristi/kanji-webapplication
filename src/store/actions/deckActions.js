export const createDeck = (deck) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore(); // reference to our firestore database
        //const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        var test = firestore.collection('users').doc(userId);

        //var tabell = ["esfefrfrh"];

        console.log(firestore.collection('users').doc(userId));

        firestore.collection('decks').add({  // async call (action takes some time to do) -> dispatch is halted
            ...deck
        }).then(() => { // .then fires when the action above is complete
            dispatch({type: 'CREATE_deck', deck});    
            // here we carry on with the dispatch. passing in action.
            console.log("it werk", test );
        }).catch((err) => {
            dispatch({type: 'CREATE_deck_ERROR', err});    // carry on with the dispatch. passing in action
        })
    }
};


/*
export const addDeckToUser = (deck) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const deckId = getState().firestore.deck.id;
    }
}
*/