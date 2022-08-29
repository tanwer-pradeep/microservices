const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors')



const app = express();
app.use(bodyParser.json());
app.use(cors())

const posts = {};


app.post('/posts', (req, res) =>{
    const postID = randomBytes(4).toString('hex');
    const {title} = req.body;


    posts[postID] = {
        postID,
        title
    }

    res.status(201).send(posts[postID])

    // posts.push

});

app.get('/posts', (req, res) =>{
    res.send(posts);
})


app.listen(3001, () => {
    console.log('Runing on 3001')
})