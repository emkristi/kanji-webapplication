/*
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createFlashcard } from '../../store/actions/flashcardActions'

class CreateFlashcard extends Component {
    state = {
        eng: '',
        kanji: ''
    }

 
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

   
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

const mapDispatchToProps = (dispatch) => {
    return {
        
        createFlashcard: (flashcard) => dispatch(createFlashcard(flashcard)) // will take in this.state from handleSubmit as the flashcard. this wil run the function in flashcardActions and return that function then dispatch.
    }
}

export default connect(null, mapDispatchToProps)(CreateFlashcard)

*/