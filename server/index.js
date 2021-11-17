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



// Has to be run in an async function to be able to use the await keyword
const main = async () => {
  const totals = {
    pushUps: 0,
    pullUps: 0,
    sitUps: 0,
    burpees: 0
  }
  const workouts = [];

  // Create a new Garmin Connect Client
  const GCClient = new GarminConnect();
  // Uses credentials from garmin.config.json
  await GCClient.login(creds.username, creds.password);

  //get last 30 activities
  const activityList = await GCClient.getActivities(0, 30);
  const lastActivity = await GCClient.getActivities(0, 1);

  // aggregate relevant activities 
  activityList.forEach(activity => {
    if (activity.activityName.includes('Wounded')) {
      const name = activity.activityName;
      const date = activity.startTimeLocal.substring(0, 10)
      const id = activity.activityId;
      const summary = activity.summarizedExerciseSets;
      workouts.push({ name: name, id: id, summary: summary, date: date })
    }
  });

  workouts.forEach(workout => {
    const summaries = workout.summary;
    summaries.forEach(summary => {
      if (summary.category === 'PULL_UP') totals.pullUps += summary.reps;
      if (summary.category === 'PUSH_UP') totals.pushUps += summary.reps;
      if (summary.category === 'SIT_UP') totals.sitUps += summary.reps;
      if (summary.subCategory === 'BURPEE') totals.burpees += summary.reps;
    })
  })
  console.log('=========TOTAL TO DATE========');
  console.log('pushUps :>> ', totals.pushUps);
  console.log('pullUps :>> ', totals.pullUps);
  console.log('sitUps :>> ', totals.sitUps);
  console.log('burpees :>> ', totals.burpees);
  return totals;
};

app.get('/totals', (req, res) => {
  console.log('ran totals');
  res.send(main())
})

app.get('/', (req, res) => {
  console.log('vistited/');
  res.sendFile('index.html', { root: __dirname + '/../client/dist' }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});
