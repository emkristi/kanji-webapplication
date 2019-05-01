import React, { Component } from 'react';
import '../../CSS/info.css';


class How extends Component {
	render() {
		return (
			<div className="info-content">
                <div className="row">
                    <div className="col s12">
                        <div className="info">
                            <h4 className="center-align">How does it work</h4>

                            <div className="row">
								<div className="col s12 m6 l6">
									<h5>Flashcards - Kanji to english</h5>
								</div>
								<div className="col s12 m6 l6  center-align">
									<img class="activator logoimg" src="img/LOGO-STOR.png" alt="Memji logo" />{' '}
								</div>
							</div>

                            <br></br>
                            <div className="row">
                                <div className="col s12 m6 l6">
                                    <h5>Photoflashcards</h5>
                                </div>

                                <div className="col s12 m6 l6 center-align">
                                    <img class="activator logoimg" src="img/LOGO-STOR.png" alt="Memji logo" />{' '}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>




					
		
		);
	}
}

export default How;
