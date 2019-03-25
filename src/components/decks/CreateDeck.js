import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createDeck } from '../../store/actions/deckActions'

class CreateDeck extends Component {
    state = {
        title: '',
        type: ''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    /**
     * Function for submitting info written in input fields
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createDeck(this.state)
    }
    render(){
        return (
            <div className="container">
              <form onSubmit={this.handleSubmit} className="white">
                  <h5 className="grey-text text-darken-3">Create new deck</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" onChange={this.handleChange}/>

                        
                        
                    </div>
                    <div className="input-field">
                        <label htmlFor="type">Type:</label>
                        <input type="text" id="type" onChange={this.handleChange}/>
                    </div>

                    
                    <div className="input-field">
                        <button className="btn yellow lighten-1 z-depth-0">Create deck</button>
                    </div>
              </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createDeck: (deck) => dispatch(createDeck(deck))
    }
}

export default connect(null, mapDispatchToProps)(CreateDeck)