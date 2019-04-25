
const initState = {
    flashcards: [

    ],

    mnemonics: [

    ]
}

/**
 *
 * Here we handle the actions from flashcardActions.js
 * 
 * @param {*} state 
 * @param {*} action taken in from CreateFlashcard
 */
const flashcardReducer = (state = initState, action) => {
    switch (action.type) {  // checking the action type. 
        case 'ADD_COMPLETED_FLASHCARDS':
            console.log('added completed flashcards', action.flashcard)
            return state;
        case 'ADD_COMPLETED_FLASHCARDS_ERROR':
            console.log('add complete flashcards error', action.err)
            return state;
        case 'REPLACE_MNEMONIC':
            console.log('replace mnemonic ok');
            return state;
        case 'REPLACE_MNEMONIC_ERROR':
            console.log('replace mnemnonic err')
            return state;
        case 'UPDATE_MNEMONIC':
            console.log('update mnemonic ok');
            return state;
        case 'UPDATE_MNEMONIC_ERROR':
            console.log('update mnemnonic err')
            return state;
        case 'ADD_MNEMONIC_ARR':
            console.log('add mnemonic to arr ok');
            return state;
        case 'ADD_MNEMONIC_ARR_ERROR':
            console.log('add mnemnonic to arr err')
            return state;
            /*
        case 'REMOVE_COMPLETED_FLASHCARDS':
            console.log('removed completed flashcards', action.flashcard)
            return state;
        case 'REMOVE_COMPLETED_FLASHCARDS_ERROR':
            console.log('remove completed flashcards error', action.err)
            return state;
            */
        default:
            return state;
    }
}

export default flashcardReducer