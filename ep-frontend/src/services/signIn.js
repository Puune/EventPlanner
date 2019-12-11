/**
 * Sing in service module
 * @module signin
 */

import React from 'react';
import axios from 'axios';
const baseUrl = '/api/users'

/**
 * This function sends sign in requests to back-end
 * @function post
 * @param {*} props 
 */
const post = async (props) => {
  try{
    const newUser = {
      username: props.username,
      name: props.name,
      password: props.password
    }

    const response = await axios.post(baseUrl, newUser);
    return response.data;

  } catch(exception){
    console.log(exception);
  }
}

export default { post };