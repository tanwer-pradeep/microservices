import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { AxiosGet } from "../../utils/Axios";
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";

const PostList = () => {
  const [postList, setPostList] = useState({});
  const [postListArray, setPostListArray] = useState([]);

  const getPosts = async () => {
    const response = await AxiosGet("http://localhost:3003/posts");
    setPostList(response);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const tempArray = Object.values(postList);
    setPostListArray(tempArray);
  }, [postList]);

  return (
    <section
      style={{
        display: "flex",
        fleDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {postListArray?.map((post) => (
        <Card
          key={post.postID}
          style={{ width: "400px", height: "300px", margin: "5px" }}
        >
          <h1>{post.title}</h1>
          <div>
            <CommentList comments={post.comments} />
          </div>

          <CommentCreate postID={post.postID} />
        </Card>
      ))}
    </section>
  );
};

export default PostList;
