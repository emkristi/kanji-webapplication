import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateFlashcard from './components/flashcards/CreateFlashcard';
import Frontpage from './components/decks/Frontpage';
import CreateDeck from './components/decks/CreateDeck';
import Flashcards from './components/flashcards/Flashcards';
import PhotoFlashcards from './components/flashcards/PhotoFlashcards';
import Startpage from './components/startpage/Startpage';
import About from './components/layout/About';
import HowTo from './components/layout/HowTo.js';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Frontpage} />
						<Route path="/start" component={Startpage} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/createflashcard" component={CreateFlashcard} />
						<Route path="/createdeck" component={CreateDeck} />
						<Route path="/about" component={About} />
						<Route path="/HowTo" component={HowTo} />
						<Route exact path="/:id" component={Flashcards} />
						<Route exact path="/img/:id" component={PhotoFlashcards} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
