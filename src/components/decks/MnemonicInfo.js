import React from 'react';

const MnemonicInfo = ({ mnemonic }) => {
	return (
		<div className="container">
			<p className="content">{mnemonic.mnemonic}</p>
		</div>
	);
};

export default MnemonicInfo;
