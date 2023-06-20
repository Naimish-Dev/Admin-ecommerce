import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseapp from "../../miscellaneous/Firebase";
import SelectColor from "../newProduct/SelectColor";
import { addproducts } from "../../Redux/Apicall";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [file, setfile] = useState(
    "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
  );
  const [price, setprice] = useState();
  const [color, setcolor] = useState([]);
  const [ formdata, setformdata] = useState({});
  const [ categories, setcategories ] = useState([]);

  const fileuploadhendler = (e) => {
    const filename = new Date().getTime() + e.target.files[0].name;
    const storage = getStorage(firebaseapp);
    const Referance = ref(storage, `Products_img/${filename}`);

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

  const colorfunction = (data) => {
    setcolor(data);
  };

  const storevalue = (e) => {
    setformdata((pre) => {
      return {  ...pre, [e.target.name]: e.target.value };
    });
  };
  const storeprice=(e)=>{
setprice(e.target.value)
  }
const catogaryhendler=(e)=>{
setcategories((pre)=>{return { ...pre, [e.target.name]: e.target.value.split(",") };})
}

  const newproducthendler=(e)=>{
    console.log("new submit");
e.preventDefault();
addproducts(history,dispatch, {
  img: file,
  color: color,
  price: parseInt(price),
  ...categories,
  ...formdata,
});
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={newproducthendler}>
        <div>
          <div className="addProductItem ">
            <label htmlFor="file">Image</label>
            <input
              className="hideimginput"
              type="file"
              id="file"
              onChange={(e) => fileuploadhendler(e)}
            />
            {file ? (
              <img className="uploadedimg" src={file} alt="productimg" />
            ) : (
              <label className="imgskeleton" htmlFor="file">
                Image
              </label>
            )}
          </div>
          <div className="addProductItem">
            <label>Color</label>
            <SelectColor parentcom={colorfunction} />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input
              type="text"
              name="titel"
              placeholder="Product Name"
              onChange={(e) => storevalue(e)}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea
              name="desc"
              placeholder="Product desc"
              onChange={(e) => storevalue(e)}
            />
          </div>
        </div>
        <div>
          <div className="addProductItem">
            <label>catogary</label>
            <input
              type="text"
              name="categories"
              placeholder="Catogary Man,WoMan"
              onChange={(e) => catogaryhendler(e)}
            />
          </div>
          <div className="addProductItem">
            <label>Size</label>
            <input
              type="text"
              name="size"
              placeholder="size 100cm,sm"
              onChange={(e) => catogaryhendler(e)}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="price"
              onChange={(e) => storeprice(e)}
            />
          </div>
          <div className="addProductItem">
            <label>Active</label>
            <select
              defaultValue={true}
              name="active"
              id="active"
              onChange={(e) => storevalue(e)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>stock</label>
            <select
              defaultValue={true}
              name="instock"
              id="stock"
              onChange={(e) => storevalue(e)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
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
