import { FETCH_USER, ADD_ARTICLE, LOGIN_USER } from './types';

// export const fetchUser = () => async dispatch => {
//   const rest = await axios.get('/')

//   return dispatch(FETCH_USERS, {rest})
// }

export function addUser(payload) {
  return { type: FETCH_USER, payload }
}

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
}

export function getUser(payload) {
  return { type: LOGIN_USER, payload }
}