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
:heavy_check_mark: Persist to a database

:heavy_check_mark: Modularize the server index

:heavy_check_mark: Clean up frontend components

:heavy_check_mark: Configure Nginx

:heavy_check_mark: Set up security certificate and https on the prod server

:heavy_check_mark: Clean up the frontend with MUI

- Add support future challenges
