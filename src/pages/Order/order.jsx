import "../productList/ProductList"
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userRequest } from "../../miscellaneous/AxiosReq";
export default function OrderList() {
  const dispatch = useDispatch();
  const request = userRequest();
  const [products, setProducts] = useState([]); 
  const [updatedproducts, setupatedProducts] = useState({}); 

const confirmorderhendler=async (id,status)=>{
  console.log(id,status);
  let updatestatus = status;
   updatestatus === "pending"
     ? (updatestatus = "confirmed")
     : (updatestatus = "pending");
        const responce = await request.put(`/orders/${id}`, {
          status: updatestatus,
        });
        setupatedProducts(responce.data);
}

  useEffect(() => {
    const fetchtransaction = async () => {
      try {
        const responce = await request.get("/orders");
        responce.status === 200 && setProducts(responce.data);
        console.log(responce.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchtransaction();
  }, [updatedproducts]);

  const columns = [
    {
      field: "_id",
      headerName: "orderid",
      width: 200,
    },
  
    { field: "userid", headerName: "User ID", width: 200 },
    { field: "status", headerName: "status", width: 200 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.row._id}`}>
              <button className="productListEdit">View</button>
            </Link>

            <button
              className="productListConfirm"
              onClick={() =>
                confirmorderhendler(params.row._id, params.row.status)
              }
            >
              {params.row.status === "pending" ? "confirmed" : "pending"}
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        <h2 className="ordersheading"> Orders </h2>
        <DataGrid
          rows={products && products}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    </>
  );
}
