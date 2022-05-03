# wounded-warrior-tracker
Need to track your progress for the Wounded Warrior Challenge but neither Garmin-Connect's web or mobile app gives you the ability to aggregate specific exercises over a specified time? 

Record them in a spreadsheet? LOL...NO.



https://cryptographic.ninja/

Save your workout as "Wounded Warrior - Day ##"

Confirm the exercises are correctly identified in Garmin-Connect

Create garmin.config.json in the root directory and configure it...

```
{
	"username": "user@email.com",
	"password": "password"
}
```

```
npm install
```

```
npm run start
```
##
##
startup for prod server on ex2, with Nninx and PM2 configured:
1. `sudo systemctl start nginx`
2. `sudo pm2 start wounded-warrior-tracker/server/index.js`

##
##
# TO DO:
:heavy_check_mark:  - Separation of concerns 
  - move main function from server index to it's own module
  - break exercises and workouts out of App.jsx into their own list components
  - persist data to the database

:heavy_check_mark: Set up security certificate and https on EC2
:heavy_check_mark: Use Material UI to clean up the frontend

- Add support future challenges
