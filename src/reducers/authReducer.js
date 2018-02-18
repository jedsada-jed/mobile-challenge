import {
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAILURE,
  LOGIN_FACEBOOK_CANCEL,
  LOGIN_FIREBASE_REQUEST,
  LOGIN_FIREBASE_SUCCESS,
  LOGIN_FIREBASE_FAILURE,
} from '../constants/actionType'

const initialStateFacebook = {
  isLoading: false,
  isError: false,
  isCancel: false,
  error: '',
  data: {},
}

export const authenFacebook = (state = initialStateFacebook, action) => {
  switch (action.type) {
    case LOGIN_FACEBOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isCancel: false,
      }
    case LOGIN_FACEBOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isCancel: false,
        data: action.data,
        result: action.result,
      }
    case LOGIN_FACEBOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isCancel: false,
        error: action.error,
      }
    case LOGIN_FACEBOOK_CANCEL:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isCancel: true,
      }
    default:
      return state
  }
}

const initialStateFirebase = {
  isLoading: false,
  isError: false,
  data: {},
}

export const authenFirebase = (state = initialStateFirebase, action) => {
  switch (action.type) {
    case LOGIN_FIREBASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case LOGIN_FIREBASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.data,
      }
    case LOGIN_FIREBASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.error,
      }
    default:
      return state
  }
}

