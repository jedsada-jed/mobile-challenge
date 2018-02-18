import React, { Component } from 'react'
import { View } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'
import { baseColor, baseFontColor } from './constants/theme'
import {
  Notes,
  AddNote,
  Login
} from './scenes'

const styles = {
  navBarStyle: { backgroundColor: baseColor },
  navBarTitleStyle: { color: baseFontColor, textAlign: 'center' }
}

export class Routes extends Component {
  render() {
    return (
      <Router navigationBarStyle={styles.navBarStyle} titleStyle={styles.navBarTitleStyle} >
        <Scene key='Root'>
          <Scene key='Login' component={Login} title='Login' hideNavBar />
          <Scene key='AddNote' component={AddNote} headerTintColor={baseFontColor} title='Add new note' />
          <Scene key='Notes' component={Notes} title='My notes' renderLeftButton={() => <View />} />
        </Scene>
      </Router>
    )
  }
}
