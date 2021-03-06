/**
 * Contains the Startpage component. The startpage is the first page when you arrive the appliaction (unless already logged in). 
 * @module Startpage
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Compontent for the startpage in the application
 * @class
 */
class Startpage extends Component {
	render() {
		const { auth } = this.props; 
		if (auth.uid) return <Redirect to="/home" />;

		return (
			<div className="startpage center">
				<div className="row tester">
					<div className="col s12">
						<div className="s-content">
							<div className="row">

								<div className="col s12 m6 l5">
									<img src="img/memjilogo.png" alt="logo" width="800rem" />
								</div>

								<div className="col s12 m6 l7 ">
									<div className="s-title">
										Learn Kanji with flashcards
									</div>

									<div className="s-text">
										Memji focuses on learning kanji by learning the radicals that kanjis are built
										up of before the kanji itself.
									</div>

									<br />
									<a href="/signup">
										<button className="btn startpage-btn">Sign up</button>
									</a>

									<a href="/signin">
										<button className="btn startpage-btn">Log in</button>
									</a>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * Function for dispatching actions
 * @function
 * @param {*} dispatch 
 */
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(Startpage);

