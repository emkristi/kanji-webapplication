export const createMnemonic = (mnemonic) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to database
		dispatch({ type: 'CREATE_MNEMONIC', mnemonic });
	};
};
