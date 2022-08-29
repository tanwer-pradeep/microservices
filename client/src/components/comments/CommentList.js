import React, { useEffect, useState } from "react";
import { AxiosGet } from "../../utils/Axios";

const CommentList = ({ postID }) => {
  const [comments, setComments] = useState([]);

  const fetchAllComments = async (postID) => {
    const commentResponse = await AxiosGet(
      `http://localhost:3002/posts/${postID}/comments`
    );
    setComments(commentResponse);
  };

  useEffect(() => {
    fetchAllComments(postID);
  },[postID]);

  return comments?.length
    ? comments?.map((comment) => (
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      ))
    : null;
};

export default CommentList;
