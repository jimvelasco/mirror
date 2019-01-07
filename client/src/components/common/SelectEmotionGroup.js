import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectEmotionGroup = ({ name, list, value, label, error, onChange }) => {
  let optionTemplate = list.map(v => (
    <option key={v} value={v}>
      {v}
    </option>
  ));
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-md-3">{label}</div>
        <div className="col-md-9">
          <select name={name} value={value} onChange={onChange}>
            {optionTemplate}
            {/* <option value="happy">Happy</option>
            <option value="serious">Serious</option>
            <option value="angry">Angry</option> */}
          </select>

          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SelectEmotionGroup;
