import React from 'react';
import axios from 'axios';
const baseUrl = '/api/users'

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