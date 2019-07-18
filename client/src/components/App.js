import React, { Component } from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Login from './Login'

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from='/' to='/login'/>
        <Route exact path='/login' component={<Login/>}/>
      </Switch>
    )
  }
}

export default App
