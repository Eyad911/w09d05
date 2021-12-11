import React from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Account from "./components/Account";
import "./App.css";
require("dotenv").config();

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/vAccount/:id" element={<Account />} />
        <Route exact path="*" element={<Account />} />
        
      </Routes>
    </>
  );
};

export default App;