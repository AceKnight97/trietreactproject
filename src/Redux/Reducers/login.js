import AppFlowActions from '../../Constants';
import initialState from './initialState';
import auth from '../../Helpers/auth';
import { convertLoginData } from '../../Ultis';

const login = (state = initialState.login, action) => {
  switch (action.type) {
    case AppFlowActions.LOGIN_COMPLETE:
    // eslint-disable-next-line camelcase
      const formatedData = convertLoginData(action.data);
      auth.setDatalogin(formatedData);
      return action.data;
    case AppFlowActions.LOGOUT_COMPLETE:
      return action;
    default:
      return state;
  }
};

export default login;
