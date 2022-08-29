const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(cors())

const postsList = {};

// postsList ={
//     postId:{
//         postID,
//         title,
//         comments: [
//             {
//                 commentID,
//                 content
//             }, 
//             {
//                 commentID,
//                 content
//             },
//             {
//                 commentID,
//                 content
//             }
//         ]
//     }
// }

app.get('/posts', (req, res) =>{
    res.send(postsList)
})

app.post('/events', (req, res) =>{
    const {type, data} = req.body;
    console.log('from query event', type, data);
    const {postID} = data;

    switch(type){
        case ("PostCreated"):
        // work here for post creation
            const { title } = data;
            postsList[postID] = {postID, title, comments: []}
            break;
        case ("CommentCreated"):
        // work here for comment creation
        const { id, content} = data;
            postsList[postID].comments.push({id, content})
            break;
    }

    res.send('OK');
})




app.listen(3003, () =>{
    console.log('query service is runnig on 3003');
})