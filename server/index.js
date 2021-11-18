const express = require('express');
const app = express();
const queries = require('../database/schema.js');
const db = require('../database/index.js')
const cors = require('cors');
const creds = require('../garmin.config.json')
const { GarminConnect } = require('garmin-connect');
const port = 3001;

// serve static files from dist dir
app.use(express.static('client/dist'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});



let totals = {
  pushUps: 1000,
  pullUps: 1000,
  sitUps: 1000,
  burpees: 1000
}
let workouts = [];
// Has to be run in an async function to be able to use the await keyword,
(async function main(){

  // Create a new Garmin Connect Client
  let GCClient = new GarminConnect();
  // Uses credentials from garmin.config.json
  await GCClient.login(creds.username, creds.password);

  //get last 30 activities
  let activityList = await GCClient.getActivities(0, 30);

  // aggregate relevant activities 
  activityList.forEach(activity => {
    if (activity.activityName.includes('Wounded')) {
      let name = activity.activityName;
      let date = activity.startTimeLocal.substring(0, 10)
      let id = activity.activityId;
      let summary = activity.summarizedExerciseSets;
      workouts.push({ name: name, id: id, summary: summary, date: date })
    }
  });

  workouts.forEach(workout => {
    let summaries = workout.summary;
    summaries.forEach(summary => {
      if (summary.subCategory === 'BURPEE') totals.burpees -= summary.reps;
      if (summary.category === 'PULL_UP') totals.pullUps -= summary.reps;
      if (summary.category === 'PUSH_UP') totals.pushUps -= summary.reps;
      if (summary.category === 'SIT_UP') totals.sitUps -= summary.reps;
    })
  })
  console.log('=========TOTAL TO DATE SET========');
  console.log('pushUps :>> ', totals.pushUps);
  console.log('pullUps :>> ', totals.pullUps);
  console.log('sitUps :>> ', totals.sitUps);
  console.log('burpees :>> ', totals.burpees);
})();

app.get('/totals', (req, res) => {
  console.log('ran totals');
  res.send([totals, workouts])
})

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../client/dist' }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});
