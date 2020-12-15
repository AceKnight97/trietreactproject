import { combineReducers } from 'redux';
import initialState from './initialState';
import auth from '../../Helpers/auth';
import AppFlowActions from '../../Constants';
import login from './login';

const appReducer = combineReducers({
  login,
});

function rootReducer(state, action) {
  if (action.type === AppFlowActions.LOGOUT_REQUEST) {
    auth.logout();
    return initialState;
  }

  return appReducer(state, action);
}

export default rootReducer;
