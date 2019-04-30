import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createFlashcard } from '../../store/actions/flashcardActions'

class CreateFlashcard extends Component {
    state = {
        eng: '',
        kanji: ''
    }

    /**
     * Function that fires when a user changes an input field
     */
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    /**
     * Function for submitting info written in input fields
     */
    handleSubmit = (e) => {
        e.preventDefault(); // prevents page from reloading
        this.props.createFlashcard(this.state) // we have access to createFlashcard because of the mapDispatchToProps. Inside the function we pass the flashcard we want to create, which the state, so we pass this.state. This flashcard is going to be passed into the function in mapDispatchToProps
    }
    render() {
        
       
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create new flashcard</h5>
                    <div className="input-field">
                        <label htmlFor="kanji">Kanji:</label>
                        <input type="text" id="kanji" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="eng">English:</label>
                        <input type="text" id="eng" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <button className="btn">Create flashcard</button>
                    </div>
                </form>
            </div>
        )
    }
}

/**
 * returns an object. whatever property we want to add to the props, we add to this object.
 * we add a method to the props called createFlashcard
 * 
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        
        createFlashcard: (flashcard) => dispatch(createFlashcard(flashcard)) // will take in this.state from handleSubmit as the flashcard. this wil run the function in flashcardActions and return that function then dispatch.
    }
}

// using connect() to connect this component to the redux store
// we pass null since we don't have a mapStateToProps in this component
export default connect(null, mapDispatchToProps)(CreateFlashcard)