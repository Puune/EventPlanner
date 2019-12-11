/**
 * Configuration utility
 * @module configTool
 */


 /**
  * This function creates a config item, containing Authorization header.
  * @function getConfig
  * @param { user } user 
  */
const getConfig = (user) => {
  if(!user){
    return null;
  } else {
    const config = {
      headers: { Authorization: `bearer ${user.token}` }
    }  

    return config;
  }
}

export default { getConfig }