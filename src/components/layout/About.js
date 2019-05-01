import React, { Component } from 'react';
import '../../CSS/info.css';


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
										<h5>Logo</h5>
										The Memji Logo is made by Kine Mentzoni.
									</div>
									<div className="col s12 m6 l6  center-align">
										<img class="activator logoimg" src="img/LOGO-STOR.png" alt="Memji logo" />{' '}
									</div>
								</div>
								<br></br>
								<div className="row">
									<div className="col s12 m6 l6">
										<h5>Photoflashcards</h5>
										All images in the Photoflashcard deck called Fruit is drawn by Kine Mentzoni.
									</div>

									<div className="col s12 m6 l6 center-align">
										<img class="activator fruitimg" src="img/pear.jpg" alt="Pear drawing" />{' '}
									</div>
								</div>
								<br></br>
								<div className="row">
									<div className="col s12 m6 l6">
										<h5>Stroke order</h5>
										Some flashcards in the application has stroke orders. A stroke order shows how to draw the Kanji. The gifs used in the application are made by ....
										<a href="https://en.wikipedia.org/wiki/List_of_kanji_by_concept#Numbers,_counting,_sequence">
											Click here to get to the source
										</a>
									</div>
									
									<div className="col s12 m6 l6 center-align">
										<img class="activator strokeorderimg" src="img/About-penstroke.png" alt="Stroke order" />{' '}
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
