const { GarminConnect } = require('garmin-connect');
const garminCreds = require('../garmin.config.json');
const date = require('date-and-time');
const axios = require('axios');

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
		// (uncomment this live url for the ec2)
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
  console.log(`${logString}>>>: Fetched new activities`);
};

module.exports = fetchNewActivities;