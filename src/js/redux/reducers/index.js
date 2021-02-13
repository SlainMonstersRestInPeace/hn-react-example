import { combineReducers } from 'redux'

import appStateSlice from './appState'

const defaultReducer = (state = {}, action) => {
  return state;
}

export default combineReducers({
  appState: appStateSlice
})