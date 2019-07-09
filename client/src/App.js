import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h1>Hello World!</h1>
        </div>
      </Router>
    )
  }
}

export default App
