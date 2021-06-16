const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

//Creates a user in the database with a hashed password
router.post('/signup', async (req, res, next) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const email = req.body.email;
		const user = await User.create({ email, password });
		res.status(201).json(user);
	} catch (error) {
		return next(error);
	}
});

//Creates user token upon login and sends to front end to authenticate the user 
router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next);
});


module.exports = router;
