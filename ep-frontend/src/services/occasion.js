import axios from 'axios';
const baseUrl = '/api/occasions';

const getConfig = (user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` }
  }  
  return config;
}

const getPublic = async () => {
  const response = await axios.get(`${baseUrl}/public`);
  return response.data;
}

const getOwned = async (user) => {    
  try {
    const config = getConfig(user);
    const response = await axios.get(`${baseUrl}/owned`, config);
    return response.data;

  } catch (exception) {
    console.log(exception);
  }
}

const getInvited = async (user) => {
  try {
    const config = getConfig(user);
    const response = await axios.get(`${baseUrl}/invited`, config);
    return response.data;

  } catch (exception) {
    console.log(exception);
  }
}

export default { getPublic, getOwned, getInvited };