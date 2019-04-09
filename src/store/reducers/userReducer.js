const initState = {
    flashcards: [

    ]
}

const userReducer = (state = initState, action) => {
    switch (action.type) {  // checking the action type. 
        case 'UPDATE_USER':
            console.log('user updated')
            return state;
        case 'UPDATE_USER_ERROR':
            console.log('add complete flashcards error', action.err)
            return state;
        default:
            return state;
    }
}

export default userReducer
