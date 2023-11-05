import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "@pages/AppRouter";

/**
 * App is the main component of the application.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <App />
 *
 * @returns {JSX.Element} Rendered page.
 */
function App() {
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;
