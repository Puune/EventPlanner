const invitationRouter = require('express').Router();
const User = require('../models/user');
const Occasion = require('../models/occasion');
//const mongoose = require('mongoose');

//send invite to a person
invitationRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body;
    const occasion = await Occasion.findOne({ _id: body.occasionId });
    const invitee = await User.findOne({ _id: body.inviteeId });

    if(!request.token){
      response.status(401).json({ error: 'no token found' });
    } else {
      console.log(occasion.owner, request.token);
      if(occasion.owner.toString() === request.token.id.toString()){
        if(occasion.invitees.includes(invitee._id)){
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


//accept / reject invitation
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

      response.status(200).json(`user ${invitee._id} has accepted invite: ${body.accept}`);
    }
  } catch(exception){
    next(exception);
  }
})

module.exports = invitationRouter;