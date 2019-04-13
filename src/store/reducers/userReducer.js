const initState = {
   
    users: [

    ]
}

const userReducer = (state = initState, action) => {
    switch (action.type) {  // checking the action type. 
        case 'UPDATE_USER':
            console.log('user updated', action.user)
            return state;
        case 'UPDATE_USER_ERROR':
            console.log('user updated ERROR', action.err)
            return state;
        case 'update_users':
            console.log('added completed flashcards', action.flashcard)
            return state;
        case 'update_users_error':
            console.log('add complete flashcards error', action.err)
            return state;
        default:
            return state;
    }
}

export default userReducer
