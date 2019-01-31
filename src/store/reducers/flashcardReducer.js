const initState = {
    flashcards: [
        
    ]
}

const flashcardReducer = (state = initState, action) => {
    // action type check
    switch (action.type){
        case 'CREATE_flashcard': 
            console.log('created flashcard', action.flashcard)
            return state;
        case 'CREATE_flashcard_ERROR':
            console.log('create flashcard error', action.err)
            return state;
        default:
            return state;
    }
}

export default flashcardReducer