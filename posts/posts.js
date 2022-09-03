// import mongoose from "mongoose";
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postsSchema = new Schema({
    postID:{
        postID: String,
        title: String, // String is shorthand for {type: String}

    }
    //   author: String,
    //   body:   String,
    //   comments: [{ body: String, date: Date }],
    //   date: { type: Date, default: Date.now },
    //   hidden: Boolean,
    //   meta: {
        //     votes: Number,
        //     favs:  Number
        //   }
    });
    
    const posts = mongoose.model.posts || mongoose.model('posts', postsSchema);
module.exports = {posts}
