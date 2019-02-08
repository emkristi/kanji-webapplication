import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import CreateFlashcard from './components/flashcards/CreateFlashcard'
import Flashcards from './components/flashcards/Flashcards'
import Deck from './components/decks/Deck'

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
            <Route path='/flashcards' component={Flashcards} />
            <Route path='/decks' component = {Deck} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
