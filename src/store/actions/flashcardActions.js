/**
 * Adds flashcards that has been completed by a user to an array 
 * for that user. 
 * 
 * @param {*} flashcardidd 
 */

export const addCompletedFlashcards = (flashcardidd) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); // reference to our firestore database
        const userId = getState().firebase.auth.uid;
        const flashcardId = flashcardidd;

       

        firestore.collection('users').doc(userId).update({
            // arrayUnion legger til elem. hvis ikke eksiterer fra før 
            flashcardArray: firestore.FieldValue.arrayUnion(flashcardId)
        }).then(() => {
            dispatch({ type: 'ADD_COMPLETED_FLASHCARDS', flashcardidd });
            console.log("flashcard added to user");
        }).catch((err) => {
            dispatch({ type: 'ADD_COMPLETED_FLASHCARDS_ERROR', err });
        })
    }
};

export const removeCompletedFlashcards = (flashcardid) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        const fid = flashcardid;

        firestore.collection('users').doc(userId).update({
            flashcardArray: firestore.FieldValue.arrayRemove(fid)
        }).then(() => {
            dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS', flashcardid });
            console.log("flashcards removed from user");
        }).catch((err) => {
            dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS_ERROR', err });
        })
    }

}

export const updateMnemonic = (newMnemonic, fcId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); 
        const userId = getState().firebase.auth.uid;

        firestore.collection('mnemonics').add({  
            mnemonic: newMnemonic,
            fcId: fcId,
            userId: userId
        }).then(() => { 
            dispatch({type: 'ADD_MNEMONIC', newMnemonic});    
            console.log("added mnemonic to db", newMnemonic);
        }).catch((err) => {
            dispatch({type: 'ADD_MNEMONIC_ERROR', err});    
        })

        /*
        firestore.collection('users').doc(userId).update({
            // arrayUnion legger til elem. hvis ikke eksiterer fra før 
            mnemonicArr: firestore.FieldValue.arrayUnion( MNEMONIC ID )
        }).then(() => {
            dispatch({ type: 'ADD_MNEMONIC_ARR', flashcardidd });
            console.log("added to users mnemonic array");
        }).catch((err) => {
            dispatch({ type: 'ADD_MNEMONIC_ARR_ERROR', err });
        })
        */ 
    }
}

export const updateMnemonicArray = (mnemonic) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); 
        const userId = getState().firebase.auth.uid;

        firestore.collection('users').doc(userId).update({
            // arrayUnion legger til elem. hvis ikke eksiterer fra før 
            mnemonicArr: firestore.FieldValue.arrayUnion(mnemonic.id)
        }).then(() => {
            dispatch({ type: 'ADD_MNEMONIC_ARR', mnemonic });
            console.log("added to users mnemonic array");
        }).catch((err) => {
            dispatch({ type: 'ADD_MNEMONIC_ARR_ERROR', err });
        })
    }
}
