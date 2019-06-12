import { LOGIN_USER } from '../actions/types';

const initialState = {
  accessToken: '',
  expiresIn: '',
  user: []
}

export default function (state = initialState, action) {
  console.log(action.payload);

  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
        user: [state.user.push(action.payload)]
      }
    default:
      return state;
  }
}
