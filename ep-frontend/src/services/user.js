/**
 * User service module
 * @module user
 */

import axios from 'axios'

const baseUrl = '/api/users'

/**
 * This function send get(all) requests to back-end.
 * @function getUsers
 */
const getUsers = async () => {
  try{
    const response = await axios.get(baseUrl);    
    return response.data;
  } catch (exception){
    console.log(exception);
  }
}

export default { getUsers }