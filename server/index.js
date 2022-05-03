const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('../database/db.config');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const axios = require('axios');
const { GarminConnect } = require('garmin-connect');
const garminCreds = require('../garmin.config.json');
const date = require('date-and-time');

const cron = require('node-cron');

// connect mongo
connectDB();

// app server
const app = express();
// const httpsServer = https.createServer(credentials, app);
// const port = process.env.PORT || 8443;
// httpsServer.listen(port, () => {
//   console.log(`Express server listening on port: ${port}`);
// });

// Certificates
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/cryptographic.ninja/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/cryptographic.ninja/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/cryptographic.ninja/chain.pem', 'utf8'); 
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// };


app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/workouts-2021', require('./routes/workoutRoutes'));


///////////////////////////////////////////////////////////////////////////////
// REMOVE THIS FOR PROD SERVER (AND UNCOMMENT THE HTTPS and SSL CODE ABOVE!) //
///////////////////////////////////////////////////////////////////////////////
app.listen(3001, () => {
  console.log(`Web server running on: http://localhost:3001`);
});




async function fetchNewActivities() {

  // Create a new Garmin Connect Client and login
  let GCClient = new GarminConnect();
  await GCClient.login(garminCreds.username, garminCreds.password);

  // get last 5 activities
  let activityList = await GCClient.getActivities(0, 5);

  // get the activities named Wounded-Warrior
  let activities = activityList.filter(activity => activity.activityName.includes('Wounded'));

  // add wounded-warrior activities to the database
  activities.forEach(activity => {
    // `https://cryptographic.ninja:${port}/workouts-2021`
    axios.post('http://localhost:3001/workouts-2021/', {
      activityId: activity.activityId,
      activityName: activity.activityName,
      startTimeLocal: activity.startTimeLocal.substring(0, 10),
      summarizedExerciseSets: activity.summarizedExerciseSets
    })
  });

  const now = new Date();
  const logString = date.format(now, 'MM/DD/YYYY hh:mm:ss A [MDT]');
  console.log(`Fetched new activities @ ${logString}`);
};

fetchNewActivities();

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
