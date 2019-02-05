import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

/**
 * Creating a store and storing it in the variable 'store'.
 * We need to pass a root reducer into the createStore function -> associates the reducer with the store.
 * We create multiple reducers for different parts of the application that each handles their own small set of actions (authReducer.js, flashcardReducer.js)
 * We combine those reducers in a single root reducer (rootReducer.js). This root reducer is passed into the store. 
 */
const store = createStore(rootReducer, 
    // we use compose to combine several store enhancers
    // store enhancers -> enhances our stores with packages. we need to pass in config so that knows which project to connect to
    compose(
        // apply middleware is the first store enhancer
        // thunk -> lets us perform async tasks inside our action creators. thunk allows us to return a function instead of an action creator. inside that function we can hold the dispatch and then perform an async request (grab or update data etc), then we can resume the dispatch to the reducer when the async request is completed.
        // ---> Component dispatches and action and call an action creator. Inside the action creator the process is halted and we return a function instead of an action, we go out and grab/update data, then we resume the dispatch and pass it to the reducer 
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), // withExtraArgument allows us to pass an extra argument i flashcardAction, which is an obj. We destructure getFirebase and getFirestore, and can then use those objects to interact with our firebase and firestore 
        reduxFirestore(fbConfig), // second store enhancer. 
        reactReduxFirebase(fbConfig, {attachAuthIsReady: true})
    )
);

// Passes store into provider
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    serviceWorker.unregister();
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

