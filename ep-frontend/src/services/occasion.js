import axios from 'axios';
import confTool from '../util/configTool';
const baseUrl = '/api/occasions';


const getPublic = async (user) => {
  try{
    if(user){
      const config = confTool.getConfig(user);
      const res = await axios.get(`${baseUrl}/public`, config);
      return res.data
    } else {
      const res = await axios.get(`${baseUrl}/public`);
      return res.data
    }
  }catch (exception){
    console.log(exception);
  }
}

const getOwned = async (user) => {    
  try {
    const config = confTool.getConfig(user);
    const response = await axios.get(`${baseUrl}/owned`, config);
    return response.data;

  } catch (exception) {
    console.log(exception);
  }
}

const getPrivates = async (user) => {
  try {
    const config = confTool.getConfig(user);
    const response = await axios.get(`${baseUrl}/privates`, config);
    return response.data;

  } catch (exception) {
    console.log(exception);
  }
}

const submit = async (props) => {
  const user = props.user;
  const body = props.body;
  
  try {
    const config = confTool.getConfig(user); 
    const newOccasion =  {
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
      isPrivate: body.isPrivate,
      date: body.date,
      location: body.location
    }

    const response = await axios.post(`${baseUrl}`, newOccasion, config);    
    return response.data;
  
  } catch(exception){
    console.log(exception);
  }
}


const participatePublic = async(props) => {
  console.log(props);
  
  const user = props.user;
  const body = props.body;

  try {
    const config = confTool.getConfig(user);

    const response = await axios.put(baseUrl, body, config);
    return response.data;
  } catch(exception){
    console.log(exception);
  }
}

const deleteOccasion = async(user, occasionId) => {
  try{
    const config = confTool.getConfig(user);
    const res = await axios.delete(`${baseUrl}/${occasionId}`, config);
    return res.data; 
  } catch(exception){
    console.log(exception);
  }
}

export default { getPublic, getOwned, getPrivates, submit, participatePublic, deleteOccasion };