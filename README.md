# eva_alert
Evangelion flavour alerting app

## How to set up
* install node.js
* install electron-prebuilt
  `npm -g install electron-prebuilt`
* install dependencies
  `npm install`
* copy your slack api token

## start app
  ```
  export SLACK_API_TOKEN=<your slack api token>
  npm start
  ```

When you send a message with "critical" to your slack channel, alerts will fill your screen!
Have fun!
