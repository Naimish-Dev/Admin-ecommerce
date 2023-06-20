import "./widgetSm.css";
import { useEffect } from "react";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../miscellaneous/AxiosReq";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const request = userRequest()
export default function WidgetSm() {
  const history = useHistory()
const [newuser,setnewuser]=useState([])
const dumayprofile =
  "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";
  const fetchuserdata=async()=>{
    try {
      const responce = await request.get("/users/?new=true");
setnewuser(responce.data);
    } catch (error) {
      
    }
  }
  useEffect(() => {
  fetchuserdata();
  }, [])
  const redirectuserhendler=(userid)=>{
history.push(`/user/${userid}`);
  }
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList stickytr">
        {newuser?.map((val, index) => {
          return (
            <li key={index} className="widgetSmListItem">
              <img
                src={val.img ? val.img : dumayprofile}
                alt="ProfilePicture"
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{val.userName}</span>
                <span className="widgetSmUserTitle">{val.email}</span>
              </div>
              <button
                className="widgetSmButton"
                onClick={() => redirectuserhendler(val._id)}
              >
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
