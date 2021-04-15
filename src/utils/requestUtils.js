import axios from 'axios';
import { isEmpty } from 'lodash';
import {ACCESS_TOKEN} from "../constants/constants";

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export function callApiNoToken(url, method, data = {}) {
  return axios({
    method,
    url,
    data,
  });
}

export function callApi(url, method, data = {}) {
  const headers = {};
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!isEmpty(token)) {
    headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
  }
  return axios({
    method,
    url,
    headers,
    data,
  });
}
export function postRequest(url, data, requestConfig = {}) {
  const headers = {};
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!isEmpty(token)) {
    headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
  }
  requestConfig.headers = headers;
  return axios.post(url, data, requestConfig)
}

axios.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    if (error.response &&
      error.response.status === 401) {
      localStorage.clear();
      window.location = '/cms';
    }
    console.log('error',error)
    return Promise.reject(error.response.data)
  },
);
