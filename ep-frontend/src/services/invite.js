/**
 * Invite service module.
 * @module invite
 */

import axios from 'axios';
import confTool from '../util/configTool';

const baseUrl = '/api/invitation'

/**
 * This function sends invite requests to back-end
 * @function sendInvite
 * @param { user } user 
 * @param { String  occasionId 
 * @param { String } inviteeId 
 */
const sendInvite = async (user, occasionId, inviteeId) => {
  try {
    const config = confTool.getConfig(user);
    const reqBody = {
      occasionId: occasionId,
      inviteeId: inviteeId
    } 

    const response = await axios.post(baseUrl, reqBody, config);
    return response.data;
  } catch(exception) {
    console.log(exception);
  }
}

/**
 * This function sends invite-response requests to back-end
 * @function answerInvite
 * @param { user } user 
 * @param { String } occasionId 
 * @param { Boolean } accept 
 */
const answerInvite = async (user, occasionId, accept) => {
  try{
    const config = confTool.getConfig(user);
    const reqBody = {
      occasionId,
      inviteeId: user.id,
      accept
    }

    const response = await axios.put(baseUrl, reqBody, config);
    return response.data;
  } catch(exception){
    console.log(exception);
  }
}

export default { sendInvite, answerInvite }