import React from "react";
import PostCreate from "./components/posts/PostCreate";
import PostList from "./components/posts/PostList";

const App = () => {
  return (
    <>
    <center>

      <h2>MicroServices Post create App</h2>
      <PostCreate />
      <PostList />
    </center>
    </>
  );
};

export default App;
