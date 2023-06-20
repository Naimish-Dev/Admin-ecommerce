import { publicRequest, userRequest } from "../miscellaneous/AxiosReq";
import {
  loding,
  error,
  fetchingusers,
  deletingusers,
  updatingusers,
  addingusers,
} from "./usersSlice";
////// user Login ///////
let secureRequest = userRequest();

///////// Fetching users //////////
export const fetchusers = async (dispatch) => {
    dispatch(loding());
  try {
    const res = await secureRequest.get("/users");
    res.status === 200 && dispatch(fetchingusers(res.data));
  } catch (e) {
    dispatch(error());
}
};

///////////// Deleting Product /////////////
export const Deleteusers = async (history, id, dispatch) => {
    console.log("fetch users ");
  dispatch(loding());
  try {
    const res = await secureRequest.delete(`/users/${id}`);
    res.status === 200 && dispatch(deletingusers(res.data._id));
    res.status === 200 && history.push("/users");
    console.log("delete");
  } catch (e) {
    dispatch(error());
  }
};
/////////// updating  /////////////////
export const Updateusers = async (history, userid, user, dispatch) => {
  const id = userid;
  dispatch(loding());
  try {
    const res = await secureRequest.put(`/users/${id}`, { ...user });
    res.status === 200 &&
      dispatch(
        updatingusers({ userId: res.data._id, user: res.data })
      );
    res.status === 200 && history.push("../users");
  } catch (e) {
    dispatch(error());
  }
};
/////////// add user  /////////////////
export const addusers = async (history, dispatch, user) => {
  console.log(user);
  dispatch(loding());
  try {
    const res = await secureRequest.post(`/auth/register`, { ...user });
    res.status === 200 && dispatch(addingusers(res.data));
    res.status === 200 && history.push("../users");
  } catch (e) {
    dispatch(error());
  }
};
