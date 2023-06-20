import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link ,useHistory} from "react-router-dom";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { fetchusers, Deleteusers } from "../../Redux/UserApicall";

export default function UserList() {
  const dispatch=useDispatch()
  const history=useHistory()
  const {users} = useSelector((state)=>state.users);

  const handleDelete = (id) => {
Deleteusers(history,id,dispatch)
  };
  
  
  useEffect(()=>{
fetchusers(dispatch);
  },[])

  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "userName",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="userimg" />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "is_Admin",
      headerName: "Admin",
      width: 120,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h2 className="ordersheading"> Users </h2>
      <DataGrid
        rows={users && users}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
