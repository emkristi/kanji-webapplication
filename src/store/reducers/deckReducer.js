const initState = {
    decks: [
        {id: '1', title: 'Animals'}
    ]
}

const deckReducer = (state = initState, action) => {
    // action type check
    switch (action.type){
        case 'CREATE_DECK': 
            console.log('created deck', action.deck)
            return state;
        case 'CREATE_DECK_ERROR':
            console.log('create project error', action.err)
            return state;
        default:
            return state;
    }
}

export default deckReducer