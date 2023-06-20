import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import TransactionList from "./pages/Transaction/transacton";
import Transactiondetails from "./pages/Transaction/transactiondetails"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {loginSucess } from "./Redux/UserSlice";
import { useHistory } from "react-router-dom";
import Profile from "./pages/Profile/Profile"
import OrderList from "./pages/Order/order";
import Order from "./pages/Order/Orderdetails";
import Analytics from "./pages/Analytics/Analytics";
function App() {
  const history = useHistory();
  const dispatch=useDispatch()

var data = JSON.parse(localStorage.getItem("User"))

  if(data){
    dispatch(loginSucess(data));
  }

  
     const islogin = useSelector((state) => state.user.userdata);
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      {islogin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/analytics">
              <Analytics />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/transactions">
              <TransactionList />
            </Route>
            <Route path="/transaction/:transactionid">
              <Transactiondetails />
            </Route>
            <Route path="/orders">
              <OrderList />
            </Route>
            <Route path="/order/:orderid">
              <Order />
            </Route>
           
            <Route path="/profile">
              <Profile />
            </Route>

          </div>
        </>
      ) : (
        history.push("/login")
      )}
    </Switch>
  );
}
export default App;
