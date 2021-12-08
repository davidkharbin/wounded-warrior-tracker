// const { GarminConnect } = require('garmin-connect');
// const queries = require('../database/schema.js');
// const db = require('../database/index.js')
// const creds = require('../garmin.config.json')
const express = require('express');
const cron = require('node-cron');
const app = express();
const cors = require('cors');
const Activities = require('../database/activities')
const port = 3002;

// serve static files from dist dir
app.use(express.static('client/dist'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});

/**
 * local data (activities.json) is used here in order to
 * avoid Garmin's SSO lockout from too many logins while
 * testing and/or refactoring
 */


const main = () => {
  let totals = {
    pushUps: 0,
    pullUps: 0,
    sitUps: 0,
    burpees: 0
  }
  let workouts = [];
  
  // get relevant activities
  let activityList = Activities.filter(activity => activity.activityName.includes('Wounded'));

  // get relevant data from each activity
  activityList.forEach(activity => {
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
      else if (summary.category === 'PULL_UP') totals.pullUps += summary.reps;
      else if (summary.category === 'PUSH_UP') totals.pushUps += summary.reps;
      else if (summary.category === 'SIT_UP') totals.sitUps += summary.reps;
    })
  })
  console.log('========= OFFLINE INDEX  =========');
  console.log('pushUps :>> ', totals.pushUps);
  console.log('pullUps :>> ', totals.pullUps);
  console.log('sitUps :>> ', totals.sitUps);
  console.log('burpees :>> ', totals.burpees);
  return [totals, workouts]
};
let garminData = main();

// testing cron - the prod server will need to update data by re-scraping garmin-connect
cron.schedule('* * * * *', () => {
  garminData = main();
  console.log('running a task every minute');
});

app.get('/totals', (req, res) => {
  console.log('ran totals');
  res.send(garminData)
})

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../client/dist' }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});
