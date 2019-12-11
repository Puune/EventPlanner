/**
 * invitation.js handles invitation requests
 * @module controller.invitation
 */

const invitationRouter = require('express').Router();
const User = require('../models/user');
const Occasion = require('../models/occasion');

/**
 * Invitation POST. Validates request, and connects invited person to an occasion in document DB.
 * @function post
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns HTML status
 */
invitationRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body;
    const occasion = await Occasion.findOne({ _id: body.occasionId });
    const invitee = await User.findOne({ _id: body.inviteeId });

    if(!request.token){
      response.status(401).json({ error: 'no token found' });
    } else {
      if(occasion.owner.toString() === request.token.id.toString()){
        if(invitee.invites.includes(occasion._id)){
          return response.status(400).json({ error: 'duplicate invite' })
        }

        occasion.invitees = occasion.invitees.concat(invitee._id);
        await occasion.save();

        invitee.invites = invitee.invites.concat(occasion._id);
        await invitee.save();

        response.status(200).json(`user ${invitee._id} invited to ${occasion._id}`)
      } else {
        response.status(401).json({ error: 'Wrong owner' });
      }
    }
  } catch(exception) {
    next(exception);
  }
})


/**
 * Invitation PUT method. Validates accept/decline request. In document DB user is removed fron 'invitees'
 * and either removes connection or adds user to 'participants'
 * @function put
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns HTML status and the occasion in question.
 */
invitationRouter.put('/', async (request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' });
    } else {
      const body = request.body;
      const invitee = await User.findById(request.token.id);
      const occasion = await Occasion.findById(body.occasionId);

      invitee.invites = invitee.invites.filter((occ) => occ.toString() !== occasion._id.toString());
      occasion.invitees = occasion.invitees.filter((inv) => inv.toString() !== invitee._id.toString());
      if(body.accept){
        invitee.occasions = invitee.occasions.concat(occasion._id);
        occasion.participants = occasion.participants.concat(invitee._id);
      }
      await invitee.save();
      await occasion.save();

      console.log(occasion);
      response.status(200).json(occasion.toJSON());
    }
  } catch(exception){
    next(exception);
  }
})

module.exports = invitationRouter;