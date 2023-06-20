import { useState } from "react";
import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {  Publish,} from "@material-ui/icons";
import firebaseapp from "../../miscellaneous/Firebase";
import { addusers } from "../../Redux/UserApicall";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NewUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setfile] = useState(
    "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
  );
  const [formdata, setformdata] = useState({});

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
          setfile(downloadURL);
        });
      }
    );
  };

  const storevalue = (e) => {
    setformdata((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const newproducthendler = (e) => {
    e.preventDefault();
    addusers(history, dispatch, {
      img: file,
      ...formdata,
    });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New User</h1>
      <form className="addProductForm" onSubmit={newproducthendler}>
        <div>
          <div className="addProductItem">
            <label>Profile</label>
            <div className="productUpload">
              <img src={file} alt="profile" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                onChange={(e) => fileuploadhendler(e)}
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              onChange={(e) => storevalue(e)}
            />
          </div>
          <div className="addProductItem">
            <label>email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => storevalue(e)}
            />
          </div>
        </div>
        <div>
          <div className="addProductItem">
            <label>password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => storevalue(e)}
            />
          </div>
          <div className="addProductItem">
            <label>phone</label>
            <input
              type="number"
              name="number"
              placeholder="phone"
              onChange={(e) => storevalue(e)}
            />
          </div>

          <div className="addProductItem">
            <label>Admin</label>
            <select name="active" id="active" onChange={(e) => storevalue(e)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button value="submit" className="addProductButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
