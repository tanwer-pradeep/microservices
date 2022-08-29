import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { AxiosPost } from "../../utils/Axios";

const CommentCreate = ({ postID }) => {
  const [commentTitle, setCommentTitle] = useState("");

  const onFinish = async (id) => {
    const commentCreationResponse = await AxiosPost(
      `http://localhost:3002/posts/${id}/comments`,
      { content: commentTitle }
    );
    if(commentCreationResponse && commentCreationResponse.status === 201) setCommentTitle('');
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={() => onFinish(postID)}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ marginTop: "5px" }}
    >
      <Form.Item
        label="Comment"
        // name="comment"
        rules={[
          {
            required: true,
            message: "Please input your comment",
          },
        ]}
      >
        <Input
          name="content"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentCreate;
