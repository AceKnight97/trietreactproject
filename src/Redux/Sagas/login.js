import {
  put, call, take, fork,
} from 'redux-saga/effects';
import _ from 'lodash';

import { LOGIN_URL } from '../../Config';
import auth from '../../Helpers/auth';
import AppFlowActions from '../../Constants';

// import login from '../reducers/login';
import fetchClient from '../../Helpers/fetch-client';

function fetchUser(data) {
  const { email, password } = data;
  try {
    const options = {
      url: LOGIN_URL,
      method: 'POST',
      body: { email, password },
    };

    return fetchClient(options);
  } catch (error) {
    return null;
  }
}
/**
 * Log in saga
 */

export function* loginRequest() {
  const INFINITE = true;
  while (INFINITE) {
    const request = yield take(AppFlowActions.LOGIN_REQUEST);
    // yield put({ type: AppFlowActions.LOADING_COMPLTE, isLoading: true });

    const { data } = request;
    const { email } = data;
    const md = 'nhabanh@itrvn.com'; // MD
    // other accounts will be nurse
    const result = { isSuccess: true, user: { role: email === md ? 'MD' : 'NURSE', ...data } };
    if (result?.isSuccess) auth.login(result);
    yield put({ type: AppFlowActions.LOGIN_COMPLETE, data: result });

    // const { email, password } = data;
    // const nurse = 'nurse@itrvn.com';
    // const md = 'md@itrvn.com';
    // const tempPassword = 'Welcome1';
    // let result = {};
    // if ((email === nurse || email === md) && password === tempPassword) {
    //   console.log("it's nurse");
    //   result = { isSuccess: true, user: { role: email === nurse ? 'NURSE' : 'MD' } };
    // } else result = { isSuccess: false, message: 'Invalid' };
    // if (result.isSuccess) auth.login(result);

    // const result = yield call(fetchUser, { ...data });
    // if (result && !_.isEmpty(result)) {
    //   if (result.isSuccess) auth.login(result);
    //   yield put({ type: AppFlowActions.LOGIN_COMPLETE, data: result });
    //   if (result?.isSuccess) yield put({ type: AppFlowActions.GET_ALL_DATA_REQUEST });
    //   // yield put({ type: AppFlowActions.LOADING_COMPLTE, isLoading: false });
    // }
  }
}


export default function* loginFlow() {
  yield fork(loginRequest);
}
