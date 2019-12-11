/**
 * This module handles CRUD of occasions.
 * @module controller.occasion
 */

/* eslint-disable require-atomic-updates */
//events will be referred as 'occasion's.
const _ = require('lodash');
const occasionRouter = require('express').Router();
const Occasion = require('../models/occasion');
const User = require('../models/user');

/**
 * Occasion GET method. Get has two levels of access; Non-user access, and user access. Public occasions
 * are allowed to be viewed without login, but private occasion only show for user with required prerequisites.
 *
 * When occasions with relation to user are got, they are labeled before returning as:
 * 'public', 'owned', 'participant', 'invited'. These labels are not stored in database or backend.
 * @function get
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns public occasion[].
 * @returns public occasion[] + occasions[] that relate to the requesting user.
 */
occasionRouter.get('/', async(request, response, next) => {
  if(!request.token){
    try{
      const results = await Occasion.find({ isPrivate: false });
      results.forEach((res) => res.type = 'public');
      response.json(results.map((res) => res.toJSON()));
    } catch(exception){
      next(exception);
    }
  }

  else {
    try{
      const invitedTo = await Occasion.find({ invitees: request.token.id });
      invitedTo.forEach((occ) => occ.type = 'invited');

      const participating = await Occasion.find({ participants: request.token.id });
      participating.forEach((occ) => occ.type = 'participant');

      const owned = await Occasion.find({ owner: request.token.id });
      owned.forEach((occ) => occ.type = 'owned');

      var publics = await Occasion.find({ isPrivate: false })
      publics.forEach((occ) => occ.type = 'public');

      var collection = [];
      collection = collection.concat(owned);
      collection = collection.concat(invitedTo);
      collection = collection.concat(participating);

      publics = publics.filter((occ) => {
        return !_.includes(collection, occ.id);
      })

      collection.concat(publics);

      response.json(collection.map((occ) => occ.toJSON()));

    } catch(exception){
      next(exception);
    }
  }
})


/**
 * Occasion POST mnethod. Validates the requester, and creates a new occasion to document DB.
 * @function post
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns Created occasion
 */
occasionRouter.post('/', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' }).end();
    } else {
      //find user matching the token
      const user = await User.findById(request.token.id);

      const body = request.body;

      const newOccasion = new Occasion({
        title: body.title,
        subtitle: (typeof body.subtitle !== 'undefined') ? body.subtitle : 'No subtitle',
        description: body.description,
        isPrivate: (typeof body.isPrivate !== 'undefined')
          ? body.isPrivate
          : false,
        owner: user._id,
        date: body.date,
        location: body.location
      });

      const savedOccasion = await newOccasion.save();

      user.occasions = user.occasions.concat(savedOccasion._id);
      await user.save();

      savedOccasion.type = 'owned'
      response.json(savedOccasion.toJSON());
    }

  } catch(exception){
    next(exception);
  }
});


/**
 * Occasion UPDATE method. Validates requester. Allows occasion owner to update occasion information
 * @function put
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns Updated occasion
 */
occasionRouter.put('/:id', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' }).end();
    } else{
      const user = await User.findById(request.token.id);
      const occasion = await Occasion.findById(request.params.id);
      const body = request.body;

      if(occasion.owner.toString() === user._id.toString()){
        const updatedOccasion = {
          title: body.title,
          subtitle: (typeof body.subtitle !== 'undefined') ? body.subtitle : 'No subtitle',
          description: body.description,
          isPrivate: (typeof body.isPrivate !== 'undefined') ? body.isPrivate : false,
          owner: user._id,
          date: body.date,
          location: body.location,
          type: null
        }

        const result = await Occasion.findByIdAndUpdate(
          request.params.id,
          updatedOccasion,
          { new: true }
        );

        response.json(result.toJSON());
      } else {
        response.status(401).json({ error: 'wrong credentials' })
      }
    }
  } catch(exception){
    next(exception);
  }
})


/**
 * Occasion UPDATE/PARTICIPATE method. Validates requester. Allows user to assing himself as participant of an public occasion.
 * @function put
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns HTML status and updated occasion.
 */
occasionRouter.put('/', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' }).end();
    } else {
      const occasion = await Occasion.findById(request.body.occasionId);
      const user = await User.findById(request.token.id);

      if(occasion.isPrivate === false){
        response.status(401).json({ error: 'User not valid to participate' }).end();
      } else {
        try{
          if(request.body.participate === true){
            occasion.participants = occasion.participants.concat(user._id);
            user.occasions = user.occasions.concat(occasion._id);
          } else if(request.body.participate === false){
            occasion.participants =
              occasion.participants.filter((part) => part.toString() !== user._id.toString());
            user.occasions =
              user.occasions.filter((occ) => occ.toString() !== occasion._id.toString());
          }

          await occasion.save();
          await user.save();

          (request.body.participate === true)
            ? occasion.type = 'participant'
            : occasion.type = 'public';

          response.status(200).json(occasion.toJSON());
        } catch(exception){
          console.log(exception);
        }
      }
    }
  } catch(exception){
    next(exception);
  }
});


/**
 * Occasion DELETE method. Validates requester as owner and deletes occasion and every user relation to the occasion.
 * @function delete
 * @param '/' Endpart of url
 * @param request Param that contains html request
 * @param response Param to which html response is projected
 * @param next Param that allows the use of middleware
 * @returns HTML status
 */
occasionRouter.delete('/:id', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' }).end();
    } else  {
      const user = await User.findById(request.token.id);
      const occasion = await Occasion.findById(request.params.id);
      const invitees = await User.find({ invites: occasion._id })
      const participants = await User.find({ occasions: occasion._id });

      if(occasion.owner.toString() === user._id.toString()){
        try{
          if(invitees){
            const tier1 = (invitee) => {
              invitee.invites = invitee.invites.filter((inv) => inv.toString() !== request.params.id.toString());
              return invitee;
            }
            const tier2 = invitees.map((inv) => tier1(inv));
            const tier3 = tier2.map((inv) => inv.save());
            await Promise.all(tier3);
          }

          if(participants){
            const tier1 = (part) => {
              part.occasions = part.occasions.filter((occ) => occ.toString() !== request.params.id.toString());
              return part;
            }
            const tier2 = participants.map((part) => tier1(part));
            const tier3 = tier2.map((part) => part.save());
            await Promise.all(tier3);
          }

        } catch(exception){
          console.log('Failed deleting occasion references from users');
          console.log(exception);
        }

        await Occasion.findByIdAndDelete(request.params.id);
        response.status(200).end();
      } else {
        response.status(401).json({ error: `invalid user: ${user._id}` })
      }
    }
  } catch(exception){
    next(exception);
  }
})

module.exports = occasionRouter;