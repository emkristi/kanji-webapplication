// Initial state for when the application is first started and it doesn't have a state.
const initState = {
    authError: null
}

/**
 * authReducer function
 * 
 * @param {*} state 
 * @param {*} action 
 */
const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            return state;
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer