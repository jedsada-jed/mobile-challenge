import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Modal,
  ActivityIndicator,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { facebookLogin } from '../../actions/authAction'
import {
  facebookLogin as fbLoginText,
  myFacebook,
  error,
  ok,
  poweredBy,
  myNotes
} from '../../constants/string'
import { faceboookColor, baseFontColor, baseColor } from '../../constants/theme'

class Login extends Component {
  static propTypes = {
    authenFirebase: PropTypes.object,
    authenFacebook: PropTypes.object,
    loginToSystem: PropTypes.func,
  }

  static defaultProps = {
    authenFirebase: {},
    authenFacebook: {},
    loginToSystem: () => { },
  }

  componentWillReceiveProps(nextProps) {
    const { authenFirebase: newFirebase, authenFacebook: newFacebook } = nextProps
    const { authenFirebase: oldFirebase, authenFacebook: oldFacebook } = this.props

    if (newFacebook !== oldFacebook || newFirebase !== oldFirebase) {
      if (newFacebook.isError) {
        return Alert.alert(
          error,
          newFacebook.error,
          [{ text: ok }],
        )
      } else if (newFacebook.isCancel) {
      } else if (newFirebase.isError) {
        return Alert.alert(
          error,
          newFirebase.error,
          [{ text: ok }],
        )
      } else if (newFirebase.data._user) {
        return Actions.Notes({ type: 'reset' })
      }
    }
  }

  login = async () => {
    const {
      authenFirebase: firebase,
      authenFacebook: facebook,
      loginToSystem
    } = this.props
    await loginToSystem()
  }

  linkByUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url)
      }
    })
  }

  render() {
    const { authenFacebook, authenFirebase } = this.props
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={baseColor}
          barStyle='light-content' />
        <Text style={styles.logoText}>{myNotes}</Text>
        <TouchableOpacity
          style={styles.facebookBtn}
          onPress={this.login}>
          <Text style={styles.btnText}>
            {fbLoginText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.poweredBtn}
          onPress={() => this.linkByUrl(myFacebook)} >
          <Text style={styles.btnText}>
            {poweredBy}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent
          visible={authenFacebook.isLoading || authenFirebase.isLoading}
          onRequestClose={() => { }}>
          <View style={styles.modalContainer}>
            <ActivityIndicator />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 70,
    backgroundColor: baseColor
  },
  logoText: {
    fontSize: 40,
    color: baseFontColor
  },
  btnText: {
    color: baseFontColor,
    fontSize: 17,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  facebookBtn: {
    backgroundColor: faceboookColor,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  }
})

const mapStateToProps = (state) => {
  const { authenFacebook, authenFirebase } = state
  return {
    authenFacebook,
    authenFirebase
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginToSystem: () => facebookLogin(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
