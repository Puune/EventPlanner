/**
 * Mongoose model for users
 * @module models.user
 */

const mongoose = require('mongoose');
const uValid = require('mongoose-unique-validator');

/**
 * This is a Mongoose schema for User
 * @class user
 * @property { String } username Username of the user.
 * @property { String } name Users real name.
 * @property { String } passwordHash Hashed string, derivated from users initial password submission.
 * @property { ObjectId[] } occasions Occasions that user is participating.
 * @property { ObjectId[] } invites Occasions that user is invited to.
 */
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

/**
 * The model makes use of unique-validator library
 * @implements uValidator
 */
userSchema.plugin(uValid);

/**
 * @function toJSON
 * Function to format outgoing occasions
 */
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