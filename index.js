const express = require('express')
const app = express()
const cors = require('cors')




app.set("port", process.env.PORT || 3000);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);

const userControllers = require('./controllers/userControllers')
app.use('/api/users', userControllers)



app.listen(app.get('port'), () => {
	console.log(`✅ Listening on port ${app.get('port')}`);
});

module.exports = app