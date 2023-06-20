import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import {useDispatch,useSelector }from "react-redux"
import {useParams,useHistory} from "react-router-dom"
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseapp from "../../miscellaneous/Firebase";
import deleteimg from "../../miscellaneous/Deleimg";
import { Updateusers } from "../../Redux/UserApicall";
import { userRequest } from "../../miscellaneous/AxiosReq";
export default function User() {
const history=useHistory()
const dispatch = useDispatch();
const request = userRequest()
const { userId } = useParams();

const [realUser, setuserdata] = useState([]);
const [user,setuser]=useState()
const [img,setuserimg]=useState()





  const inputchangehendler = (e) => {
    setuser((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };


useEffect(() => {
  const getuser = async () => {
    try {
      
      const responce = await request.get(`users/find/${userId}`);
      responce.status === 200 && setuserdata(responce.data);
      console.log(responce);
    } catch (error) {
      console.log(error);
      
    }
  };

  userId && getuser();
}, [userId]);

  const fileuploadhendler = (e) => {
    const filename = new Date().getTime() + e.target.files[0].name;
    const storage = getStorage(firebaseapp);
    const Referance = ref(storage, `Userss_img/${filename}`);

    const uploadTask = uploadBytesResumable(Referance, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setuserimg(downloadURL);
        });
      }
    );
  };

 


const formsubminhendler=(e)=>{
    e.preventDefault();
    const file =  !img ?  realUser.img : img
    Updateusers(history, userId, { ...user, img: file }, dispatch);
    img && deleteimg(realUser.img, "Userss_img");
}

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
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
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form
            methode="post"
            className="userUpdateForm"
            onSubmit={(e) => formsubminhendler(e)}
          >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="User Name"
                  className="userUpdateInput"
                  name="userName"
                  defaultValue={realUser.userName}
                  onChange={(e) => inputchangehendler(e)}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="userUpdateInput"
                  name="email"
                  defaultValue={realUser.email}
                  onChange={(e) => inputchangehendler(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="number"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                  name="number"
                  defaultValue={realUser.number}
                  onChange={(e) => inputchangehendler(e)}
                />
              </div>
            
              <div className="userUpdateItem">
                <label>Is Admin</label>
                <select
                  defaultValue={realUser.is_Admin ? "true" : "false"}
                  onChange={(e) => inputchangehendler(e)}
                  name="is_Admin"
                  id="idStock"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={!img ? realUser.img : img}
                  alt={realUser.userName}
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  onChange={(e) => fileuploadhendler(e)}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button type="submit" className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
