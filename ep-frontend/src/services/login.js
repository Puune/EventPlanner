/**
 * Login service module
 * @module login
 */

import axios from 'axios';
const baseUrl = '/api/login';

/**
 * This function sends login requests to back-end
 * @function login
 * @param {*} credentials 
 */
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

export default { login }