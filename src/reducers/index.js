import { combineReducers } from 'redux'
import noteReducer from './noteReducer'
import { authenFacebook, authenFirebase } from './authReducer'

export default combineReducers({
  authenFacebook,
  authenFirebase,
  noteReducer
})
