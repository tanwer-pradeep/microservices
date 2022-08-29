const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post("/posts", async (req, res) => {
  const postID = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[postID] = {
    postID,
    title,
  };

  // requesting to events services
  await axios.post("http://localhost:4001/events", {
    type: "PostCreated",
    data: {
      postID,
      title,
    },
  });
  res.status(201).send(posts[postID]);
});

app.post("/events", (req, res) => {
  console.log('Event hitted:- ',req.body.type);
  res.send({ status: "OK" });
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(3001, () => {
  console.log("posts service is runing on 3001");
});
