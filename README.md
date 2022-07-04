## _MHC Code Challenge_

This is a code challenge for MHC to develop a simple full stack web application that will facilitate the online booking of wellness events (health talks, onsite screenings, etc) and the vendor approval or rejection of said events.
Created using. 
- Express 
- React
- Heroku

## Demo version
- [View Demo](https://alif-mhc-challenge.herokuapp.com/)

| Role | Account |
| ------ | ------ |
| Vendor | MHCHealthCare |
| Vendor | MHCHealthCare 2 |
| HR | MHCCompanion |

_Password uses same input as username._


## Features

- Maps
- Add Event
- View Event
- Approve Event Date
- Reject Event

HR can only create new event, while vendor should be able to both approve and reject event
Vendor can only see event that assigned to them, and HR can only see the event they created. In the list of event, you can filter event by status.

## Local Installation

```sh
npm i
npm heroku-postbuild
npm run seed
```

Both frontend and backend app run with single command

```sh
npm run start
```
To Access

```sh
http://localhost:3000/
```


