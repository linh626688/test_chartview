import axios from "axios";

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};


export function callApi(url, method, data = {}) {
  return axios({
    method,
    url,
    data,
  });
}
