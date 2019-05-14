import React, { Component } from 'react';
import '../../CSS/info.css';

/**
 * Component for the About page in the application.
 */
class About extends Component {
	render() {
		return (
			<div className="info-content">
                <div className="row">
                    <div className="col s12">
                        <div className="info">
                            <h4 className="center-align">Sources and credits</h4>
							<br></br>
							<div className="row">
								<div className="col s12 m6 l6">
									<h5>LOGO</h5>
									The Memji Logo is made by Kine Mentzoni.
								</div>
								<div className="col s12 m6 l6  center-align">
									<img className="activator logoimg" src="img/LOGO-STOR.png" alt="Memji logo" />{' '}
								</div>
							</div>
							<br></br>
							<div className="row">
								<div className="col s12 m6 l6">
									<h5>PHOTOFLASHCARDS</h5>
									All images in the photoflashcard deck called 'Fruit' are illustrated by Kine Mentzoni.
								</div>

								<div className="col s12 m6 l6 center-align">
									<img className="activator fruitimg" src="img/mandarin.png" alt="Mandarin illustration" />{' '}
								</div>
							</div>
							<br></br>
							<div className="row">
								<div className="col s12 m6 l6">
									<h5>STROKE ORDER</h5>
									<span>Stroke order gifs used in some flashcards are borrowed from <a href="https://en.wikipedia.org/wiki/List_of_kanji_by_concept#Numbers,_counting,_sequence" rel="noopener noreferrer" target="_blank">this website.</a></span>
								</div>
								
								<div className="col s12 m6 l6 center-align">
									<img className="activator strokeorderimg" src="img/About-penstroke.png" alt="Stroke order" />{' '}
								</div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default About;
