import { publicRequest, userRequest } from "../miscellaneous/AxiosReq";
import { loginStart, loginSucess, loginError } from "./UserSlice";
import {
  loding,
  error,
  fetchingproducts,
  deletingproducts,
  updatingproducts,
  addingproducts,
} from "./ProductSlice";
////// user Login ///////
let secureRequest = userRequest();
const login = async (history, dispatch, data) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", data);

    if (res.data.is_Admin && res.status === 200) {
      dispatch(loginSucess(res.data));
      localStorage.setItem("User", JSON.stringify(res.data));
      history.push("/");
    } else {
      history.push("/login");
    }
  } catch (e) {
    dispatch(loginError());
  }
};

export default login;

///////// Fetching Product //////////
export const fetchproducts = async (dispatch) => {
  dispatch(loding());
  try {
    const res = await publicRequest.get("/products");
    res.status === 200 && dispatch(fetchingproducts(res.data));
  } catch (e) {
    dispatch(error());
  }
};

///////////// Deleting Product /////////////
export const Deleteproducts = async (history, id, dispatch) => {
  dispatch(loding());
  try {
    const res = await secureRequest.delete(`/products/${id}`);
    res.status === 200 && dispatch(deletingproducts(res.data._id));
    res.status === 200 && history.push("/products");
    console.log("delete");
  } catch (e) {
    dispatch(error());
  }
};
/////////// updating  /////////////////
export const UpdateProduct = async (history, productd, product, dispatch) => {
  const id = productd;
  dispatch(loding());
  try {
    const res = await secureRequest.put(`/products/${id}`, { ...product });
    res.status === 200 &&
      dispatch(
        updatingproducts({ productId: res.data._id, product: res.data })
      );
    res.status === 200 && history.push("../products");
  } catch (e) {
    dispatch(error());
  }
};
/////////// add product  /////////////////
export const addproducts = async (history, dispatch, product) => {
  console.log("call backen");
  dispatch(loding());
  try {
    const res = await secureRequest.post(`/products`, { ...product });
    res.status === 200 && dispatch(addingproducts(res.data));
    res.status === 200 && history.push("../products");
  } catch (e) {
    dispatch(error());
  }
};
