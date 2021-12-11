import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  
  const [postUpdated, setPostUpdated] = useState("");


  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const id = localStorage.getItem(state);
      const result = await axios.get(
        `http://localhost:5000/post`
      );

      setPosts(result.data);     
       console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const id = localStorage.getItem("ID");
      //console.log("the s  " + state.tasks.taskAdd);
      const result = await axios.post(
        `http://localhost:5000/newPost`,
        {
          img,
          desc,
          
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(result.data);

      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  const updatePostImg = async (postId) => {
    try {
      const id = localStorage.getItem("token");
      const userId = localStorage.getItem("ID");
      const result = await axios.put(
        `http://localhost:5000/updateimg/${id}`,
        {
          
          img: postUpdated,
          
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(result.data);
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  const updatePostDesc = async (postId) => {
    try {
      const id = localStorage.getItem("token");
      const userId = localStorage.getItem("ID");
      const result = await axios.put(
        `http://localhost:5000/updatedesc/${id}`,
        {
          
          desc: postUpdated,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(result.data);
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    try {
      const userId = localStorage.getItem("ID");
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/post/delPost`,
        {
          data: { userId, postId },
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        name="postImg"
        placeholder="img"
        onChange={(e) => setImg(e.target.value)}
      />
      <input
        type="text"
        name="postDesc"
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={() => addPost()}> add post </button>

      <br />
      <hr />
      <br />

      
      {posts.map((item) => (
        <>
          <p>{item.desc}</p>
          <input
            type="text"
            name="task"
            onChange={(e) => {
              setPostUpdated(e.target.value);
            }}
          />
          <button onClick={() => updatePostImg(item._id)}> update Img </button>
          <button onClick={() => updatePostDesc(item._id)}> update Description </button>
          <button onClick={() => deletePost(item._id)}> delete </button>
        </>
      ))}
    </div>
  );
}

export default Posts;