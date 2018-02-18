import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'
import {
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_CANCEL,
  LOGIN_FACEBOOK_FAILURE,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FIREBASE_REQUEST,
  LOGIN_FIREBASE_SUCCESS,
  LOGIN_FIREBASE_FAILURE
} from '../constants/actionType'
import { someThingWrongAccessToken } from '../constants/string'

export const facebookLogin = async (dispatch) => {
  try {
    dispatch({ type: LOGIN_FACEBOOK_REQUEST })
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    if (result.isCancelled) {
      dispatch({ type: LOGIN_FACEBOOK_CANCEL })
      return
    }

    const data = await AccessToken.getCurrentAccessToken()
    if (!data) {
      return dispatch({
        type: LOGIN_FACEBOOK_FAILURE,
        error: someThingWrongAccessToken
      })
    }
    dispatch({ type: LOGIN_FACEBOOK_SUCCESS, data, result: result })
    dispatch({ type: LOGIN_FIREBASE_REQUEST })

    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
    const currentUser = await firebase.auth().signInWithCredential(credential)
    dispatch({ type: LOGIN_FIREBASE_SUCCESS, data: currentUser })
  } catch (e) {
    dispatch({ type: LOGIN_FIREBASE_FAILURE, error: e.message })
  }
}