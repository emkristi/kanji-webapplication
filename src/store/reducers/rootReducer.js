import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import deckReducer from './deckReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  deck: deckReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer