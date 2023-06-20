import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import { userRequest } from "../../miscellaneous/AxiosReq";
import { useState } from "react";
import { UpdateProduct } from "../../Redux/Apicall";
import { useHistory } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseapp from "../../miscellaneous/Firebase";
import deleteimg from "../../miscellaneous/Deleimg";
export default function Product() {
  const [product, setproduct] = useState({});
  const [data, setdata] = useState([]);
  const [pstate, setpstate] = useState([]);
  const [file, setfile] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  
  const month = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
const backendrequest = userRequest()
  useEffect(() => {
    const fetchselingdata = async () => {
      try {
        const responce = await backendrequest.get(
          `cart/productsell/${productId}`
        );
        responce.data.map((item) => {
          return setpstate((pre) => [
            ...pre,
            { name: month[item._id - 1], Sales: item.sellingamount },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getproduct = async () => {
      try {
      const responce = await backendrequest.get(`products/find/${productId}`);
     responce.status === 200 && setdata(responce.data)
    } catch (error) {
      console.log(error);
    }};
    fetchselingdata();
    getproduct()
  }, [productId]);

  const inputchangehendler = (e) => {
    setproduct((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
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
  
  const submithendler = (e) => {
    const img = !file ? data.img : file
        e.preventDefault();
        file && deleteimg(data.img);
    UpdateProduct(history, productId, { ...product, img: img }, dispatch);
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pstate} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={data.img} alt={data.title} className="productInfoImg" />
            <span className="productName">{data.titel}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{data._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">
                {data.active ? "Yes" : "NO"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {data.instock ? "Yes" : "NO"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              onChange={inputchangehendler}
              name="titel"
              type="text"
              defaultValue={data.titel}
              placeholder="Product Name"
            />
            <label>Product Price</label>
            <input
              onChange={inputchangehendler}
              name="price"
              type="number"
              defaultValue={data.price}
              placeholder="Product Price"
            />
            <label>Product Description</label>
            <textarea
              onChange={inputchangehendler}
              name="desc"
              defaultValue={data.desc}
              placeholder="Product Info..."
            />
            <label>In Stock</label>
            <select
              defaultValue={data.instock ? "true" : "false"}
              onChange={inputchangehendler}
              name="instock"
              id="idStock"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label>Active</label>
            <select
              defaultValue={data.instock ? "true" : "false"}
              onChange={inputchangehendler}
              name="active"
              id="active"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={!file ? data.img : file}
                alt={data.title}
                className="productUploadImg"
              />
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
            <button className="productButton" onClick={(e) => submithendler(e)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
