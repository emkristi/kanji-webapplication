export const createMnemonic = (mnemonic) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to database
		const firestore = getFirestore();
		firestore
			.collection('mnemonics')
			.add({
				//dette er dokumentet som legges til i firestore collection.
				...mnemonic,
				authorFirstName: 'charlotte'
			})
			.then(() => {
				dispatch({ type: 'CREATE_MNEMONIC', mnemonic });
			})
			.catch((err) => {
				dispatch({ type: 'CREATE_MNEMONIC_ERROR', err });
			});
	};
};
