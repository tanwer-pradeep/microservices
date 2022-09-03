const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
// const p = require("./connect");
// const posts = require('./posts')
// import main from "./connect";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const postss = {};
// p.main()
app.post("/posts", async (req, res) => {
  const postID = randomBytes(4).toString("hex");
  const { title } = req.body;

  postss[postID] = {
    postID,
    title,
  };
  // try {
  //   posts.posts.create({
  //     postID:{
  //       postID,
  //       title// String is shorthand for {type: String}
  
  //   }
  //   })
    
  // } catch (error) {
  //   console.log("error post")
    
  // }

  // requesting to events services
  await axios.post("http://localhost:4001/events", {
    type: "PostCreated",
    data: {
      postID,
      title,
    },
  });
  res.status(201).send(postss[postID]);
});

app.post("/events", (req, res) => {
  console.log('Event hitted:- ',req.body.type);
  res.send({ status: "OK" });
});

app.get("/posts", (req, res) => {
  res.send(postss);
});

app.listen(3001, () => {
  console.log("posts service is runing on 3001");
});
