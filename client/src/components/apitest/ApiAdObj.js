import React from "react";
import ApiAdBusinessObj from "./ApiAdBusinessObj";
import ApiAdAdvertisementObj from "./ApiAdAdvertisementObj";

const ApiAdObj = ({ obj }) => {
  return (
    <div>
      <div>
        <ApiAdBusinessObj obj={obj} />
      </div>
      {/* <div>
        <ApiAdAdvertisementObj obj={obj} />
      </div> */}
    </div>
  );
};

export default ApiAdObj;
