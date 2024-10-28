import { lazy } from "react";
const Home = lazy(() => import("../../pages/dashBoard/home"));
const MyList = lazy(() => import("../../pages/dashBoard/myList"));
const PrivateRoutes = [
  {
    path: "home",
    name: "home",
    element: <Home />,
    isIndex: true,
  },
  {
    path: "list/:searchKey",
    name: "list",
    element: <MyList />,
  },
];

export default PrivateRoutes;
