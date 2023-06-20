import React from "react";
import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import login from "../../Redux/Apicall";
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom";


const Login = () => {
const history=useHistory();

  const dispatch=useDispatch()
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const formsubmithendler = (e) => {
    e.preventDefault();
   login(history, dispatch, { username, password });
  };

  
  return (
    <div className="container1">
      <form className="form" onSubmit={(e) => formsubmithendler(e)}>
        <h1> Log-in</h1>
        <input
          className="input"
          type="text"
          placeholder="Username Or Email"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="button" type="submit">
          {/* {userdata.isFeatching ? "submiting..." : "Log-in"} */}
          login
        </button>
        {/* {userdata.error && <p className="error"> Somthing went Wrong !!!!</p>} */}

        <Link to={"/"}>FORGET PASSWORD?</Link>
        <Link to={"/"} >CREATE NEW ACCOUNT</Link>
      </form>
    </div>
  );
};

export default Login;
