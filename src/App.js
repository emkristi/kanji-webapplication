import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import CreateFlashcards from "./components/flashcards/CreateFlashcards"
import CreateDeck from './components/decks/CreateDeck'

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
            <Route path='/CreateFlashcards' component={CreateFlashcards}/>
            <Route path='/createdeck' component={CreateDeck}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
