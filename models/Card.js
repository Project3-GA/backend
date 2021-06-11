const mongoose = require('../db/connection')

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
        // required: true
      }
    },
)
const Card = mongoose.model('Card', cardSchema)
module.exports = Card;