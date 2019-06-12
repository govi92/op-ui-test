import { takeEvery, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import Types from '../actions/types';
import * as api from '../../utils/index';

function* getUsers() {
  try {
    const result = yield call(api.loginUser());
    console.log(result);

    yield put(actions.getUser({
      payload: result.data
    }));

  } catch (e) {
    console.log(e);
  }
}

function* watchGetUserRequest() {
  yield takeEvery(Types.LOGIN_USER, getUsers);
}

const usersSagas = [
  fork(watchGetUserRequest)
];

export default usersSagas;