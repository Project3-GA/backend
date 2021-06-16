const express = require('express')
const app = express()
const cors = require('cors')



//Setting the port to run on
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//logging requests in the terminal to help with debugging
const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);

//Controllers//

const userControllers = require('./controllers/userControllers')
app.use('/api/users', userControllers)

const cardControllers = require('./controllers/cardControllers')
app.use('/api/cards', cardControllers)

//Runs the port 
app.listen(app.get('port'), () => {
	console.log(`✅ Listening on port ${app.get('port')}`);
});

module.exports = app