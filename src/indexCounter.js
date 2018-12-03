import React, { Component } from "react";
import ReactDOM from "react-dom";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: props.count,
      name: "Precious"
    };
  }
  handleAddOne() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  }
  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      };
    });
  }
  handleReset() {
    this.setState(() => {
      return {
        count: 0
      };
    });
  }
  componentDidMount() {
    const savedCount = parseInt(localStorage.getItem("count"));

    if (!isNaN(savedCount)) {
      this.setState(() => {
        return {
          count: savedCount
        };
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      const saved = this.state.count;
      localStorage.setItem("count", saved);
    }
  }
  render() {
    return (
      <div>
        {this.state.name}
        <h1>Count :{this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}
Counter.defaultProps = {
  count: 0
};

ReactDOM.render(<Counter />, document.getElementById("root"));
