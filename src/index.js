import React from "react";
import ReactDom from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import IndecisionApp from "./components/Indecision";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

ReactDom.render(<IndecisionApp />, document.getElementById("root"));

registerServiceWorker();
