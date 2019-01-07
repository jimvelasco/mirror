import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, label, error, onChange }) => {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-md-3">{label}</div>
        <div className="col-md-9">
          <select name={name} value={value} onChange={onChange}>
            <option value="wow">Wow</option>
            <option value="cool">Cool</option>
            <option value="amazing">Amazing</option>
          </select>

          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SelectListGroup;
