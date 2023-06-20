import Cookies from "js-cookie";
import { Route,Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const data = Cookies.get("User");
console.log(data);
  return (
    <Route
      {...rest}
      render={(props) =>
        data ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login" }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;