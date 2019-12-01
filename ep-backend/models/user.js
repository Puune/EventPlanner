const mongoose = require('mongoose');
const uValid = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  occasions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Occasion',
    }
  ],
  invites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invite',
    }
  ]
})

userSchema.plugin(uValid);

//method to format user-object for front-end
userSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
    delete returnObj.passwordHash;
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;