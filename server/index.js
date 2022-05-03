const express = require('express');
// const dotenv = require('dotenv').config();
const connectDB = require('../database/db.config');
const https = require('https');
const path = require('path');
const cors = require('cors');
// const sslCreds = require('./ssl.config');
const fetchNewActivities = require('./fetchNewActivities');

const cron = require('node-cron');

// connect mongo
connectDB();

// app server
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/workouts-2021', require('./routes/workoutRoutes'));

// const httpsServer = https.createServer(credentials, app);
// const port = process.env.PORT || 8443;
// httpsServer.listen(port, () => {
//   console.log(`Express server listening on port: ${port}`);
// });


///////////////////////////////////////////////////////////
// REMOVE THIS FOR PROD SERVER, UNCOMMENT THE HTTPS SERVER,
//         AND UNCOMMENT THE SSL.CONFIG.JS IMPORT
///////////////////////////////////////////////////////////
app.listen(3001, () => {
  console.log(`Web server running on: http://localhost:3001`);
});



// fetchNewActivities();

// refresh data every 4 hours
cron.schedule('0 */4 * * *', () => {
  console.log('cron job executed')
  fetchNewActivities();
});

// serve index.html
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../client/dist' }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});
