import { lazy } from "react";
const Login = lazy(() => import("../../pages/auth/login"));
const SignUp=lazy(()=>import("../../pages/auth/signup"))
const PublicRoutes = [
  {
    path: "login",
    name: "login",
    element: <Login />,
  },
  {
    path:"signup",
    name:"signup",
    element:<SignUp/>

  }
];

export default PublicRoutes;
