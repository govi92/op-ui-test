import React from 'react';
import axios from 'axios';
import store from '../component/store/index';
import { getUser, fetchError } from '../component/actions/index';
import { LOGIN_USER, FETCH_ERROR } from '../component/actions/types';

export const registerUser = async (props) => {
  try {
    const payload = await axios.post('/news-api/v1/register', {
      type: props.type,
      email: props.email,
      password: props.password
    })
    .catch(function (error) {
      store.dispatch(fetchError({ type: FETCH_ERROR, payload: error.response }));
      return false;
    });

    let res;
    if(props.type === 'op') {
      res = payload.data.success;
    } else {
      res = payload.data.message;
    }
    return res;

  } catch (e) {
    console.log(e.name, e.status);
  }
};

export const registerCompanyDetails = async (props) => {
  try {
    const response =  await axios.post(
      '/news-api/v1/register-details',
      {
        organization: props.organization,
        designation: props.designation,
        employeeCount: parseInt(props.empAcc)
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${props.accessToken}`,
        }
      }
    )
    .catch(function(error) {
      store.dispatch(fetchError({type: FETCH_ERROR, payload:error.response}));
      return false
    });
    return response;
    
  } catch (error) {
    console.log(error.stack);
  }
  
};

export const loginUser = async (props) => {
  try {
    const response = await axios.post('/news-api/v1/login', {
      type: props.type,
      email: props.email,
      password: props.password
    })
      .catch(function (error) {
        store.dispatch(fetchError({ type: FETCH_ERROR, payload: error.response }))
        return false;
      });
    if(props.type === 'op') {
      if (response !== false) {
        const payload = response.data.data;
        store.dispatch(getUser({ type: LOGIN_USER, payload }));
        localStorage.setItem('loginStats', payload);
        return payload.accessToken;
      } else {
        return false;
      }
    } else {
      if (response.data.success) {
        const payload = response.data;
        return {message: payload.message };
      } else {
        return false;
      }
    }

  } catch (e) {
    console.log(e.stack);
  }
};

export const newsGallery = async() => {
  
  return await axios.get(
    'http://localhost:9090/news-api/v1/news/',
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${store.getState().auth.accessToken}`
      }
    }
  );
};


export const confirmRegistration = async(props) => {
  try {
    const response = await axios.get(`http://localhost:9090/news-api/v1/register-confirmation/${props}`)
    .catch(function(e) {
      console.log(e);
    });
    return response;
  } catch(error) {
    console.log(error);
  }
};

export const googleCallBackURL = async (params) => {
  try {
    return await axios.get(`http://localhost:9090/news-api/v1/callback-google${params}`)
    .catch(function(e) {
      return (e.status, e.data.message)
    });
  } catch (error) {
    console.log(error);
  }
};

export const googleLoginCallBackURL = async (params) => {
  try {
    return await axios.get(`http://localhost:9090/news-api/v1/callback-google-login${params}`)
    .catch(function(e) {
      return (e.status, e.data.message)
    });
  } catch (error) {
    console.log(error);
    return {statu: 404}
  }
};

export const callBackURL = async (medium, params) => {
  try {
    return await axios.get(`http://localhost:9090/news-api/v1/callback-${medium}${params}`)
    .catch(function(e) {
      console.log(e.response);
      return e.response
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginCallBackURL = async (medium, params) => {
  try {
    const res = await axios.get(`http://localhost:9090/news-api/v1/callback-${medium}-login${params}`)
    .catch(function(e) {
      return (e.response.status, e.data.message)
    });
    return res;
  } catch (error) {
    console.log(error);
    return {status: 404}
  }
};

export const refreshToken = async (params) => {
  try {
    return await axios.get(
      `http://localhost:9090/news-api/v1/refresh-token${params}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${store.getState().auth.accessToken}`
        }
      }
    )
    .catch(function(e) {
      return (e.response.status, e.data.message)
    });
  } catch (error) {
    console.log(error);
    return {statu: 404}
  }
};