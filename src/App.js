import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import CreateFlashcard from './components/flashcards/CreateFlashcard'
import Flashcards from './components/flashcards/Flashcards'
import Deck from './components/decks/Deck'
import CreateDeck from './components/decks/CreateDeck'
import Testerr from './components/decks/Testerr'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/createflashcard' component={CreateFlashcard} />
            <Route path='/createdeck' component={CreateDeck} />
            <Route path='/flashcards' component={Flashcards} />
            <Route exact path='/decks' component = {Deck} />
            <Route path='/decks/:id' component={Testerr} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
