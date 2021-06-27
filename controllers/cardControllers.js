const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const { requireToken } = require('../middleware/auth');

//Get all the cards in database and send them to the gallery on the frontend
router.get('/', requireToken, (req, res, next) => {
	Card.find()
		.then((cards) => res.json(cards))
		.catch(next);
});

//Get a specific card and send to the CardDetails on the frontend
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Card.findById(id)
		.then((cards) => res.json(cards))
		.catch(next);
});

//Creating a card in the database
router.post('/', requireToken, (req, res, next) => {
	req.body.author = req.user._id;
	Card.create(req.body)
		.then((card) => res.json(card))
		.catch(next);
});

//Adding a tag to an already existing card in the database
// router.patch('/:id', requireToken, (req, res, next) => {
// 	const id = req.params.id;
// 	const updated = req.body;
// 	Card.findOneAndUpdate({ _id: id, author: req.user._id }, req.body, {
// 		new: true,
// 	})
// 		.then((card) => res.json(card))
// 		.catch(next);
// });
router.patch('/:id', requireToken, async (req, res, next) => {
	console.log(req.user);
	try {
		let card = await Card.findOne({ _id: req.params.id, author: req.user._id });

		if (!card) throw new Error('No user found');
		if (req.body.tag) card.tags.push(req.body.tag);
		await card.save();
		res.json(card);
	} catch (error) {
		res.json(error);
	}
});
//Removes tag from the tags array on a card
router.patch('/tags/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	const tagName = req.body.tags;

	Card.findOneAndUpdate(
		{ _id: id, author: req.user._id },
		{ $pull: { tags: tagName } },
		{ new: true }
	)
		.then((card) => res.json(card))
		.catch(next);
});

//Deleting a card from the database
router.delete('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	Card.findOneAndDelete({ _id: id, author: req.user._id })
		.then((card) => {
			res.status(204);
		})
		.catch(next);
});

//Gets all cards created by the authenticated user and sends to the front end
router.get('/personal/:id', requireToken, (req, res, next) => {
	const id = req.user.id;
	Card.find({ author: id })
		.then((cards) => res.json(cards))
		.catch(next);
});

module.exports = router;
