/** @format */

import React from "react";
import "./form-input.styles.scss";

function FormInput({
  label,
  name,
  type,
  value,
  required,
  readonly,
  hidden,
  richBox,
  longBox,
  shortBox,
  max,
  min,
  disabled,
  handleChange,
  handleBlur,
  onKeyEvent,
}) {
  return (
    <div className="form-input-container">
      <div>
        <label htmlFor={name} className="form-label" hidden={hidden}>
          {label}
          {required ? <span className="form-required">*</span> : null}
        </label>
      </div>
      <input
        max={max}
        min={min}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        required={required}
        readOnly={readonly}
        className={`${richBox ? "rich-form-input" : ""}
        ${longBox ? "long-form-input" : ""}
        ${shortBox ? "short-form-input" : ""}
        form-input`}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={onKeyEvent}
        hidden={hidden}
        disabled={disabled}
      />
    </div>
  );
}

export default FormInput;
