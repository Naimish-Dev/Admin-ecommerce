import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function Topbar() {
  
const user = useSelector((store) => store.user.userdata);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin-Panel</span>
        </div>
        <div className="topRight">
          <Link to="/profile">
            <img src={user.img} alt="" className="topAvatar" />
          </Link>
        </div>
      </div>
    </div>
  );
}
