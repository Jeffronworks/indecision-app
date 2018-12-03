import React, { Component } from "react";

export default class AddOptions extends Component {
  state = {
    error: undefined
  };
  addOption = e => {
    e.preventDefault();
    let option = e.target.elements.newOption.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.newOption.value = "";
    }
  };
  render() {
    return (
      <div>
        {this.state.error && (
          <p className="add-option-error">{this.state.error}</p>
        )}
        <form onSubmit={this.addOption} className="add-option">
          <input
            className="add-option__input"
            name="newOption"
            placeholder="add a new option"
            type="text"
          />
          <button className="button" id="add-button">
            Add option
          </button>
        </form>
      </div>
    );
  }
}
