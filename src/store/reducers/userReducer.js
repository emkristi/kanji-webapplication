const initState = {
   
    users: [

    ]
}

const userReducer = (state = initState, action) => {
    switch (action.type) { 
        case 'UPDATE_USER':
            return state;
        case 'UPDATE_USER_ERROR':
            return state;
        case 'update_users':
            return state;
        case 'update_users_error':
            return state;
        default:
            return state;
    }
}

export default userReducer
