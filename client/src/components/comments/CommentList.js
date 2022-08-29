import React from "react";

const CommentList = ({ comments }) => {
  return comments?.length
    ? comments?.map((comment) => (
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      ))
    : null;
};

export default CommentList;
