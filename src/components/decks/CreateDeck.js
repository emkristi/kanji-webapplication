import React, { Component } from 'react'

class CreateDeck extends Component {
    state = {
        title: ''
    }
}
handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}
handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
}

render(){
    return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
              <h5 className="grey-text text-darken-3">Create deck</h5>
              <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" onChange={this.handleChange}/>
              </div>
              
              <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">Create</button>
              </div>
          </form>
        </div>
      )
}

export default CreateDeck