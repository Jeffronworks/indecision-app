import React, { Component } from "react";
import ReactDom from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

class IndecisionApp extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.theAddOption = this.theAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  }
  handlePick() {
    const RandomNum = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[RandomNum]);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }
  theAddOption(option) {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    } else {
      return this.setState(prevState => ({
        options: prevState.options.concat(option)
      }));
    }
  }
  render() {
    const subtitle = "Put your life in the hands of a computer";
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOptions handleAddOption={this.theAddOption} />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision"
};

const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        what should I do
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      {props.options.length === 0 && (
        <p>Please add an option to get started!</p>
      )}
      {props.options.length > 1 && (
        <button onClick={props.handleDeleteOptions}>Remove all</button>
      )}
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.optionText}

      <button
        onClick={e => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};

class AddOptions extends Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  addOption(e) {
    e.preventDefault();
    let option = e.target.elements.newOption.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.newOption.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error}
        <form onSubmit={this.addOption}>
          <input name="newOption" placeholder="add a new option" type="text" />
          <button>Add option</button>
        </form>
      </div>
    );
  }
}

const renderApp = () => {
  ReactDom.render(<IndecisionApp />, document.getElementById("root"));
};
renderApp();
registerServiceWorker();
