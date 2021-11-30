// const queries = require('../database/schema.js');
// const db = require('../database/index.js')
const express = require('express');
const app = express();
const cron = require('node-cron');
const cors = require('cors');
const path = require('path');
const creds = require('../garmin.config.json');
const { GarminConnect } = require('garmin-connect');
const port = process.env.PORT || 3000;

// express server w/cors
// serve static files from dist dir
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});

const main = () => {
  let totals = {
    pushUps: 0,
    pullUps: 0,
    sitUps: 0,
    burpees: 0
  }
  let workouts = [];

  (async function getData() {
    // Create a new Garmin Connect Client and login
    let GCClient = new GarminConnect();
    await GCClient.login(creds.username, creds.password);

    // get last 50 activities
    let activityList = await GCClient.getActivities(0, 50);

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
    console.log('=========        ONLINE INDEX         ========')
    console.log('pushUps :>> ', totals.pushUps);
    console.log('pullUps :>> ', totals.pullUps);
    console.log('sitUps  :>>  ', totals.sitUps);
    console.log('burpees :>> ', totals.burpees);
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
