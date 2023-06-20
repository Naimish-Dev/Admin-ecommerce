import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Deleteproducts, fetchproducts } from "../../Redux/Apicall";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import deleteimg from "../../miscellaneous/Deleimg";

export default function ProductList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { products } = useSelector((store) => store.product);
   

  const handleDelete = (id,img) => {
    Deleteproducts(history,id, dispatch);
deleteimg(img);
  };
  

  
  useEffect(() => {
    fetchproducts(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 210 },
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
    { field: "instock", headerName: "Stock", width: 150 },
    { field: "active", headerName: "Status", width: 150 },

    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row._id}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id, params.row.img)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        <h2 className="ordersheading"> Products </h2>

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
