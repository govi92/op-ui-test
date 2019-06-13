import { LOGIN_USER } from '../actions/types';

const initialState = {
  accessToken: '',
  expiresIn: '',
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
    default:
      return state;
  }
}
