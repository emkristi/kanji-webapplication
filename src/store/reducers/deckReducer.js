const initState = {
    decks: [
        
    ]
}

const deckReducer = (state = initState, action) => {
    switch (action.type){ 
        case 'GET_DECK_ID': 
            return state;
        default:
            return state;
    }
}

export default deckReducer