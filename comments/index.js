const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors')



const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostID = {};


app.post('/posts/:id/comments', (req, res) =>{
    const commentID = randomBytes(4).toString('hex');
    const {content} = req.body;
    const postID = req.params.id;

    const comments = commentsByPostID[postID] || [];
    comments.push({id: commentID, content});

    commentsByPostID[postID] = comments;

    res.status(201).send(commentsByPostID[postID]);
});

app.get('/posts/:id/comments', (req, res) =>{
    const postID = req.params.id;
    res.send(commentsByPostID[postID] || []);
})


app.listen(3002, () => {
    console.log('Runing on 3002')
})