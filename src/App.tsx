import AppRoutes from "./router";
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer/>
    </>
  );
}

export default App;
