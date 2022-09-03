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
    res.send(postsList);
})

app.post('/events', (req, res) =>{
    const {type, data} = req.body;
    console.log('from query event', type, data);
    const {postID, id, content, status, title} = data;

    switch(type){
        case ("PostCreated"):
        // work here for post creation
            console.log('from postCreated', id, postID,content, status, title)
            postsList[postID] = {postID, title, comments: []}
            break;
        case ("CommentCreated"):
        // work here for comment creation
            console.log('from commentCreated', id, postID,content, status, title)
            postsList[postID].comments.push({id, content, status})
            break;
        case ("CommentUpdated"):
        // work here for comment status update
            console.log('from commentUpdated', id, postID,content, status, postsList)
            
            const post = postsList[postID]
            const comment = post.comments.find(comment =>{
                return comment.id === id;
            });
            comment.status = status;
            comment.content = content;
            break;
    }
    res.send('OK');
})




app.listen(3003, () =>{
    console.log('query service is runnig on 3003');
})