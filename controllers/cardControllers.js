const express = require('express')
const router = express.Router()
const Card = require('../models/Card')
const { requireToken } = require('../middleware/auth')


router.get('/', requireToken, (req, res, next) => {
	Card.find()
		.then((cards) => res.json(cards))
		.catch(next);
});

router.post('/', requireToken, (req, res, next) => {
	Card.create(req.body)
		.then((card) => res.json(card))
		.catch(next);
});

module.exports = router