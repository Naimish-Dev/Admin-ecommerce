import "./orderdetail.css";
import { DataGrid } from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../../miscellaneous/AxiosReq";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Order() {
  const [order, setorder] = useState("");
  const [product, setproduct] = useState([]);

  const { orderid } = useParams();
  const backendrequest = userRequest();
const fetchseling = async () => {
  try {
    const responce = await backendrequest.get(`orders/data/${orderid}`);
    if (responce.status === 200) {
      setorder(responce.data);
      setproduct(responce.data.cartid);
    }
  } catch (error) {
    console.log(error);
  }
};
  const confirmorderhendler = async (id, status) => {
    console.log(id, status);
    let updatestatus = status;
    updatestatus === "pending"
      ? (updatestatus = "confirmed")
      : (updatestatus = "pending");
    const responce = await backendrequest.put(`/orders/${id}`, {
      status: updatestatus,
    });
  responce.status === 200 && fetchseling()
  };

  useEffect(() => {
    fetchseling();
  }, []);

  
 const columns = [
   {
     field: "productid",
     headerName: "ID", 
     width: 200,
   },
   {
     field: "product",
     headerName: "Product",
     width: 200,
     renderCell: (params) => {
       return (
         <div className="productListItem">
           <img className="productListImg" src={params.row.img} alt="" />
           {params.row.titel}
         </div>
       );
     },
   },
   { field: "color", headerName: "Color", width: 150 },
   { field: "size", headerName: "Size", width: 150 },
   { field: "quantity", headerName: "Quantity", width: 150 },

   {
     field: "action",
     headerName: "Action",
     width: 150,
     renderCell: (params) => {
       return (
         <>
           <Link to={`/product/${params.row._id}`}>
             <button className="productListEdit">view</button>
           </Link>
          
         </>
       );
     },
   },
 ];

  return (
    <div className="product1">
      {/* <div className="productTitle1Container1">
        <h1 className="productTitle1">Order</h1>
      </div> */}
      <div className="userTitleContainer">
        <h1 className="userTitle">Order  </h1>
        <button
          className="userAddButton"
          onClick={() => confirmorderhendler(order._id, order.status)}
        >
{order.status}        </button>
      </div>
      <div className="productTop1">
        <div className="productTopRight1">
          <h3>User </h3>

          <div className="productInfoTop1">
            <img
              src={order && order.userid.img}
              alt="profile"
              className="productInfoImg"
            />
            <span className="productName">
              {order && order.userid.userName}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem2">
              <span className="productInfoKey">Contact : </span>
              <span className="productInfoValue">
                {order && order.userid.number}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">Email : </span>
              <span className="productInfoValue">
                {order && order.userid.email}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">id : </span>
              <span className="productInfoValue">
                {order && order.userid._id}
              </span>
            </div>
          </div>
        </div>

        <div className="productTopRight1">
          <h3>Address </h3>
          <div className="productInfoBottom">
            <div className="productInfoItem2">
              <span className="productInfoKey">Name : </span>
              <span className="productInfoValue">
                {order && order.addressid.uname}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">Contact : </span>
              <span className="productInfoValue">
                {order && order.addressid.number}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">lcation : </span>
              <span className="productInfoValue">
                {order && order.addressid.location}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">pin : </span>
              <span className="productInfoValue">
                {order && order.addressid.pin}
              </span>
            </div>
          </div>
        </div>

        <div className="productTopRight1">
          <h3>Payment </h3>
          <div className="productInfoBottom">
            <div className="productInfoItem2">
              <span className="productInfoKey">Transaction Id : </span>
              <span className="productInfoValue">
                {order && order.transactionid.tid}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">amount : </span>
              <span className="productInfoValue">
                {order && order.transactionid.amount}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">status : </span>
              <span className="productInfoValue">
                {order && order.transactionid.status}
              </span>
            </div>
            <div className="productInfoItem2">
              <span className="productInfoKey">Date : </span>
              <span className="productInfoValue">
                {order && order.transactionid.createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productheader">
        <h3> Products </h3> <h3> Amount : {order && order.cartid.amount}</h3>
      </div>
      {product.length !== 0 && (
        <DataGrid
          rows={product.products}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
        />
      )}
    </div>
  );
}
