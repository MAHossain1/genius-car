import Main from "../Layout/Main";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Checkout from "../Pages/Checkout/Checkout";
import Home from "../Pages/Home/Home";
import Orders from "../Pages/Orders/Orders";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/checkout/:id",
        element: <Checkout></Checkout>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
      },
    ],
  },
]);

export default routes;
