import AppRoutes from "./router";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/authContext";
import { WatchListProvider } from "./contexts/watchListContext";

function App() {
  return (
    <>
      <AuthProvider>
        <WatchListProvider>
        <AppRoutes />
        </WatchListProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
