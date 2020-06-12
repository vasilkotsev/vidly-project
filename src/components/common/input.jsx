import React from "react";
import PropTypes from "prop-types";

const Input = ({ value, name, label, onChange, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        type="text"
        className="form-control"
        name={name}
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string
};

export default Input;
