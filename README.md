# wounded-warrior-tracker
Scrapes your Wounded Warrior activities from Garmin Connect and aggregates the relevant exercise totals.

## TO DO:
- Separation of concerns 
	- move main function from server index to it's own module
	- break exercises and workouts out of App.jsx into their own list components
	- persist data to the database
:heavy_check_mark: - Set up security certificate and https on EC2

## Current setup is functional...

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

startup for prod server on ex2, with Nninx and PM2 configured:
1. `sudo systemctl start nginx`
2. `sudo pm2 start wounded-warrior-tracker/server/index.js`