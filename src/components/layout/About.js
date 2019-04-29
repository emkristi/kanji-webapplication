import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div className="container">
			<div className="row center about-container">
				<h4 className="card-title activator grey-text text-darken-4">About Memji</h4>
				<div class="col s6">
					<div className="card">
						<div className="card-image waves-effect waves-block waves-light">
							<img class="activator" src="img/test.jpg" width="200rem" height="400rem" alt="stroke order" />
						</div>
						<div className="card-content">
							<span className="card-title activator grey-text text-darken-4">Sources in application</span>

							<p>
								In the application we have used stroke order gifs from wikipedia to animate how to draw
								the different kanji.
							</p>
							<p>
								<a href="https://en.wikipedia.org/wiki/List_of_kanji_by_concept#Numbers,_counting,_sequence">
									Click here to get to the source
								</a>
							</p>
						</div>
					</div>
				</div>

				<div class="col s6">
					<div className="card">
						<div className="card-image waves-effect waves-block waves-light">
							<img class="activator" src="memji logo!!" alt="Memji logo" />{' '}
							<p>logo (+ bilder??) inn her:-)</p>
						</div>
						<div className="card-content">
							<span className="card-title activator grey-text text-darken-4">
								Memji logo and pictures in deck
							</span>
							<p> The memji logo and the pictures in the deck (deckname) are made by Kine Mentzoni</p>
						</div>
					</div>
				</div>
			</div>
				
			</div>
			
		);
	}
}

export default About;
