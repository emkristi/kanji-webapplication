/**
 * Handles auth actions
 * @module authReducer
 */
const initState = {
    authError: null
}

/**
 * authReducer function. Code is borrowed from the tutorial https://www.youtube.com/watch?v=CkePdocytWM&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=23
 * @function
 * @param {*} state 
 * @param {*} action 
 */
const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
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