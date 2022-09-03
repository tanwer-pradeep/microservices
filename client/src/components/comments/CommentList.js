import React from "react";

const CommentList = ({ comments }) => {
  return comments?.length
    ? comments?.map((comment) => {
      let content;
      switch(comment.status){
        case('pending'):
          content = 'Comment Moderation is pending';
          break;
        case('approved'):
          content = comment.content;
          break;
        case('rejected'):
          content = 'This comment has been rejected';
          break;
      }
        return (<ul key={comment.id}>
          <li>{content}</li>
        </ul>)
})
    : null;
};

export default CommentList;
