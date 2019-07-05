import {FETCH_USERS_LIST} from '../actions/types';

const initialState = {
  users: []
}

export default function(state = initialState, actions) {
  console.log(actions.payload);
  
  switch(actions.type) {
    case FETCH_USERS_LIST: 
      return {
        users: actions.payload
      }
    default:
      return state;
  }
}