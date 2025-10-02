import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      autoClose={1500}
      transition={Slide}
      position="bottom-right"
    />
    <App />
  </>
);
