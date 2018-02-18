import {
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE
} from '../constants/actionType'


const initialState = {
  isLoading: false,
  isError: false,
  dataNote: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case ADD_NOTE_SUCCESS:
      const dataNote = state.dataNote
      dataNote.push(action.data)
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataNote,
      }
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      return state
  }
}
