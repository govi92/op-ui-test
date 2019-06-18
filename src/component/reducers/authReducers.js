import { LOGIN_USER, FETCH_ERROR } from '../actions/types';

const initialState = {
  accessToken: '',
  expiresIn: '',
  errorMsg: '',
  errorStatus: ''
}

export default function (state = initialState, action) {
  let sumReduce;

  if (typeof action.payload === 'object') {
    sumReduce = action.payload.payload;
  }

  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        accessToken: sumReduce.accessToken,
        expiresIn: sumReduce.expiresIn,
      }
    case FETCH_ERROR:
      return {
        ...state,
        errorMsg: sumReduce.data.message,
        errorStatus: sumReduce.status
      }
    default:
      return state;
  }
}
