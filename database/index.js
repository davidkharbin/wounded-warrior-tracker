const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://127.0.0.1/wounded-warrior-tracker', { useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;

// verify connection
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
	console.log('successful connection to mongodb!');
});

// module.exports = connection