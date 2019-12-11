/**
 * Occasion service module
 * @module occasion
 */

import axios from 'axios';
import confTool from '../util/configTool';
const baseUrl = '/api/occasions';

/**
 * This functions sends occasions get requests to back-end
 * @function getAll
 * @param { user } user 
 */
const getAll = async (user) => {
  if(user){
    try{
      const config = confTool.getConfig(user);
      const res = await axios.get(baseUrl, config);            
      return res.data;

    } catch(exception){
      console.log(exception);
    }
  } else {
    const res = await axios.get(baseUrl);
    return res.data;
  }
}

/**
 * This function sends post occasion requests to back-end
 * @function submit
 * @param {*} props 
 */
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

/**
 * This function sends occasion put requests that allow user to participate a occasion.
 * @function participate
 * @param {*} props 
 */
const participate = async(props) => {
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

/**
 * This function send occasion delete requests to back-end
 * @function deleteOccasion
 * @param { user } user 
 * @param { String } occasionId 
 */
const deleteOccasion = async(user, occasionId) => {
  try{
    const config = confTool.getConfig(user);
    const res = await axios.delete(`${baseUrl}/${occasionId}`, config);
    return res.data; 
  } catch(exception){
    console.log(exception);
  }
}

export default { getAll, submit, participate, deleteOccasion };