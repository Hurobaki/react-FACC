import React from "react";
import ReactDOM from "react-dom";
import { FormPage } from "./pages/FormPage";
import { FormPageDynamic } from "./pages/FormPageDynamic";
import { FormPageHOC } from "../src/pages/FormPageHOC";

import "./styles.css";

function App() {
  return <FormPageHOC />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
