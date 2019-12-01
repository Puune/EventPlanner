const mongoose = require('mongoose');

const occasionSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  subtitle: {
    type: String,
    require: false
  },
  description: {
    type: String,
    require: true
  },
  isPrivate: {
    type: Boolean,
    require: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Owner'
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      sparse: true,
      default: null,
    }
  ],
  invitees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invitee',
      sparse: true,
      default: null,
    }
  ]
});

occasionSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  }
})

const Occasion = mongoose.model('Occasion', occasionSchema);

module.exports = Occasion;