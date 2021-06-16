const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Selecting the secret  to use for hashing passwords 
const secret = process.env.JWT_SECRET || 'some secret key here';

const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

const strategy = new Strategy(opts, function (jwt_payload, done) {
	User.findById(jwt_payload.id)
		.then((user) => done(null, user))
		.catch((err) => done(err));
});

passport.use(strategy);
passport.initialize();

const requireToken = passport.authenticate('jwt', { session: false });

//Function to create user token based on user email and and password matching to user in the database.  Then passing that user id to the token to be sent to frontend and used to authenticate the user. 
const createUserToken = (req, user) => {
	if (
		!user ||
		!req.body.password ||
		!bcrypt.compareSync(req.body.password, user.password)
	) {
		const err = new Error('The provided username or password is incorrect');
		err.statusCode = 422;
		throw err;
	}
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

module.exports = {
	requireToken,
	createUserToken,
};
