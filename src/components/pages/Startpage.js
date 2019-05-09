import React, { Component } from 'react';

class Startpage extends Component {
	render() {
		return (
			<div className="startpage center">
				<div className="row tester">
					<div className="col s12">
						<div className="s-content">
							<div className="row">
								<div className="col s12 m6 l5">
									<img src="img/memjilogo.png" alt="logo" />
								</div>

								<div className="col s12 m6 l7 ">
									<div className="s-title">Learn Kanji with flashcards</div>
									<div className="s-text">
										Memji focuses on learning Kanji by learning the radicals that kanjis are built
										up of.
									</div>
									<br />
									<a href="/signup">
										<button className="btn startpage-btn">Sign up</button>
									</a>
									<a href="/signin">
										<button className="btn startpage-btn">Sign in</button>
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

export default Startpage;
