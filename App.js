import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Routes as Router } from './src/routes'
import createStore from './src/config/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore()}>
        <Router />
      </Provider>
    )
  }
}
