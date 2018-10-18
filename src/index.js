import React from "react";
import ReactDOM from "react-dom";
import { FormPage } from "./pages/FormPage";

import "./styles.css";

function App() {
  return <FormPage />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
