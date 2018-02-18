import {
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE
} from '../constants/actionType'

export const addNote = (data) => dispatch => {
  try {
    dispatch({ type: ADD_NOTE_REQUEST })
    return dispatch({ type: ADD_NOTE_SUCCESS, data })
  } catch (e) {
    return dispatch({ type: ADD_NOTE_FAILURE })
  }
}
