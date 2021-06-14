const express = require('express')
const router = express.Router()
const Card = require('../models/Card')
const { requireToken } = require('../middleware/auth')


router.get('/', requireToken, (req, res, next) => {
	Card.find()
		.then((cards) => res.json(cards))
		.catch(next);
});

router.get('/:id', requireToken, (req, res, next) => {
	const id = req.params.id
	Card.findById(id)
		.then((cards) => res.json(cards))
		.catch(next)
})

router.post('/', requireToken, (req, res, next) => {
	req.body.author = req.user._id
	Card.create(req.body)
		.then((card) => res.json(card))
		.catch(next);
});

router.delete('/:id', requireToken, (req, res, next) => {
	const id = req.params.id
	Card.findOneAndDelete({ _id: id, author: req.user._id })
		.then((card) => {
			console.log(card)
			res.status(204)
		})
		.catch(next);
})

// router.patch('/:id', requireToken, (req,res,next) =>{
// 	const id = req.params.id
// 	const updated = req.body
// 	Card.findByIdAndUpdate(id, updated)
// 		.then(())
// })

router.patch('/:id', requireToken, (req, res, next) => {
	const id = req.params.id;
	const updated = req.body;
	Card.findOneAndUpdate({ _id: id, author: req.user._id }, req.body, { new: true })
		.then((card) => res.json(card))
		.catch(next);
});


module.exports = router