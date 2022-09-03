const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) =>{
    const {type, data} = req.body;
    const {id, postID, content} = data;

    if(type === 'CommentCreated'){
        const status = data.content.includes('yellow') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4001/events', {
            type: 'CommentModerated',
            data: {
                id,
                postID,
                content,
                status
            }
        })
        console.log('from moderation', status)
    }
    res.send('OK');

});


app.listen(4002, () =>{
    console.log('Moderation services is running on 4002');
})