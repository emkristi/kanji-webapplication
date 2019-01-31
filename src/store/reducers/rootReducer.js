import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import flashcardReducer from './flashcardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  flashcard: flashcardReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer