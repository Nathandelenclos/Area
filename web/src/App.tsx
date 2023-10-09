import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "@pages/AppRouter";

function App() {
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;
