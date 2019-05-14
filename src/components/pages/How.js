import React, { Component } from 'react';
import '../../CSS/info.css';
import { Link } from 'react-router-dom';

/**
 * Component for the "How to play Memji" page in the application.
 */
class How extends Component {
	render() {
		return (
			<div className="info-content">
                <div className="row">
                    <div className="col s12">
                        <div className="info">
                            <h4 className="center-align">How to use Memji</h4>

                            <div className="row howto-row">
								<div className="col s12 m6 l6">
									<h5 className="">DECKS</h5>
                                    Each deck has a category and a type. The info button in the top corner of each deck shows
                                    all radicals and kanji in a deck. 
                                    
                                    <br/>
                                    <b > Important! </b> Since the app shows radicals that a kanji are made up of before the kanji itself, the meaning of some radicals in the
                                    decks has nothing to do with the category of the deck.
								</div>
								<div className="col s12 m6 l6  center-align">
									<img className="activator logoimg" src="img/numdeck.png" alt="Memji logo" />{' '}
								</div>
							</div>

							<div className="row howto-row">
								<div className="col s12 m6 l6">
									<h5 className="">FLASHCARDS - KANJI TO ENGLISH</h5>
									On the front of the flashcards is a kanji. When hovering (on desktop) or clicking
									(mobile) the card will flip and the translation along with other information will be shown.
								</div>
								<div className="col s12 m6 l6  center-align">
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <img className="fcimg" src="img/fcfront.png" alt="flashcard front" />{' '}
                                        </div>
                                        <div className="col s6 m6 l6">
                                            <img className="fcimg" src="img/fcback.png" alt="flashcard back" />{' '}
                                        </div>

                                    </div>
                                </div>
							</div>

							<div className="row howto-row">
								<div className="col s12 m6 l6">
									<h5 className="">BUTTONS</h5>
									If you click the easy button, the flashcard wont appear again until the deck is
									restarted. By clicking hard button the flashcard will reappear randomly in the deck
									until the easy button is clicked.
								</div>
								<div className="col s12 m6 l6  center-align">
									<img className="activator logoimg" src="img/buttons.png" alt="Memji logo" />{' '}
								</div>
							</div>

                            <div className="row howto-row">
                                <div className="col s12 m6 l6">
									<h5 className="">MNEMONICS</h5>
									Each flashcard has a mnemonic suggestion. By clicking the pen icon you can make your
									own personal mnemonic.
								</div>
								<div className="col s12 m6 l6  center-align">
									<img className="activator logoimg" src="img/mnembut.png" alt="Memji logo" />{' '}
								</div>
							</div>
                           
                            <div className="row howto-row">
                                <div className="col s12 m6 l6">
									<h5 className="">STROKE ORDER</h5>
                                    On the back of certain flashcards, there will be a gif of how the kanji is drawn. 
								</div>
								<div className="col s12 m6 l6  center-align">
									<img className="logoimg" src="img/strokeimg.png" alt="Memji logo" />{' '}
								</div>
                            </div>

                     
                            <div className="row howto-row">
                                <div className="col s12 m6 l6">
									<h5 className="">PHOTOFLASHCARDS</h5>
                                    For photoflashcards an image will appear along with four different kanji. If correct kanji is clicked, the flashcard will flip around where you will see the easy and hard buttons along with information. 
								</div>
								<div className="col s12 m6 l6  center-align">
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <img className="fcimg" src="img/pfcapple.png" alt="photoflashcard front" />{' '}
                                        </div>
                                        <div className="col s6 m6 l6">
                                            <img className="fcimg" src="img/pfcappleback.png" alt="photoflashcard back" />{' '}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <br/>
                            <div className="row howto-row">
                                <div className="col s12 m12 l12 center startlink">
                                    <button className="btn"><Link to="/" id="beginlink">Start</Link></button>
                                    <br></br>
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
