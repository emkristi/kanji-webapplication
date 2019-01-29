import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    
    // console.log(this.props);
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <h1>heyo</h1>
          </div>
          <div className="col s12 m5 offset-m1">
            <h1>hey</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Dashboard)