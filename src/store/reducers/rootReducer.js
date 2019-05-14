import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import flashcardReducer from './flashcardReducer'
import userReducer from './userReducer'

/**
 * Root reducer, combines the reducers in the application
 */
const rootReducer = combineReducers({
  auth: authReducer,  
  flashcard: flashcardReducer, 
  //deck: deckReducer,
  user: userReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer