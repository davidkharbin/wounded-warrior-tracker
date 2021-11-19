const express = require('express');
const cron = require('node-cron');
const app = express();
// const queries = require('../database/schema.js');
// const db = require('../database/index.js')
const cors = require('cors');
// const creds = require('../garmin.config.json')
// const { GarminConnect } = require('garmin-connect');
const Activities = require('../database/activities')
const port = 3000;

// serve static files from dist dir
app.use(express.static('client/dist'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});

/**
 * temporarily setup local data (activities.json) to avoid lockout
 * garmin's sso lockout period is 24 hours! :(
 * 
 * otherwise, totals and workouts objects were set outside the scope of main() below
 * and main() should be ran async as an iiafe, so the scraper can go get the workout data
 * then, instead of main() returning [totals, workouts], it just runs
 * then, the /totals route will res.send([totals, workouts]) instead of running main()
 */



// Has to be run in an async function to be able to use the await keyword,
const main = () => {
  let totals = {
    pushUps: 0,
    pullUps: 0,
    sitUps: 0,
    burpees: 0
  }
  let workouts = [];
  // Create a new Garmin Connect Client
  // let GCClient = new GarminConnect();
  // Uses credentials from garmin.config.json
  // await GCClient.login(creds.username, creds.password);

  //get last 30 activities
  // let activityList = await GCClient.getActivities(0, 30);

  // test with local data to avoid lockout
  let activityList = Activities;

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
      if (summary.subCategory === 'BURPEE') totals.burpees += summary.reps;
      if (summary.category === 'PULL_UP') totals.pullUps += summary.reps;
      if (summary.category === 'PUSH_UP') totals.pushUps += summary.reps;
      if (summary.category === 'SIT_UP') totals.sitUps += summary.reps;
    })
  })
  console.log('=========TOTAL TO DATE SET========');
  console.log('pushUps :>> ', totals.pushUps);
  console.log('pullUps :>> ', totals.pullUps);
  console.log('sitUps :>> ', totals.sitUps);
  console.log('burpees :>> ', totals.burpees);
  return [totals, workouts]
};
let garminData = main();

// testing cron - live server will need to update data by re-scraping garmin connect web app
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
