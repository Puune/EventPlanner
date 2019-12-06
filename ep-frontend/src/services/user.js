import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async () => {
  try{
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (exception){
    console.log(exception);
  }
}

export default { getUsers }