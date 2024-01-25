import React from "react"; 
import ReactDOM from "react-dom";
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop/>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);