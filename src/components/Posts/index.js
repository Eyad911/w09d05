import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style.css";
import { useSelector, useDispatch} from "react-redux";
import { Logoutt } from "../../reducers/Login";

const BASE_URL = process.env.REACT_APP_BASE_URL;
 const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [Post, setPost] = useState('');
  const [postImg, setPostImg] = useState('');
  const [newcomment, setNewComment] = useState('');


  const [local,setLocal]= useState("");
const navigate = useNavigate();

const dispatch = useDispatch();
const state = useSelector((state)=>{
  return state
})
// console.log(state.Login.token);
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setLocal(getToken);
    getPosts();
  }, []);

  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/posts`,{
    headers: {
        Authorization: `Bearer ${state.Login.token}`,
      },});
    setPosts(result.data);
  };

  const addPost = async () => {
      await axios.post(
        `${BASE_URL}/newPost`,
        {
          desc:Post,
          img:postImg
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
    
      getPosts(local);
  };

  const updatePost = async(id)=>{
 
   
    await axios.put(
        `${BASE_URL}/updatedesc/${id}`,
        {
          desc: Post,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          }
        }
      );
      getPosts(local);
    }

    const deletePost =async(id)=>{
       const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${state.Login.token}`,
            },
          })
          getPosts();
    }

// comment 
const addcomment = async (postId) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/newcomment`,
      {
        desc: newcomment,
        postId: postId,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    getPosts();
  } catch (error) {
    console.log(error);
  }
};
  


  const logOut =()=>{
 
     dispatch(Logoutt({role:"",token:""}));
   localStorage.clear()
   navigate('/login')

  }
  
  return (

    <div className="mainDivv">
    
         <div className="newPostDiv" >
              <input
                className="addInput"
                onChange={(e) => setPost(e.target.value)}
                placeholder="new post Desc"
              />
              <input
                className="addInput"
                onChange={(e) => setPostImg(e.target.value)}
                placeholder="new Post Img"
              />
              <button className="addBtn" onClick={addPost}>
                Add
              </button>
            </div>
     <div className="list"> 
      {posts.map((item, i) => (<>
        <div className="mainDiv">
        <ul>
          <div className="photo">
          <li key={`desc-${item._id}`} className="box">{item.desc}</li>
</div>      
<div className="box">   
          <input id="btubdat"onChange={(e)=>{setPost(e.target.value)}} placeholder="edit post Desc"/>
          
          <button
                        className="edit"
                        onClick={() => updatePost(item._id)}
                      >
                        Edit Desc
                      </button>
                      </div>
          <li key={`img-${item._id}`}><img src={item.img} alt="postPic" width="300"/></li>
          <div>
                      
                      <button
                        className="delete"
                        onClick={() => {deletePost(item._id)}}
                      >
                        Delete
                      </button>
                      {item.commentId.map(s => (
         <>
          <p className="pargraph"> Comment: {s.desc}</p>
         </>
        ))}
                    </div>
                    
        </ul>
        <input
                    className="commentInput"
                    onChange={e => {
                      setNewComment(e.target.value);
                    }}
                    placeholder="add comment"
                  />
                  <button className="addBTN" onClick={()=> addcomment(item._id)}>
                    add
                  </button>
        </div>
      </>))}</div>
<div className="logoutDiv">
      <button  id="btnLogout"onClick={logOut}>logout</button>
</div>


      

     
  
    </div>
  )};

export default Posts;
