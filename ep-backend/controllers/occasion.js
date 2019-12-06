/* eslint-disable require-atomic-updates */
//events will be referred as 'occasion's.

const occasionRouter = require('express').Router();
const Occasion = require('../models/occasion');
const User = require('../models/user');

//get public
occasionRouter.get('/public/', async(request, response, next) => {
  try{
    const results = await Occasion.find({ isPrivate: false });
    results.forEach((occ) => {
      if(request.token){
        if(occ.participants.includes(request.token.id)) {
          occ.type = 'participant';
        } else {
          occ.type = 'public';
        }
      } else {
        occ.type = 'public';
      }
    })
    console.log(results);
    response.json(results.map((occ) => occ.toJSON()));
  } catch(exception){
    next(exception);
  }
})


//get privates
occasionRouter.get('/privates/', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' });
    } else {
      const invitedTo = await Occasion.find({ isPrivate: true, invitees: request.token.id });
      invitedTo.forEach((occ) => occ.type = 'invited')

      const participates = await Occasion.find({ isPrivate: true, participants: request.token.id });
      participates.forEach((occ) => occ.type = 'participant')

      const privates = invitedTo.concat(participates);
      console.log(invitedTo);
      response.json(privates.map((occ) => occ.toJSON()));
    }
  } catch(exception){
    next(exception);
  }
})


//get owned
occasionRouter.get('/owned/', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' });
    } else {
      const owned = await Occasion.find({ owner: request.token.id });
      owned.forEach((occ) => occ.type = 'owned')
      response.json(owned.map((occ) => occ.toJSON()));
    }
  } catch(exception){
    next(exception);
  }
})


//post
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


//update
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
          location: body.location
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


//update / participate public occasion
occasionRouter.put('/', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' }).end();
    } else {
      const occasion = await Occasion.findById(request.body.occasionId);
      const user = await User.findById(request.token.id);

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
  } catch(exception){
    next(exception);
  }
});


//delete
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