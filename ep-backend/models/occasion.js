/**
 * Mongoose class for Occasions
 * @module models.occasion
 */

const mongoose = require('mongoose');

/**
 * This is a Mongoose schema for Occasion
 * @class Occasion
 * @property { String } title Required. Title of the occasion.
 * @property { String } subtitle Subtitle of the occasion.
 * @property { String } description Required. Long descritpion of the occasion.
 * @property { Boolean } isPrivate Status, whether occasion is visible publicly.
 * @property {  ObjectId } owner Required. Id of the occasion's owner.
 * @property { ObjectId[] } participants Array of users participating the occasion.
 * @property { ObjectId[] } invitees Array of users that have been invited to the occasion.
 * @property { String } type Type of the occasion. This value is always custom tailored, when sent to browser. Types { 'public', 'owned', 'invited', 'participant' }
 * @property { Date } date Date that the occasion happens on. The date is actually stored as JSON.
 * @property { String } location Location of the event.
 */
const occasionSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 3
  },
  subtitle: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: true,
    minlength: 3
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
  ],
  type: {
    type: String
  },
  date: {
    type: Date
  },
  location: {
    type: String
  }
});

/**
 * Function to format outgoing occasions
 * @function toJSON
 */
occasionSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  }
})

const Occasion = mongoose.model('Occasion', occasionSchema);

module.exports = Occasion;