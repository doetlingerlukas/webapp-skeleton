import React, { Component } from 'react'
import { connect } from 'react-redux'

class Navbar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.userReducer.user
  }
}

export default connect(mapStateToProps)(Navbar)