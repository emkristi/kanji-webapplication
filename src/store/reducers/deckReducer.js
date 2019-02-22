const initState = {
    decks: [
        
    ]
}

// the state is the state of the store
// the first time this reducer fires -> uses initial state 
const deckReducer = (state = initState, action) => {
    switch (action.type){  // checking the action type. 
        case 'GET_DECK_ID': 
            //console.log('deck id: ', action.flashcard)
            return state;
       // case 'GET_DE':
            //console.log('create flashcard error', action.err)
            //return state;
        default:
            return state;
    }
}

export default deckReducer