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