const express = require('express');
const app = express();
const queries = require('../database/schema.js');
const db = require('../database/index.js')
const cors = require('cors');
const creds = require('../garmin.config.json')
 
// serve static files from dist dir
app.use(express.static('client/dist'));

// middleware
// use express.json for parsing JSON
app.use(express.json());
// use cors middleware for enabling CORS with various options
app.use(cors());
 
app.use(express.urlencoded({ extended: true }));
// get index.html 
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../client/dist' }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});
// set port where server will listen
const port = 3001;
 
// tell server to listen on predefined port
app.listen(port, () => {
 console.log(`Express server listening on port: ${port}`);
});

  
const { GarminConnect } = require('garmin-connect');

// Has to be run in an async function to be able to use the await keyword
const main = async () => {
    // Create a new Garmin Connect Client
    const GCClient = new GarminConnect();

    // Uses credentials from garmin.config.json
    await GCClient.login(creds.username, creds.password);
    const activities = await GCClient.getActivities(0, 1);

    let pushUps = 0;
    let pullUps = 0;
    let sitUps = 0;
    let burpees = 0;

    console.log(activities[0].summarizedExerciseSets);
};

// Run the code
main();