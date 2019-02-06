import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListOfFlashcards from '../flashcards/ListOfFlashcards'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';


class Flashcards extends Component{ 

    insertContentFlashcard (){
        //Code to insert content to the flashcard
        document.getElementById("change-content").innerHTML = "Changed content";
    }

    
    render() {
        const { flashcards } = this.props;
        const { auth } = this.props;

        return(
            <div id="flashcard">
                <div className="card grey-white darken-1" id="flashcard-outside">
                    <div className="card-content black-text"></div>
                    <div id="change-content">Content you should change based on functions and DB.</div>
                </div>
                <button class="btn btn-default btn-block" onClick={this.insertContentFlashcard}><i class="zmdi zmdi-invert-colors zmdi-hc-fw zmdi-hc-flip-vertical"></i> Flip vertically</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      flashcards: state.firestore.ordered.flashcards, // flashcard property, we are accessing the flashcards from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
      auth: state.firebase.auth
    }
  }

  export default compose(
    /**
     * connect() is used to connect the dashboard component with the redux store.
     * connect() is a function which returns a higher order component to take in the Dashboard.
     * We need to map our state from the store to the props in the dashboard component -> mapStateToProps.
     */
    
    connect(mapStateToProps), 
    firestoreConnect([
      { collection: 'flashcards' }
    ])
  )(Flashcards)