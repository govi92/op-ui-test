import { FETCH_USER, ADD_ARTICLE, LOGIN_USER, FETCH_ERROR, FETCH_USERS_LIST} from './types';

export function addUser(payload) {
  return { type: FETCH_USER, payload }
}

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
}

export function getUser(payload) {
  return { type: LOGIN_USER, payload }
}

export function fetchError(payload) {
  return { type: FETCH_ERROR, payload }
}

export function fetchUserList(payload) {
  return { type: FETCH_USERS_LIST, payload }
}