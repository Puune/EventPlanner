//events will be referred as 'occasion's.

const occasionRouter = require('express').Router();
const Occasion = require('../models/occasion');
const User = require('../models/user');

//get public
occasionRouter.get('/public/', async(request, response, next) => {
  try{
    const results = await Occasion.find({ isPrivate: false });
    response.json(results.map((occ) => occ.toJSON()));
  } catch(exception){
    next(exception);
  }
})


//get from invites
occasionRouter.get('/invited/', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' });
    } else {
      const invitedTo = await Occasion.find({ isPrivate: true, invitees: request.token.id });
      response.json(invitedTo.map((occ) => occ.toJSON()));
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
        owner: user._id
      })

      const savedOccasion = await newOccasion.save();

      user.occasions = user.occasions.concat(savedOccasion._id);
      await user.save();

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
          owner: user._id
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


//delete
occasionRouter.delete('/:id', async(request, response, next) => {
  try{
    if(!request.token){
      response.status(401).json({ error: 'no token found' }).end();
    } else  {
      const user = await User.findById(request.token.id);
      const occasion = await Occasion.findById(request.params.id);

      if(occasion.owner.toString() === user._id.toString()){
        const index = await user.occasions.indexOf(occasion._id);
        await user.occasions.splice(index, 1);
        await user.save();

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