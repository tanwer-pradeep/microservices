const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, resp) => {
  const events = req.body;

  console.log(events.type, 'from event bus')

  // for posts services
  axios.post("http://localhost:3001/events", events).catch((err) => {
    console.log("error from posts services", err);
  });
  // for comments services
  axios.post("http://localhost:3002/events", events).catch((err) => {
    console.log("error from comments services", err);
  });
  // for  query service
  axios.post("http://localhost:3003/events", events).catch((err) => {
    console.log("error from event bus", err);
  });
  //for comment moderation
  axios.post("http://localhost:4002/events", events).catch((err) => {
    console.log("error from event bus", err);
  });

  resp.send({status: 'OK'})
});

app.listen(4001, () =>{
    console.log('event bus listining at 4001')
})
