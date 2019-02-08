import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import flashcardReducer from './flashcardReducer';

/**
 * Root reducer that combines reducers in the application using the combineReducers() function which
 * combines the reducers into one. 
 * This is the rootReducer that we pass into the store (in app.js)
 */
const rootReducer = combineReducers({
  auth: authReducer,  // the auth reducer updates information on the auth property inside the state object
  flashcard: flashcardReducer,  // falshcard reducer will update info on the flashcard property inside the flashcard object
  // firestoreReducer: // premade reducer for syncing our firestore data with our state in the background. has access to our firestore because of reduxFirestore(fbConfig) in our store in index.js
  firestore: firestoreReducer, // this property will contain out firestore data. this firestoreReducer is automatically going to sync our firestore
  firebase: firebaseReducer 
});

export default rootReducer