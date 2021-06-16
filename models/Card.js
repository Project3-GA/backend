const mongoose = require('../db/connection')

//Data structure for Cards referencing the User as the author
const cardSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    tags: {
      type: [String],
    },
    comments: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
)
const Card = mongoose.model('Card', cardSchema)
module.exports = Card;