const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const { requireToken } = require('../middleware/auth');

router.get('/', requireToken, (req, res, next) => {
	Card.find()
		.then((cards) => res.json(cards))
		.catch(next);
});

router.get('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	Card.findById(id)
		.then((cards) => res.json(cards))
		.catch(next);
});

router.post('/', requireToken, (req, res, next) => {
	req.body.author = req.user._id;
	Card.create(req.body)
		.then((card) => res.json(card))
		.catch(next);
});

router.patch('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	const updated = req.body;
	Card.findOneAndUpdate({ _id: id, author: req.user._id }, req.body, {
		new: true,
	})
		.then((card) => res.json(card))
		.catch(next);
});

router.patch('/tags/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	const tagName = req.body.tags;

	Card.findOneAndUpdate(
		{ _id: id, author: req.user._id },
		{ $pull: { tags: tagName } },
		{ new: true }
	).catch(next);
});
router.delete('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	Card.findOneAndDelete({ _id: id, author: req.user._id })
		.then((card) => {
			res.status(204);
		})
		.catch(next);
});

router.get('/personal/:id', requireToken, (req, res, next) => {
	const id = req.params.id;

	Card.find({ author: id })
		.then((cards) => res.json(cards))
		.catch(next);
});

module.exports = router;
