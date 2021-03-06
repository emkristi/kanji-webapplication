/**
 * File contains actions for authorisation in the application.
 * Code is borrowed from the tutorial https://www.youtube.com/watch?v=CkePdocytWM&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=23
 * @module authActions
 */ 

/**
 * Signs user in to application
 * @function
 * @param {*} credentials 
 */
export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err });
			});
	};
};

/**
 * Signs user out of application
 * @function
 */
export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' });
			firebase.logout();
		});
	};
};

/**
 * Signs user up, adds user to database
 * @function
 * @param {*} newUser 
 */
export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).set({
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					initials: newUser.firstName[0] + newUser.lastName[0],
					flashcardArray: []
				}); 
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			}); 
	};
};
