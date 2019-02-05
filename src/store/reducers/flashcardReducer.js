// Initial state for when we don't have a state yet
const initState = {
    flashcards: [
        
    ]
}

/**
 * 
 * @param {*} state 
 * @param {*} action taken in from CreateFlashcard
 */
const flashcardReducer = (state = initState, action) => {
    switch (action.type){  // checking the action type 
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