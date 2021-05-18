import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import App2 from "./App2";
import App3 from "./App3";
import App5 from "./App5";
import App6 from "./App6";
import App7 from "./App7";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

ReactDOM.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>,
  document.getElementById("root2")
);

ReactDOM.render(
  <React.StrictMode>
    <App3 />
  </React.StrictMode>,
  document.getElementById("root3")
);

ReactDOM.render(
  <React.StrictMode>
    <App5 />
  </React.StrictMode>,
  document.getElementById("root5")
);

ReactDOM.render(
  <React.StrictMode>
    <App6 />
  </React.StrictMode>,
  document.getElementById("root6")
);
ReactDOM.render(
  <React.StrictMode>
    <App7 />
  </React.StrictMode>,
  document.getElementById("root6")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
