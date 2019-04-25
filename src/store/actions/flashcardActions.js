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
        }).catch((err) => {
            dispatch({ type: 'REMOVE_COMPLETED_FLASHCARDS_ERROR', err });
        })
    }

}

export const updateMnemonic = (newMnemonic, fcId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); 
        const userId = getState().firebase.auth.uid;
        //DocumentReference ref = db.collection("my_collection").document();
        //String myId = ref.getId();

        const mnemref = firestore.collection("mnemonics").doc();
        const id = mnemref.id;

       // var test = firestore.collection("mnemonics").doc()
        
       console.log(id);
        //var test = newMnemRef.getId();

        mnemref.set({  
            mnemonic: newMnemonic,
            fcId: fcId,
            userId: userId
        }).then(() => { 
            dispatch({type: 'ADD_MNEMONIC', newMnemonic});    
        }).catch((err) => {
            dispatch({type: 'ADD_MNEMONIC_ERROR', err});    
        });
        
        firestore.collection('users').doc(userId).update({
            // arrayUnion legger til elem. hvis ikke eksiterer fra før 
            mnemonicArr: firestore.FieldValue.arrayUnion(mnemref.id)
        }).then(() => {
            dispatch({ type: 'ADD_MNEMONIC_ARR' });
        }).catch((err) => {
            dispatch({ type: 'ADD_MNEMONIC_ARR_ERROR', err });
        })
        
    }
}


export const replaceMnemonic = (newMnemonic, oldMnemonic, fcId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore(); 
        const userId = getState().firebase.auth.uid;
        const oldMnemonicId = oldMnemonic.id;

        firestore.collection('mnemonics').doc(oldMnemonicId).set({  
            mnemonic: newMnemonic,
            fcId: fcId,
            userId: userId
        }).then(() => { 
            dispatch({type: 'REPLACE_MNEMONIC', newMnemonic});    
        }).catch((err) => {
            dispatch({type: 'REPLACE_MNEMONIC_ERROR', err});    
        })
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
        }).catch((err) => {
            dispatch({ type: 'ADD_MNEMONIC_ARR_ERROR', err });
        })
    }
}