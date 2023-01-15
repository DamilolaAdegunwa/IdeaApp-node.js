const mongoose = require('mongoose')

const UserIdeaRelationshipSchema = new mongoose.Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
  },
  userId: {
    type: Number,
    required: [true, 'must provide userid'],
  },
  ideaId: {
    type: Number,
    required: [true, 'must provide ideaid'],
  }
})

module.exports = mongoose.model('UserIdeaRelationship', UserIdeaRelationshipSchema)