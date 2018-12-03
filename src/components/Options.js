import React from "react";
import Option from "./Option";

const Options = props => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
    </div>
    {props.options.length === 0 && (
      <p className="widget__message">Please add an option to get started!</p>
    )}
    {props.options.length > 1 && (
      <button
        onClick={props.handleDeleteOptions}
        className="button button--link"
      >
        Remove all
      </button>
    )}

    {props.options.map((option, index) => (
      <Option
        key={option}
        count={index + 1}
        optionText={option}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))}
  </div>
);

export default Options;