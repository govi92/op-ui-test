import { FETCH_USER, ADD_ARTICLE, LOGIN_USER, FETCH_ERROR} from './types';

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