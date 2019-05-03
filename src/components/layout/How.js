import React, { Component } from 'react';
import '../../CSS/info.css';
import { Link } from 'react-router-dom';



class How extends Component {
	render() {
		return (
			<div className="info-content">
                <div className="row">
                    <div className="col s12">
                        <div className="info">
                            <h4 className="center-align">How to use Memji</h4>
                            <br></br>
                            <div className="row">
								<div className="col s12 m6 l6">
									<h5 className="">DECKS</h5>
                                    Click on a deck to start playing. You can either choose a deck with flashcards that go from Kanji to English or picture flashcards. A deck has a category, but since they also contain radicals some words in the categories doesn't have anything to do with the category itself. 
								</div>
								<div className="col s12 m6 l6  center-align">
									<img class="activator logoimg" src="img/numdeck.png" alt="Memji logo" />{' '}
								</div>
							</div>

                            <div className="row">
								<div className="col s12 m6 l6">
									<h5 className="">FLASHCARDS - KANJI TO ENGLISH</h5>
                                    On the front of the flashcards is a kanji. When hovering (on desktop) or clicking (mobile) the card it will flip and you can see the translation and other information. 
								</div>
								<div className="col s12 m6 l6  center-align">
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <img class="fcimg" src="img/fcfront.png" alt="flashcard front" />{' '}
                                        </div>
                                        <div className="col s6 m6 l6">
                                            <img class="fcimg" src="img/fcback.png" alt="flashcard back" />{' '}
                                        </div>

                                    </div>
                                </div>


							</div>

                            <div className="row">
								<div className="col s12 m6 l6">
									<h5 className="">BUTTONS</h5>
                                    If you click the easy button the flashcard wont appear again until deck is restarted. By clicking hard button the flashcard will reappear randomly in the deck until the easy button is clicked.
								</div>
								<div className="col s12 m6 l6  center-align">
									<img class="activator logoimg" src="img/buttons.png" alt="Memji logo" />{' '}
								</div>
							</div>

                            <br></br>
                            <div className="row">
                                <div className="col s12 m6 l6">
									<h5 className="">MNEMONICS</h5>
                                    Each flashcard has a mnemonic suggestion. By clicking the pen icon you can make your own personal mnemonic. 
								</div>
								<div className="col s12 m6 l6  center-align">
									<img class="activator logoimg" src="img/mnembut.png" alt="Memji logo" />{' '}
								</div>
                            </div>

                            <br></br>
                            <div className="row">
                                <div className="col s12 m6 l6">
									<h5 className="">STROKE ORDER</h5>
                                    Some flashcards has gifs of the kanjis strokeorder on the back of the flashcards. This shows how the kanji is drawn.
								</div>
								<div className="col s12 m6 l6  center-align">
									<img class="logoimg" src="img/strokeimg.png" alt="Memji logo" />{' '}
								</div>
                            </div>

                            <br></br>
                            <div className="row">
                                <div className="col s12 m6 l6">
									<h5 className="">PHOTOFLASHCARDS</h5>
                                    For photoflashcards an image will appear along with four different Kanji. Click a kanji. If correct kanji, the flashcard will flip around where you will see the easy and hard buttons along with information. 
								</div>
								<div className="col s12 m6 l6  center-align">
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <img class="fcimg" src="img/pfcapple.png" alt="photoflashcard front" />{' '}
                                        </div>
                                        <div className="col s6 m6 l6">
                                            <img class="fcimg" src="img/pfcappleback.png" alt="photoflashcard back" />{' '}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s12 m12 l12 center startlink">
                                    <br></br>
                                    <Link to="/">Click here to begin!</Link>
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
