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
import CreateMnemonic from './components/flashcards/CreateMnemonic';
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Frontpage} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/createflashcard" component={CreateFlashcard} />
						<Route path="/createdeck" component={CreateDeck} />
						<Route path="/create" component={CreateMnemonic} />
						<Route exact path="/:id" component={Flashcards} />
						<Route exact path="/img/:id" component={PhotoFlashcards} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
