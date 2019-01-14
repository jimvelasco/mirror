import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroupLink = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  onClick,
  disabled
}) => {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-md-3">
          <a href="#" onClick={onClick}>
            {label}
          </a>
        </div>
        <div className="col-md-9">
          <input
            type={type}
            className={classnames("form-control form-control-sm", {
              "is-invalid": error
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          {info && <small className="form-text text-muted">{info}</small>}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code

TextFieldGroupLink.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroupLink.defaultProps = {
  type: "text"
};

export default TextFieldGroupLink;
