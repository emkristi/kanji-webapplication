import authReducer from './authReducer'
import flashcardReducer from './flashcardReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    flashcard: flashcardReducer
});

export default rootReducer