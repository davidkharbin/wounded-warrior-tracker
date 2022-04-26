const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const queries = require('../database/schema.js');
const dotenv = require('dotenv').config();
const db = require('../database/index.js')

const { GarminConnect } = require('garmin-connect');
const garminCreds = require('../garmin.config.json');

const cron = require('node-cron');


// Certificates
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/cryptographic.ninja/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/cryptographic.ninja/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/cryptographic.ninja/chain.pem', 'utf8'); 
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// };

// app server
const app = express();
// const httpsServer = https.createServer(credentials, app);
// const port = process.env.PORT || 8443;
// httpsServer.listen(port, () => {
//   console.log(`Express server listening on port: ${port}`);
// });



app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/workouts-2021', require('./routes/workoutRoutes'))

app.listen(3001, () => {
  console.log(`Web server running on: http://localhost:3001`);
});




const main = () => {
  let workouts = [];
  let totals = {
    pushUps: 0,
    pullUps: 0,
    sitUps: 0,
    burpees: 0
  };
  
  
  (async function getData() {
    // Create a new Garmin Connect Client and login
    let GCClient = new GarminConnect();
    await GCClient.login(garminCreds.username, garminCreds.password);
    
    // get last 100 activities
    let activityList = await GCClient.getActivities(0, 200);
    
    // get the activities named Wounded-Warrior
    let activities = activityList.filter(activity => activity.activityName.includes('Wounded'));
    
    // get desired data from each activity
    activities.forEach(activity => {
      let name = activity.activityName;
      let date = activity.startTimeLocal.substring(0, 10)
      let id = activity.activityId;
      let summary = activity.summarizedExerciseSets;
      workouts.push({ name: name, id: id, summary: summary, date: date })
    });
    
    // get total reps of each exercise, for each workout
    workouts.forEach(workout => {
      let summaries = workout.summary;
      summaries.forEach(summary => {
        if (summary.subCategory === 'BURPEE') totals.burpees += summary.reps;
        if (summary.category === 'PULL_UP') totals.pullUps += summary.reps;
        if (summary.category === 'PUSH_UP') totals.pushUps += summary.reps;
        if (summary.category === 'SIT_UP') totals.sitUps += summary.reps;
      })
    })
  })();
  
  // total reps, list of workout data
  return [totals, workouts];
};

let garminData = main();

// refresh data every 4 hours
cron.schedule('0 */4 * * *', () => {
  garminData = main();
});


app.get('/totals', (req, res) => {
  console.log('ran totals');
  res.send(garminData);
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../client/dist' }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});
