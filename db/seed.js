const Card = require('../models/Card');
const User = require('../models/User');
const users = require('./seedUser.json');
const cards = require('./seedCard.json');

User.deleteMany({})
    .then(() => User.insertMany(users))
    .then(console.log)
    .then(() => Card.deleteMany({}))
    .then(() => Card.insertMany(cards))
    .then(console.log)
    .catch(console.error).finally(() => {
        process.exit()
    })