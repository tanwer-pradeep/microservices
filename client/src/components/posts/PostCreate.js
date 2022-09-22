import { Button, Card, Form, Input } from "antd";
import React, { useState } from "react";
import { AxiosPost } from '../../utils/Axios';

const PostCreate = () => {
const [title, setTitle] = useState('');

  const onFinish = async(values) => {
    console.log("Success:", values);
    const res = await AxiosPost('http://localhost:3001/posts', {"title": title});
    if(res.status === 201){
      setTitle('');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card
      bordered={false}
      style={{width: '500px', margin: "10px"}}
    >
      <h1>Create Post</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          // name="title"
          rules={[
            {
              required: true,
              message: "Please input the title for post!",
            },
          ]}
        >
          <Input name="title" value={title} onChange={e => setTitle(e.target.value)}/>
        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PostCreate;
