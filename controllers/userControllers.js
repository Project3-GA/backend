const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { createUserToken } = require('../middleware/auth')


router.post('/signup', async (req, res, next) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        const email = req.body.email
        const user = await User.create({ email, password })
        res.status(201).json(user)
    } catch (error) {
        return next(error)
    }
})

router.post('/signin', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => createUserToken(req, user))
        .then((token) => res.json({ token }))
        .catch(next);
});

router.get('/', (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next)
})



module.exports = router