import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMnemonic } from '../../store/actions/mnemonicActions';

class CreateMnemonic extends Component {
	// initial state
	state = {
		mnemonic: ''
	};
	handleChange = (e) => {
		this.setState({
			//oppdaterer target value fra state
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		//console.log(this.state); //printer forhåpentligvis ut mnemonic
		this.props.createMnemonic(this.state);
	};
	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3"> </h5>
					<div className="input-field">
						<label htmlFor="mnemonic">Mnemonic</label>
						<textarea id="mnemonic" className="materialize-textarea" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">Add mnemonic!</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createMnemonic: (mnemonic) => dispatch(createMnemonic(mnemonic))
	};
};

export default connect(null, mapDispatchToProps)(CreateMnemonic);
