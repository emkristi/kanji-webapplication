/**
 * Root component. Contains routes to the different components in the application.
 * @module App
 */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Frontpage from './components/decks/Frontpage'
import Flashcards from './components/flashcards/Flashcards'
import PhotoFlashcards from './components/flashcards/PhotoFlashcards'
import Startpage from './components/pages/Startpage'
import About from './components/pages/About'
import How from './components/pages/How'

/**
 * App component
 */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Frontpage} />
            <Route path='/howto' component={How} />
            <Route path='/start' component={Startpage} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/about' component={About} />
            <Route exact path='/:id' component={Flashcards} />
            <Route exact path='/img/:id' component={PhotoFlashcards} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
