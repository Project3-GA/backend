const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req,res, next) => {
     
    User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next)
})

router.get('/', (req,res,next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next)
})

module.exports = router