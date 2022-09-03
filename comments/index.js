const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostID = {};

app.post("/posts/:id/comments", async (req, res) => {
  const commentID = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postID = req.params.id;

  const comments = commentsByPostID[postID] || [];
  comments.push({ id: commentID, content, status: 'Pending'});

  commentsByPostID[postID] = comments;

  // requesting events bus
  await axios.post("http://localhost:4001/events", {
    type: "CommentCreated",
    data: {
      id: commentID,
      content,
      postID,
      status: 'pending'
    },
  });

  res.status(201).send(commentsByPostID[postID]);
});

app.post("/events", async (req, res) => {
  console.log('Event hitted:- ',req.body.type);
  const {type, data} = req.body;

  if(type === 'CommentModerated'){
    const {id, postID, status, content} = data;

    const comments = commentsByPostID[postID];
    const comment = comments.find(comment =>{
      return comment.id === id;
    })
    comment.status = status;

    // hitting event bus to notify about the comment update

    axios.post("http://localhost:4001/events", {
      type: "CommentUpdated",
    data: {
      id,
      content,
      postID,
      status
    },
    })

  }

  res.send({ status: "OK" });
});

app.get("/posts/:id/comments", (req, res) => {
  const postID = req.params.id;
  res.send(commentsByPostID[postID] || []);
});

app.listen(3002, () => {
  console.log("comments service is Runing on 3002");
});
