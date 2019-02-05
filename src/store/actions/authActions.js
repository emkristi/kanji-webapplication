// action creator

/**
 * 
 * @param {c} credentials 
 */
export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        });

    }
}

export const signOut = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS'});
        })
    }
}

export const signUp = (newUser) => {
    // using firebase for authentification service by friebase, need firestore to communicate with firestore database
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            // .doc to specify a doc id
            // resp.user.uid is going to get us the id of the user which is auto generated above
            // we are creating a new doc with the same id
            // we use an set method to pass in an object in the document
            return firestore.collection('users').doc(resp.user.uid).set({
                // what properties do we want for a user:
                fristname: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })// another then method so when the then above has completed, we want to do something else
        }).then(() => { 
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err => { // catch if any of the above fail
            dispatch({type: 'SIGNUP_ERROR', err})
        }) // we handle these dispatches in the authReducer
    }

}