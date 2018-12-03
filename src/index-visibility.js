import React, { Component } from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

const showDetails = [];
const detailText = "Hey, there are some details you can now see";
let buttonText = "show details";
class Visibilty extends Component {
  constructor(props) {
    super(props);
    this.clickHidder = this.clickHidder.bind(this);
    this.state = {
      Visibilty: false
    };
  }
  clickHidder() {
    this.setState(prevState => {
      return {
        Visibilty: !prevState.Visibilty
      };
    });
    if (buttonText === "show details") {
      showDetails.push(detailText);
      buttonText = "Hide details";
    } else {
      showDetails.pop(detailText);
      buttonText = "show details";
    }
  }
  render() {
    return (
      <div>
        <h1>Visibilty Toggle</h1>
        <button onClick={this.clickHidder}>{buttonText}</button>
        <p>{showDetails}</p>
      </div>
    );
  }
}
const renderApp = () => {
  ReactDOM.render(<Visibilty />, document.getElementById("root"));
};
renderApp();
registerServiceWorker();
