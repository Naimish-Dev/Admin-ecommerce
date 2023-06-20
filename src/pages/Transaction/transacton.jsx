import "./transaction.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRequest } from "../../miscellaneous/AxiosReq";
export default function TransactionList() {
  const dispatch = useDispatch();
  const history = useHistory();
const request=userRequest();
const [products, setProducts] = useState([]);
  const handleDelete = (id) => {
    
  };

  useEffect(() => {
    const fetchtransaction=async()=>{
        try {
            const responce = await request.get("/transaction");
        responce.status === 200 && setProducts(responce.data);
        console.log(responce.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchtransaction();
  }, [dispatch]);

  const columns = [
    { field: "userid", headerName: "User ID", width: 210 },
    {
      field: "amount",
      headerName: "Amount",         
      width: 130,
    },
    { field: "card", headerName: "Card-No", width: 130 },
    { field: "tid", headerName: "Transaction Id", width: 230 },

    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/transaction/${params.row._id}`}>
              <button className="productListEdit">View</button>
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
        <h2 className="ordersheading"> Transactions </h2>

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
