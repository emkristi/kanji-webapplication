// Initial state for when the application is first started and it doesn't have a state.
const initState = {
    authError: null
}

/**
 * authReducer function. 
 * This is where we manipulate the state (data) in our application
 * 
 * @param {*} state 
 * @param {*} action 
 */
const authReducer = (state = initState, action) => {
    // need to check action type
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                // tar med det i init state, ungår ovverrite
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return{
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer