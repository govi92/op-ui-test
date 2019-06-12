import axios from 'axios';
import store from '../component/store/index';
import { getUser, addUser } from '../component/actions/index';
import { LOGIN_USER, FETCH_USER } from '../component/actions/types';

export const registerUser = async (props) => {
  const payload = await axios.post('/news-api/v1/register', {
    type: props.type,
    email: props.email,
    password: props.password
  });

  const res = payload.data.success;
  store.dispatch(addUser({ type: FETCH_USER, payload }));
  
  return res;
};

export const registerCompanyDetails = (props) => {
  return axios.post('/news-api/v1/register-details', {
    email: props.email,
    organization: props.organization,
    designation: props.designation,
    employeeCount: props.employeeCount
  });
};

export const loginUser = async (props) => {
  const response = await axios.post('/news-api/v1/login', {
    type: props.type,
    email: props.email,
    password: props.password
  });
  const payload = response.data.data;
  console.log(payload);
  
  store.dispatch(getUser({ type: LOGIN_USER, payload }));
};