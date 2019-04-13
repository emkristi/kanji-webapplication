
export const updateUser = (flashcardId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to our firestore database
        const userId = getState().firebase.auth.uid;

        firestore.collection('users').doc(userId).onSnapshot(function(doc){
            console.log("Current data: ", doc.data());
        })

        firestore.collection('users').doc(userId).update({
            flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
        }).then(() => {
            dispatch({ type: 'UPDATE_USER', flashcardId });
            console.log("user updated");
        }).catch((err) => {
            dispatch({ type: 'UPDATE_USER_ERROR', err });
        })
    }
};


export const updateusers = (flashcardidd) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to our firestore database
        const userId = getState().firebase.auth.uid;
        const flashcardId = flashcardidd;

        firestore.collection('users').doc(userId).update({
            // arrayUnion legger til elem. hvis ikke eksiterer fra før 
            flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
        }).then(() => {
            dispatch({ type: 'update_users', flashcardidd });
            console.log("updated users");
        }).catch((err) => {
            dispatch({ type: 'update_users_error', err });
            console.log("updated user error")
        })
    }
};


/*
export const loaduser = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to our firestore database
        const userId = getState().firebase.auth.uid;
        //const flashcardId = flashcardidd;


        firestore.collection('users').doc(userId).onSnapshot(function(doc){
            // arrayUnion legger til elem. hvis ikke eksiterer fra før 
            //flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
            console.log("Current data: ", doc.data());
        })
        
        
        .then((doc) => {
            
            dispatch({ type: 'update_users'});
            return doc.data;
            //return doc.data();
            //console.log("updated users");
        }).catch((err) => {
            dispatch({ type: 'update_users_error', err });
            console.log("updated user error")
        })
        
    }
};
*/

export const loaduser2 = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to our firestore database
        const userId = getState().firebase.auth.uid;
        //const flashcardId = flashcardidd;

        console.log(getFirebase);
        console.log(getFirestore);

        firestore.collection('users').doc(userId).onSnapshot(function(doc){
            // arrayUnion legger til elem. hvis ikke eksiterer fra før 
            //flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
            console.log("Current data: ", doc.data());
            //setState({users: doc.data()})
            //users: doc.data()
        });
        /*.then(() => {
            dispatch({ type: 'update_users', flashcardidd });
            console.log("updated users");
        }).catch((err) => {
            dispatch({ type: 'update_users_error', err });
            console.log("updated user error")
        })
        */
    }
};


export const loaduser = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to our firestore database
        const userId = getState().firebase.auth.uid;

        firestore.collection('users').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let users = doc.data();
                console.log(users);

                //items = JSON.stringify(items);
                //this.setState({ users : users})
                //this.setState({ items : items })
            });
        });

    }
}
