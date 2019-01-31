import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createFlashcard } from '../../store/actions/flashcardActions'

class CreateFlashcard extends Component {
    state = {
        eng: '',
        kanji: ''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createFlashcard(this.state)
    }
    render(){
        return (
            <div className="container">
              <form onSubmit={this.handleSubmit} className="white">
                  <h5 className="grey-text text-darken-3">Create new flashcard</h5>
                    <div className="input-field">
                        <label htmlFor="kanji">Kanji:</label>
                        <input type="text" id="kanji" onChange={this.handleChange}/>
                    </div>

                    <div class="input-field">
                        <label htmlFor="eng">English:</label>
                      <input type="text" id="eng" onChange={this.handleChange}/>
                    </div>
                

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
              </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFlashcard: (flashcard) => dispatch(createFlashcard(flashcard))
    }
}


export default connect(null, mapDispatchToProps)(CreateFlashcard)