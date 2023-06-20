import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  
} from "@material-ui/icons";
import "../user/user.css";
import { useEffect, useState } from "react";

import { userRequest } from "../../miscellaneous/AxiosReq";
import { useDispatch ,useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../Redux/UserSlice";
export default function Profile() {
  const request = userRequest();

  const [realUser, setuserdata] = useState([]);
   const dispatch = useDispatch();
   
   const user = useSelector((store) => store.user.userdata);

   
   const history = useHistory();
   const logouthendler = () => {
       localStorage.removeItem("User");
       history.push("/login");
       dispatch(logout);
    };
    useEffect(() => {
    const getuser = async () => {
      try {
        const responce = await request.get(`users/find/${user._id}`);
        responce.status === 200 && setuserdata(responce.data);
      } catch (error) {
        console.log(error);
      }
    };

     getuser();
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Profile</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={realUser.img} alt="img" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{realUser.userName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{realUser.userName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{realUser.createdAt}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">
                {realUser && realUser.number}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{realUser.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{realUser._id}</span>
            </div>
            <div className="userShowInfo">
              <button className="logoutbtn" onClick={logouthendler}>logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
